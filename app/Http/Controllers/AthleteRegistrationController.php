<?php

namespace App\Http\Controllers;

use App\Models\Club;
use App\Models\TrainingGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AthleteRegistrationController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        $athleteProfile = $user->athleteProfile;
        
        // Get the club the athlete was registered for (if any)
        $registeredClub = null;
        $registrationSource = null;
        $showSuccessMessage = false;
        
        if ($athleteProfile && $athleteProfile->club_id) {
            $registeredClub = Club::with('trainingGroups')->find($athleteProfile->club_id);
            $registrationSource = $athleteProfile->registration_source;
            $showSuccessMessage = true;
        }

        // Get pending enrollment
        $pendingEnrollment = $user->enrollments()->where('status', 'pending')->with('trainingGroup')->first();

        $clubs = Club::whereHas('user', function ($query) {
            $query->where('status', 'active');
        })->with('trainingGroups')->get();

        return Inertia::render('Athlete/Registration/Complete', [
            'clubs' => $clubs,
            'registeredClub' => $registeredClub ? [
                'id' => $registeredClub->id,
                'name' => $registeredClub->name,
                'description' => $registeredClub->description,
                'email' => $registeredClub->email,
                'phone' => $registeredClub->phone,
                'address' => $registeredClub->address,
            ] : null,
            'registrationSource' => $registrationSource,
            'showSuccessMessage' => $showSuccessMessage,
            'pendingEnrollment' => $pendingEnrollment,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'club_id' => 'required|exists:clubs,id',
            'training_group_id' => 'required|exists:training_groups,id',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'birthday' => 'required|date',
            'emergency_contact_json' => 'required|array',
            'emergency_contact_json.name' => 'required|string',
            'emergency_contact_json.phone' => 'required|string',
            'signature_confirmed' => 'required|accepted',
            'signature_name' => 'required|string|min:3',
            'signature_data' => 'required|string',
        ]);

        $user = Auth::user();
        $athlete = $user->athleteProfile;
        $athlete->update(array_merge(
            $request->only(['phone', 'address', 'birthday', 'emergency_contact_json', 'club_id', 'training_group_id', 'signature_name']),
            ['signature_data' => $request->signature_data]
        ));


        // Create or update enrollment
        $user->enrollments()->updateOrCreate(
            ['training_group_id' => $request->training_group_id],
            ['status' => 'pending']
        );

        return redirect()->route('subscription.index')->with('success', 'Profile updated. Please complete your subscription to activate your account.');
    }
}
