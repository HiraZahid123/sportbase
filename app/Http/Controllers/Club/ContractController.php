<?php

namespace App\Http\Controllers\Club;

use App\Http\Controllers\Controller;
use App\Models\Contract;
use App\Models\AthleteProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ContractController extends Controller
{
    public function index()
    {
        $club = Auth::user()->club;
        $contracts = Contract::where('club_id', $club->id)->with('athlete')->get();
        
        return Inertia::render('Club/Contracts/Index', [
            'contracts' => $contracts,
            'athletes' => $club->athletes()->with('user')->get(),
        ]);
    }

    public function uploadTemplate(Request $request)
    {
        $request->validate([
            'athlete_id' => 'required|exists:users,id',
            'template' => 'required|file|mimes:pdf|max:2048',
        ]);

        $path = $request->file('template')->store('contracts/templates', 'public');

        Contract::create([
            'club_id' => Auth::user()->club->id,
            'athlete_id' => $request->athlete_id,
            'template_path' => $path,
            'status' => 'pending_athlete',
        ]);

        return redirect()->back()->with('success', 'Contract template uploaded.');
    }
}
