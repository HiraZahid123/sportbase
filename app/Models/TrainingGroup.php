<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Club;
use App\Models\AthleteProfile;

class TrainingGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'club_id', 'name', 'description', 'schedule_json', 'price', 'max_members'
    ];

    protected $casts = [
        'schedule_json' => 'array',
    ];

    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function athleteProfiles()
    {
        return $this->hasMany(AthleteProfile::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'enrollments');
    }
}
