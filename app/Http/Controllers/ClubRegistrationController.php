<?php

namespace App\Http\Controllers;

use App\Models\Club;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClubRegistrationController extends Controller
{
    public function show()
    {
        $club = auth()->user()->club;
        return Inertia::render('Club/Registration/Complete', [
            'club' => $club
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'country' => 'nullable|string|max:100',
            'description' => 'nullable|string',
        ]);

        $club = auth()->user()->club;
        $club->update($request->all());

        return redirect()->route('dashboard')->with('success', 'Club profile updated. Waiting for admin approval.');
    }
}
