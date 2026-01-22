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
        ]);

        $athlete = Auth::user()->athleteProfile;
        $athlete->update($validated);

        return redirect()->route('dashboard')->with('success', 'Profile updated. Waiting for club approval.');
    }
}
