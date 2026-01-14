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
        ]);
    }

    public function approve(User $user)
    {
        $this->authorizeAthlete($user);
        $user->update(['status' => 'active']);

        return redirect()->back()->with('success', 'Athlete approved.');
    }

    public function reject(User $user)
    {
        $this->authorizeAthlete($user);
        $user->update(['status' => 'rejected']);

        return redirect()->back()->with('success', 'Athlete rejected.');
    }

    protected function authorizeAthlete(User $user)
    {
        if ($user->athleteProfile->club_id !== Auth::user()->club->id) {
            abort(403);
        }
    }
}
