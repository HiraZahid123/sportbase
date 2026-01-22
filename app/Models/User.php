<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\RegistrationAttempt;

use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
        'last_login_at',
    ];

    public function club()
    {
        return $this->hasOne(Club::class);
    }

    public function athleteProfile()
    {
        return $this->hasOne(AthleteProfile::class);
    }

    /**
     * Get the registration attempts for this user
     */
    public function registrationAttempts()
    {
        return $this->hasMany(RegistrationAttempt::class);
    }

    public function impersonate(User $user)
    {
        session()->put('impersonated_by', auth()->id());
        auth()->login($user);
    }

    public function stopImpersonating()
    {
        if (session()->has('impersonated_by')) {
            auth()->loginUsingId(session()->pull('impersonated_by'));
        }
    }

    public function isImpersonating()
    {
        return session()->has('impersonated_by');
    }

    public function isAdmin()
    {
        return $this->role === 'super_admin';
    }

    public function isClub()
    {
        return $this->role === 'club';
    }

    public function isAthlete()
    {
        return $this->role === 'athlete';
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'last_login_at' => 'datetime',
        ];
    }
}
