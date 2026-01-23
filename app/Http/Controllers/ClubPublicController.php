<?php

namespace App\Http\Controllers;

use App\Models\Club;
use App\Models\TrainingGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClubPublicController extends Controller
{
    /**
     * Show the public registration page for a specific club.
     */
    public function show(string $identifier)
    {
        $club = Club::where('registration_identifier', $identifier)
            ->with(['trainingGroups' => function($query) {
                $query->withCount('enrollments');
            }])
            ->firstOrFail();

        // Check if the club is approved/active
        if ($club->user->status !== 'active') {
            abort(403, 'This club is not currently active.');
        }

        return Inertia::render('Club/Public/Show', [
            'club' => [
                'id' => $club->id,
                'name' => $club->name,
                'description' => $club->description,
                'logo' => $club->logo,
                'email' => $club->email,
                'phone' => $club->phone,
                'address' => $club->address,
                'registration_identifier' => $club->registration_identifier,
            ],
            'groups' => $club->trainingGroups->map(fn($group) => [
                'id' => $group->id,
                'name' => $group->name,
                'description' => $group->description,
                'price' => $group->price,
                'max_members' => $group->max_members,
                'current_members' => $group->enrollments_count,
                'schedule' => $group->schedule_json,
                'is_full' => $group->enrollments_count >= $group->max_members,
            ]),
        ]);
    }
}
