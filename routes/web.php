<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

use App\Http\Controllers\DashboardController;

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified', 'approved'])
    ->name('dashboard');

use App\Http\Controllers\ClubRegistrationController;
use App\Http\Controllers\AthleteRegistrationController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\Admin\ClubManagementController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Club Registration Completion
    Route::middleware(['role:club'])->group(function () {
        Route::get('/club/register/complete', [ClubRegistrationController::class, 'show'])->name('club.register.show');
        Route::post('/club/register/complete', [ClubRegistrationController::class, 'store'])->name('club.register.store');
        
        // Training Groups
        Route::resource('training-groups', \App\Http\Controllers\Club\TrainingGroupController::class)
            ->names('club.training-groups')
            ->except(['show']);

        // Athlete Management
        Route::get('/athletes', [\App\Http\Controllers\Club\AthleteManagementController::class, 'index'])->name('club.athletes.index');
        Route::post('/athletes/{user}/approve', [\App\Http\Controllers\Club\AthleteManagementController::class, 'approve'])->name('club.athletes.approve');
        Route::post('/athletes/{user}/reject', [\App\Http\Controllers\Club\AthleteManagementController::class, 'reject'])->name('club.athletes.reject');

        // Contracts
        Route::get('/contracts', [\App\Http\Controllers\Club\ContractController::class, 'index'])->name('club.contracts.index');
        Route::post('/contracts/template', [\App\Http\Controllers\Club\ContractController::class, 'uploadTemplate'])->name('club.contracts.upload');
    });

    // Admin Club Management
    Route::middleware(['role:super_admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/clubs', [ClubManagementController::class, 'index'])->name('clubs.index');
        Route::post('/clubs/{user}/approve', [ClubManagementController::class, 'approve'])->name('clubs.approve');
        Route::post('/clubs/{user}/reject', [ClubManagementController::class, 'reject'])->name('clubs.reject');
        
        // Impersonation
        Route::post('/impersonate/{user}', function (\App\Models\User $user) {
            auth()->user()->impersonate($user);
            return redirect()->route('dashboard');
        })->name('impersonate');
    });

    Route::post('/stop-impersonating', function () {
        auth()->user()->stopImpersonating();
        return redirect()->route('admin.clubs.index');
    })->name('stop-impersonating')->middleware('auth');

    // Athlete Registration Completion
    Route::middleware(['role:athlete'])->group(function () {
        Route::get('/athlete/register/complete', [AthleteRegistrationController::class, 'show'])->name('athlete.register.show');
        Route::post('/athlete/register/complete', [AthleteRegistrationController::class, 'store'])->name('athlete.register.store');

        // Contracts
        Route::get('/athlete/contracts', [\App\Http\Controllers\Athlete\ContractController::class, 'index'])->name('athlete.contracts.index');
        Route::post('/athlete/contracts/{contract}/sign', [\App\Http\Controllers\Athlete\ContractController::class, 'sign'])->name('athlete.contracts.sign');
    });

    // Subscriptions
    Route::get('/subscription', [SubscriptionController::class, 'index'])->name('subscription.index');
    Route::post('/subscription/checkout', [SubscriptionController::class, 'checkout'])->name('subscription.checkout');
    Route::get('/subscription/portal', [SubscriptionController::class, 'billingPortal'])->name('subscription.portal');
});

require __DIR__.'/auth.php';
