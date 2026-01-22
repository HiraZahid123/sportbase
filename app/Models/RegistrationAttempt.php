<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Club;

class RegistrationAttempt extends Model
{
    use HasFactory;

    protected $fillable = [
        'club_identifier',
        'ip_address',
        'user_agent',
        'success',
        'user_id',
        'club_id',
        'error_message',
        'registration_source'
    ];

    protected $casts = [
        'success' => 'boolean',
    ];

    /**
     * Validation rules for registration attempts
     */
    public static function rules(): array
    {
        return [
            'club_identifier' => 'nullable|string|max:36',
            'ip_address' => 'required|ip',
            'user_agent' => 'nullable|string|max:1000',
            'success' => 'required|boolean',
            'user_id' => 'nullable|exists:users,id',
            'club_id' => 'nullable|exists:clubs,id',
            'error_message' => 'nullable|string|max:1000',
            'registration_source' => 'required|in:general,club-specific',
        ];
    }

    /**
     * Get the user associated with this registration attempt
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the club associated with this registration attempt
     */
    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    /**
     * Scope to get successful registration attempts
     */
    public function scopeSuccessful($query)
    {
        return $query->where('success', true);
    }

    /**
     * Scope to get failed registration attempts
     */
    public function scopeFailed($query)
    {
        return $query->where('success', false);
    }

    /**
     * Scope to get attempts for a specific club identifier
     */
    public function scopeForClubIdentifier($query, $identifier)
    {
        return $query->where('club_identifier', $identifier);
    }

    /**
     * Scope to get attempts from a specific IP address
     */
    public function scopeFromIp($query, $ipAddress)
    {
        return $query->where('ip_address', $ipAddress);
    }

    /**
     * Scope to get recent attempts within specified hours
     */
    public function scopeRecent($query, $hours = 24)
    {
        return $query->where('created_at', '>=', now()->subHours($hours));
    }

    /**
     * Create a registration attempt record
     */
    public static function logAttempt(array $data): self
    {
        return self::create([
            'club_identifier' => $data['club_identifier'] ?? null,
            'ip_address' => $data['ip_address'] ?? request()->ip(),
            'user_agent' => $data['user_agent'] ?? request()->userAgent(),
            'success' => $data['success'] ?? false,
            'user_id' => $data['user_id'] ?? null,
            'club_id' => $data['club_id'] ?? null,
            'error_message' => $data['error_message'] ?? null,
            'registration_source' => $data['registration_source'] ?? 'general',
        ]);
    }

    /**
     * Get registration statistics for a club
     */
    public static function getClubStats($clubId, $days = 30): array
    {
        $attempts = self::where('club_id', $clubId)
            ->where('created_at', '>=', now()->subDays($days))
            ->get();

        return [
            'total_attempts' => $attempts->count(),
            'successful_attempts' => $attempts->where('success', true)->count(),
            'failed_attempts' => $attempts->where('success', false)->count(),
            'club_specific_attempts' => $attempts->where('registration_source', 'club-specific')->count(),
            'general_attempts' => $attempts->where('registration_source', 'general')->count(),
            'success_rate' => $attempts->count() > 0 ? 
                round(($attempts->where('success', true)->count() / $attempts->count()) * 100, 2) : 0,
        ];
    }
}