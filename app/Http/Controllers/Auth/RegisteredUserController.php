<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Club;
use App\Models\RegistrationAttempt;
use App\Services\ClubValidationService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    protected ClubValidationService $clubValidationService;

    public function __construct(ClubValidationService $clubValidationService)
    {
        $this->clubValidationService = $clubValidationService;
    }

    /**
     * Display the registration view.
     */
    public function create(Request $request): Response|RedirectResponse
    {
        $club = null;
        $isClubSpecific = false;
        $trainingGroupId = $request->query('training_group_id');

        // Handle club-specific registration via identifier OR explicit club_id
        $identifier = $request->route('identifier');
        $clubId = $request->query('club_id');

        if ($identifier || $clubId) {
            if ($identifier) {
                $club = $this->clubValidationService->validateIdentifier($identifier, $request);
            } else {
                $club = Club::find($clubId);
            }
            
            if (!$club) {
                return redirect()->route('register')
                    ->with('error', 'Invalid registration link. Please select your club manually.');
            }

            $isClubSpecific = true;
        }

        // Handle club-specific registration
        if ($identifier) {
            // Validate the club identifier
            $club = $this->clubValidationService->validateIdentifier($identifier, $request);
            
            if (!$club) {
                return redirect()->route('register')
                    ->with('error', 'Invalid registration link. Please select your club manually.');
            }

            $isClubSpecific = true;
        }

        // Get all clubs for the dropdown (used in general registration)
        $clubs = Club::select('id', 'name')
            ->orderBy('name')
            ->get();

        return Inertia::render('Auth/Register', [
            'clubs' => $clubs,
            'preselectedClub' => $club ? [
                'id' => $club->id,
                'name' => $club->name,
                'description' => $club->description,
            ] : null,
            'isClubSpecific' => $isClubSpecific,
            'trainingGroupId' => $trainingGroupId,
            'clubWelcomeMessage' => $club ? "You're registering for {$club->name}" : null,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Check if this is a club-specific registration by looking for the club_id in the request
        // that was set as a hidden field from the club-specific registration form
        $isClubSpecific = $request->has('is_club_specific') && $request->boolean('is_club_specific');
        $club = null;
        $clubIdentifier = null;

        // If club-specific, validate the preselected club
        if ($isClubSpecific && $request->has('club_id')) {
            $club = Club::find($request->input('club_id'));
            
            if (!$club) {
                // Log failed registration attempt for club-specific registration
                $this->logRegistrationAttempt($request, [
                    'success' => false,
                    'error_message' => 'Invalid club selection for club-specific registration',
                    'registration_source' => 'club-specific',
                    'club_id' => $request->input('club_id'),
                ]);

                return back()->withErrors([
                    'club_id' => 'Invalid club selection.'
                ])->withInput();
            }

            $clubIdentifier = $club->registration_identifier;
        }

        // Base validation rules
        $validationRules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:club,athlete', // Admin cannot self-register
        ];

        // Add club validation for general registration (when role is athlete and not club-specific)
        if ($request->role === 'athlete') {
            if (!$isClubSpecific) {
                $validationRules['club_id'] = 'required|exists:clubs,id';
            } else {
                // For club-specific registration, club_id should be present and valid
                $validationRules['club_id'] = 'required|exists:clubs,id';
            }
            $validationRules['training_group_id'] = 'nullable|exists:training_groups,id';
        }

        // Validate the request
        try {
            $request->validate($validationRules, [
                'name.required' => 'Please provide your full name.',
                'email.required' => 'An email address is required for registration.',
                'email.email' => 'Please provide a valid email address.',
                'email.unique' => 'This email address is already registered. Please use a different email or try logging in.',
                'password.required' => 'A password is required for your account.',
                'password.confirmed' => 'Password confirmation does not match.',
                'role.required' => 'Please select whether you are registering as an athlete or club.',
                'role.in' => 'Invalid registration type selected.',
                'club_id.required' => 'Please select a club to join.',
                'club_id.exists' => 'The selected club is not valid or no longer available.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Log failed registration attempt due to validation errors
            Log::warning('Registration validation failed', [
                'errors' => $e->errors(),
                'role' => $request->role,
                'email' => $request->email,
            ]);

            $this->logRegistrationAttempt($request, [
                'success' => false,
                'error_message' => 'Validation failed: ' . json_encode($e->errors()),
                'registration_source' => $isClubSpecific ? 'club-specific' : 'general',
                'club_id' => $request->input('club_id'),
                'club_identifier' => $clubIdentifier,
            ]);

            throw $e;
        }

        // Use database transaction for data integrity
        try {
            return DB::transaction(function () use ($request, $isClubSpecific, $club, $clubIdentifier) {
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'role' => $request->role,
                    'status' => 'pending', // All new registrations are pending
                ]);

                if ($user->role === 'athlete') {
                    // Determine club_id and registration_source
                    $clubId = $request->input('club_id');
                    $registrationSource = $isClubSpecific ? 'club-specific' : 'general';

                    $user->athleteProfile()->create([
                        'club_id' => $clubId,
                        'registration_source' => $registrationSource,
                    ]);

                    // Create Enrollment if training_group_id is present
                    if ($request->has('training_group_id')) {
                        $user->enrollments()->create([
                            'training_group_id' => $request->input('training_group_id'),
                            'status' => 'pending',
                        ]);
                    }
                } elseif ($user->role === 'club') {
                    $user->club()->create([
                        'name' => $request->name,
                        'email' => $request->email,
                    ]);
                }

                // Log successful registration attempt
                $this->logRegistrationAttempt($request, [
                    'success' => true,
                    'user_id' => $user->id,
                    'club_id' => $request->input('club_id'),
                    'club_identifier' => $clubIdentifier,
                    'registration_source' => $isClubSpecific ? 'club-specific' : 'general',
                ]);

                event(new Registered($user));

                Auth::login($user);

                // Redirect based on role
                $redirectPath = match ($user->role) {
                    'club' => route('club.register.show'),
                    'athlete' => route('athlete.register.show'),
                    default => route('dashboard', absolute: false),
                };

                Log::info('Redirecting newly registered user', [
                    'user_id' => $user->id,
                    'role' => $user->role,
                    'path' => $redirectPath,
                ]);

                return redirect($redirectPath);
            });
        } catch (\Exception $e) {
            // Log failed registration attempt due to database/transaction errors
            $this->logRegistrationAttempt($request, [
                'success' => false,
                'error_message' => 'Registration failed: ' . $e->getMessage(),
                'registration_source' => $isClubSpecific ? 'club-specific' : 'general',
                'club_id' => $request->input('club_id'),
                'club_identifier' => $clubIdentifier,
            ]);

            // Provide user-friendly error message
            return back()->withErrors([
                'registration' => 'Registration failed due to a system error. Please try again. If the problem persists, please contact support.'
            ])->withInput($request->except('password', 'password_confirmation'));
        }
    }

    /**
     * Log a registration attempt for audit purposes
     *
     * @param Request $request The current request
     * @param array $data Additional data for the log entry
     * @return void
     */
    private function logRegistrationAttempt(Request $request, array $data): void
    {
        try {
            RegistrationAttempt::logAttempt([
                'club_identifier' => $data['club_identifier'] ?? null,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'success' => $data['success'] ?? false,
                'user_id' => $data['user_id'] ?? null,
                'club_id' => $data['club_id'] ?? null,
                'error_message' => $data['error_message'] ?? null,
                'registration_source' => $data['registration_source'] ?? 'general',
            ]);
        } catch (\Exception $e) {
            // Log the error but don't fail the registration process
            Log::error('Failed to log registration attempt', [
                'error' => $e->getMessage(),
                'request_data' => $data,
                'ip_address' => $request->ip(),
            ]);
        }
    }
}
