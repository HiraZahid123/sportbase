import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ isSubscribed, stripeKey }) {
    const { post, processing } = useForm();

    const handleCheckout = () => {
        post(route('subscription.checkout'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Subscription</h2>}
        >
            <Head title="Subscription" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-center">
                            {isSubscribed ? (
                                <div>
                                    <h3 className="text-2xl font-bold text-green-600 mb-4">You are active!</h3>
                                    <p className="mb-6">Your subscription is currently active. You can manage your billing and payment methods below.</p>
                                    <a
                                        href={route('subscription.portal')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Go to Billing Portal
                                    </a>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">Activate Your Account</h3>
                                    <p className="mb-6 text-gray-600">To start using SportBase, you need to subscribe to our platform.</p>
                                    <PrimaryButton onClick={handleCheckout} disabled={processing}>
                                        {processing ? 'Processing...' : 'Subscribe Now'}
                                    </PrimaryButton>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
