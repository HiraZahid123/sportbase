<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AthleteProfile;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AthleteManagementController extends Controller
{
    public function index()
    {
        $athletes = AthleteProfile::with(['user', 'club', 'trainingGroup'])->get();

        return Inertia::render('Admin/Athletes/Index', [
            'athletes' => $athletes,
        ]);
    }
}
