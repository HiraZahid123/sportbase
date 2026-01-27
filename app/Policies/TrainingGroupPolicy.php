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
    public function viewAny(User $user): bool
    {
        return $user->role === 'club' || $user->role === 'super_admin';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, TrainingGroup $trainingGroup): Response
    {
        if ($user->role === 'super_admin') return Response::allow();
        
        if ($user->role !== 'club') {
            return Response::deny('Unauthorized: Your role must be Club.');
        }
        
        if (!$user->club) {
            return Response::deny('Unauthorized: No club profile found for this account.');
        }
        
        if ($user->club->id !== $trainingGroup->club_id) {
            return Response::deny('Unauthorized: You do not have permission to view this group.');
        }
        
        return Response::allow();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'club' || $user->role === 'super_admin';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, TrainingGroup $trainingGroup): Response
    {
        if ($user->role === 'super_admin') return Response::allow();
        
        if ($user->role !== 'club') {
            return Response::deny('Unauthorized: Your role must be Club.');
        }
        
        $club = $user->club;
        if (!$club) {
            return Response::deny('Unauthorized: No club profile found for this account.');
        }
        
        if ($club->id != $trainingGroup->club_id) {
            return Response::deny("Unauthorized: You do not have permission to edit this group. (User Club ID: {$club->id}, Group Owner Club ID: {$trainingGroup->club_id})");
        }
        
        return Response::allow();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, TrainingGroup $trainingGroup): Response
    {
        if ($user->role === 'super_admin') return Response::allow();
        
        if ($user->role !== 'club') {
            return Response::deny('Unauthorized: Your role must be Club.');
        }
        
        $club = $user->club;
        if (!$club) {
            return Response::deny('Unauthorized: No club profile found for this account.');
        }
        
        if ($club->id != $trainingGroup->club_id) {
            return Response::deny("Unauthorized: You do not have permission to delete this group. (User Club ID: {$club->id}, Group Owner Club ID: {$trainingGroup->club_id})");
        }
        
        return Response::allow();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, TrainingGroup $trainingGroup): bool
    {
        return $user->role === 'super_admin';
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, TrainingGroup $trainingGroup): bool
    {
        return $user->role === 'super_admin';
    }
}
