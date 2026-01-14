<?php

namespace App\Http\Controllers\Athlete;

use App\Http\Controllers\Controller;
use App\Models\Contract;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ContractController extends Controller
{
    public function index()
    {
        $contracts = Contract::where('athlete_id', Auth::id())->with('club')->get();
        return Inertia::render('Athlete/Contracts/Index', [
            'contracts' => $contracts,
        ]);
    }

    public function sign(Request $request, Contract $contract)
    {
        if ($contract->athlete_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'signed_file' => 'required|file|mimes:pdf|max:2048',
        ]);

        $path = $request->file('signed_file')->store('contracts/signed', 'public');

        $contract->update([
            'signed_path' => $path,
            'status' => 'signed',
        ]);

        return redirect()->back()->with('success', 'Contract signed and uploaded.');
    }
}
