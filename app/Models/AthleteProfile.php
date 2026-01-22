<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Club;
use App\Models\TrainingGroup;

class AthleteProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'club_id', 'registration_source', 'training_group_id', 'sex', 'birthday', 'weight', 'height', 'id_code', 'nationality', 'municipality', 'phone', 'address', 'emergency_contact_json', 'is_paid'
    ];

    protected $casts = [
        'emergency_contact_json' => 'array',
        'birthday' => 'date',
    ];

    /**
     * The possible values for registration_source field
     */
    const REGISTRATION_SOURCES = [
        'general' => 'general',
        'club_specific' => 'club-specific',
    ];

    /**
     * Check if the athlete was registered via club-specific URL
     */
    public function isClubSpecificRegistration(): bool
    {
        return $this->registration_source === self::REGISTRATION_SOURCES['club_specific'];
    }

    /**
     * Check if the athlete was registered via general registration
     */
    public function isGeneralRegistration(): bool
    {
        return $this->registration_source === self::REGISTRATION_SOURCES['general'];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function trainingGroup()
    {
        return $this->belongsTo(TrainingGroup::class);
    }

    /**
     * Get validation rules for AthleteProfile
     */
    public static function getValidationRules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'club_id' => 'nullable|exists:clubs,id',
            'registration_source' => 'required|in:general,club-specific',
            'training_group_id' => 'nullable|exists:training_groups,id',
            'sex' => 'nullable|in:male,female,other',
            'birthday' => 'nullable|date',
            'weight' => 'nullable|numeric|min:0|max:999.99',
            'height' => 'nullable|numeric|min:0|max:999.99',
            'id_code' => 'nullable|string|max:255',
            'nationality' => 'nullable|string|max:255',
            'municipality' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'emergency_contact_json' => 'nullable|array',
            'is_paid' => 'boolean',
        ];
    }
}
