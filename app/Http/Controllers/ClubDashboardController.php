<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Club;

class ClubDashboardController extends Controller
{
    /**
     * Display the club dashboard with registration URL and statistics
     */
    public function show()
    {
        $user = Auth::user();
        
        // Ensure user is authenticated and has a club
        if (!$user || !$user->club) {
            abort(403, 'Unauthorized access to club dashboard.');
        }
        
        $club = $user->club->load(['athletes.user', 'trainingGroups']);
        
        return Inertia::render('Dashboard/ClubDashboard', [
            'club' => $club,
            'registrationUrl' => $club->registration_url,
            'registrationStats' => $this->getRegistrationStats($club),
            'stats' => [
                'groups_count' => $club->trainingGroups()->count(),
                'athletes_count' => $club->athletes()->count(),
                'pending_athletes' => $club->athletes()->whereHas('user', fn($q) => $q->where('status', 'pending'))->count(),
            ]
        ]);
    }
    
    /**
     * Calculate registration statistics for the club
     */
    private function getRegistrationStats(Club $club): array
    {
        $totalAthletes = $club->athletes()->count();
        $recentRegistrations = $club->athletes()
            ->where('created_at', '>=', now()->subDays(30))
            ->count();
        
        $clubSpecificRegistrations = $club->athletes()
            ->where('registration_source', 'club-specific')
            ->count();
            
        $generalRegistrations = $club->athletes()
            ->where('registration_source', 'general')
            ->count();
        
        return [
            'total_athletes' => $totalAthletes,
            'recent_registrations' => $recentRegistrations,
            'club_specific_registrations' => $clubSpecificRegistrations,
            'general_registrations' => $generalRegistrations,
            'club_specific_percentage' => $totalAthletes > 0 ? round(($clubSpecificRegistrations / $totalAthletes) * 100, 1) : 0,
        ];
    }
}
