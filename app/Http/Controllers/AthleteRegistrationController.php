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
        $clubs = Club::whereHas('user', function ($query) {
            $query->where('status', 'active');
        })->with('trainingGroups')->get();

        return Inertia::render('Athlete/Registration/Complete', [
            'clubs' => $clubs,
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
