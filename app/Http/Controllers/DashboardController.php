<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Club;
use App\Models\AthleteProfile;
use App\Models\User;
use App\Models\Contract;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'super_admin') {
            return Inertia::render('Dashboard/AdminDashboard', [
                'stats' => [
                    'clubs_count' => Club::count(),
                    'athletes_count' => AthleteProfile::count(),
                    'pending_clubs' => User::where('role', 'club')->where('status', 'pending')->count(),
                ]
            ]);
        }

        if ($user->role === 'club') {
            $club = $user->club;
            return Inertia::render('Dashboard/ClubDashboard', [
                'club' => $club,
                'stats' => [
                    'groups_count' => $club->trainingGroups()->count(),
                    'athletes_count' => $club->athletes()->count(),
                    'pending_athletes' => $club->athletes()->whereHas('user', fn($q) => $q->where('status', 'pending'))->count(),
                ]
            ]);
        }

        if ($user->role === 'athlete') {
            $profile = $user->athleteProfile->load(['user', 'club', 'trainingGroup']);
            return Inertia::render('Dashboard/AthleteDashboard', [
                'profile' => $profile,
                'contracts_count' => Contract::where('athlete_id', $user->id)->count(),
            ]);
        }

        return Inertia::render('Dashboard');
    }
}
