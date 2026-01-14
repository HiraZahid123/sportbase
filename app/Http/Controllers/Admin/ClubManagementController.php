<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Club;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClubManagementController extends Controller
{
    public function index()
    {
        $pendingClubs = User::where('role', 'club')
            ->where('status', 'pending')
            ->with('club')
            ->get();

        $allClubs = User::where('role', 'club')
            ->with('club')
            ->get();

        return Inertia::render('Admin/Clubs/Index', [
            'pendingClubs' => $pendingClubs,
            'allClubs' => $allClubs,
        ]);
    }

    public function approve(User $user)
    {
        $user->update(['status' => 'active']);
        return back()->with('success', 'Club approved successfully.');
    }

    public function reject(User $user)
    {
        $user->update(['status' => 'rejected']);
        return back()->with('success', 'Club rejected.');
    }
}
