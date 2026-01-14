<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Club;
use App\Models\User;

class Contract extends Model
{
    use HasFactory;

    protected $fillable = [
        'club_id', 'athlete_id', 'template_path', 'signed_path', 'status'
    ];

    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function athlete()
    {
        return $this->belongsTo(User::class, 'athlete_id');
    }
}
