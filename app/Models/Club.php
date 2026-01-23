<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\TrainingGroup;
use App\Models\AthleteProfile;
use App\Models\RegistrationAttempt;

class Club extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'name', 'email', 'phone', 'address', 'country', 'logo', 'description', 'is_paid', 'registration_identifier'
    ];

    /**
     * Boot method to automatically generate UUID on club creation
     */
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($club) {
            if (empty($club->registration_identifier)) {
                $club->registration_identifier = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the registration URL for this club
     */
    public function getRegistrationUrlAttribute(): string
    {
        return route('club.public.show', ['identifier' => $this->registration_identifier]);
    }

    /**
     * Regenerate the registration identifier for security purposes
     */
    public function regenerateRegistrationIdentifier(): void
    {
        $this->registration_identifier = (string) Str::uuid();
        $this->save();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function trainingGroups()
    {
        return $this->hasMany(TrainingGroup::class);
    }

    public function athletes()
    {
        return $this->hasMany(AthleteProfile::class);
    }

    /**
     * Get the registration attempts for this club
     */
    public function registrationAttempts()
    {
        return $this->hasMany(RegistrationAttempt::class);
    }
}
