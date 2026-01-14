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
        'user_id', 'club_id', 'training_group_id', 'sex', 'birthday', 'weight', 'height', 'id_code', 'nationality', 'municipality', 'phone', 'address', 'emergency_contact_json', 'is_paid'
    ];

    protected $casts = [
        'emergency_contact_json' => 'array',
        'birthday' => 'date',
    ];

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
}
