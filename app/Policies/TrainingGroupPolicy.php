<?php

namespace App\Policies;

use App\Models\TrainingGroup;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TrainingGroupPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'club';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, TrainingGroup $trainingGroup): bool
    {
        return $user->role === 'club' && $user->club && $user->club->id === $trainingGroup->club_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'club';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, TrainingGroup $trainingGroup): bool
    {
        return $user->role === 'club' && $user->club && $user->club->id === $trainingGroup->club_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, TrainingGroup $trainingGroup): bool
    {
        return $user->role === 'club' && $user->club && $user->club->id === $trainingGroup->club_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, TrainingGroup $trainingGroup): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, TrainingGroup $trainingGroup): bool
    {
        return false;
    }
}
