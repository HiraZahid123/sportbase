<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        return Inertia::render('Subscription/Index', [
            'isSubscribed' => $user->subscribed('default'),
            'stripeKey' => config('cashier.key'),
            'userGroup' => $user->role === 'athlete' ? $user->athleteProfile->load('trainingGroup')->trainingGroup : null,
        ]);
    }

    public function checkout(Request $request)
    {
        $user = auth()->user();
        $user->createOrGetStripeCustomer();

        if ($user->role === 'club') {
            return $user->newSubscription('default', 'price_yearly_club')
                ->checkout([
                    'success_url' => route('dashboard'),
                    'cancel_url' => route('subscription.index'),
                ]);
        }

        if ($user->role === 'athlete') {
            $group = $user->athleteProfile->trainingGroup;
            
            return $user->newSubscription('default', 'price_monthly_athlete')
                ->checkout([
                    'success_url' => route('dashboard'),
                    'cancel_url' => route('subscription.index'),
                    'metadata' => [
                        'group_id' => $group->id,
                        'group_price' => $group->price,
                    ]
                ]);
        }
    }

    public function billingPortal(Request $request)
    {
        return $request->user()->redirectToBillingPortal(route('dashboard'));
    }
}
