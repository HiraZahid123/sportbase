<?php

namespace App\Http\Controllers\Club;

use App\Http\Controllers\Controller;
use App\Models\AthleteProfile;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AthleteManagementController extends Controller
{
    public function index()
    {
        $club = Auth::user()->club;
        $pendingAthletes = $club->athletes()
            ->with(['user', 'trainingGroup'])
            ->whereHas('user', function ($query) {
                $query->where('status', 'pending');
            })->get();

        $activeAthletes = $club->athletes()
            ->with(['user', 'trainingGroup'])
            ->whereHas('user', function ($query) {
                $query->where('status', 'active');
            })->get();

        return Inertia::render('Club/Athletes/Index', [
            'pendingAthletes' => $pendingAthletes,
            'activeAthletes' => $activeAthletes,
            'groups' => $club->trainingGroups,
        ]);
    }

    public function approve(User $user)
    {
        $this->authorizeAthlete($user);
        
        // Update user status
        $user->update(['status' => 'active']);

        // Also activate their pending enrollments for THIS club
        $clubId = Auth::user()->club->id;
        $user->enrollments()
            ->whereHas('trainingGroup', function($q) use ($clubId) {
                $q->where('club_id', $clubId);
            })
            ->where('status', 'pending')
            ->update(['status' => 'active']);

        return redirect()->back()->with('success', 'Athlete approved and enrollments activated.');
    }

    public function reject(User $user)
    {
        $this->authorizeAthlete($user);
        $user->update(['status' => 'rejected']);

        return redirect()->back()->with('success', 'Athlete rejected.');
    }

    public function updateGroup(Request $request, User $user)
    {
        $this->authorizeAthlete($user);

        $validated = $request->validate([
            'training_group_id' => 'required|exists:training_groups,id',
        ]);

        $user->athleteProfile->update([
            'training_group_id' => $validated['training_group_id'],
        ]);

        return redirect()->back()->with('success', 'Athlete training group updated.');
    }

    protected function authorizeAthlete(User $user)
    {
        $club = Auth::user()->club;
        
        if (!$club) {
            abort(403, 'Club not found for this user.');
        }

        // Check if athlete is connected to this club via profile or enrollment
        $isMember = $user->athleteProfile && $user->athleteProfile->club_id === $club->id;
        
        if (!$isMember) {
            $isEnrolled = $user->enrollments()->whereHas('trainingGroup', function($q) use ($club) {
                $q->where('club_id', $club->id);
            })->exists();
            
            if (!$isEnrolled) {
                abort(403, 'Unauthorized athlete access.');
            }
        }
    }
}
