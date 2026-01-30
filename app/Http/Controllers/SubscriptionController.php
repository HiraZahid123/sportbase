<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $enrollments = $user->enrollments()->with('trainingGroup')->get();
        
        return Inertia::render('Subscription/Index', [
            'isSubscribed' => $user->subscriptions()->active()->exists(),
            'subscriptions' => $user->subscriptions()->active()->get(),
            'stripeKey' => config('cashier.key'),
            'enrollments' => $enrollments,
        ]);
    }

    public function checkout(Request $request)
    {
        $user = auth()->user();
        $user->createOrGetStripeCustomer();

        if ($user->role === 'club') {
            $checkout = $user->newSubscription('default', config('services.stripe.yearly_club_price_id'))
                ->checkout([
                    'success_url' => route('dashboard'),
                    'cancel_url' => route('subscription.index'),
                ]);
            return Inertia::location($checkout->url);
        }

        if ($user->role === 'athlete') {
            $groupId = $request->input('training_group_id');
            $group = \App\Models\TrainingGroup::findOrFail($groupId);
            
            // Generate a unique subscription name for this group
            $subscriptionName = "group_" . $group->id;

            $checkout = $user->newSubscription($subscriptionName, config('services.stripe.monthly_athlete_price_id'))
                ->checkout([
                    'success_url' => route('dashboard') . '?payment_success=1&group_id=' . $group->id,
                    'cancel_url' => route('subscription.index'),
                    'metadata' => [
                        'training_group_id' => $group->id,
                        'user_id' => $user->id,
                    ]
                ]);
            return Inertia::location($checkout->url);
        }
    }

    public function billingPortal(Request $request)
    {
        $user = $request->user();
        $user->createOrGetStripeCustomer();
        
        return Inertia::location($user->billingPortalUrl(route('dashboard')));
    }

    /**
     * Simulate a successful payment activation for development/testing.
     */
    public function activate(Request $request, int $groupId)
    {
        $user = auth()->user();
        $enrollment = $user->enrollments()->where('training_group_id', $groupId)->firstOrFail();
        
        $enrollment->update([
            'status' => 'active',
            'paid_until' => now()->addMonth(),
        ]);

        // Also activate the user if not already
        if ($user->status !== 'active') {
            $user->update(['status' => 'active']);
        }

        return redirect()->route('subscription.index')->with('success', "Membership for {$enrollment->trainingGroup->name} activated successfully!");
    }
}
