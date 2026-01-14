<?php

namespace App\Http\Controllers\Club;

use App\Http\Controllers\Controller;
use App\Models\TrainingGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TrainingGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $club = Auth::user()->club;
        return Inertia::render('Club/TrainingGroups/Index', [
            'groups' => $club->trainingGroups()->withCount('athleteProfiles')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Club/TrainingGroups/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'schedule_json' => 'required|array',
            'price' => 'required|numeric|min:0',
            'max_members' => 'required|integer|min:1',
        ]);

        Auth::user()->club->trainingGroups()->create($validated);

        return redirect()->route('club.training-groups.index')->with('success', 'Group created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TrainingGroup $trainingGroup)
    {
        $this->authorize('update', $trainingGroup);
        return Inertia::render('Club/TrainingGroups/Form', [
            'group' => $trainingGroup,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TrainingGroup $trainingGroup)
    {
        $this->authorize('update', $trainingGroup);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'schedule_json' => 'required|array',
            'price' => 'required|numeric|min:0',
            'max_members' => 'required|integer|min:1',
        ]);

        $trainingGroup->update($validated);

        return redirect()->route('club.training-groups.index')->with('success', 'Group updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TrainingGroup $trainingGroup)
    {
        $this->authorize('delete', $trainingGroup);
        $trainingGroup->delete();

        return redirect()->route('club.training-groups.index')->with('success', 'Group deleted successfully.');
    }
}
