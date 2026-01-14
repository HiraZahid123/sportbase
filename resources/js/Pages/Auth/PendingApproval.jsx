import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function PendingApproval() {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Account Pending Approval</h2>}
        >
            <Head title="Pending Approval" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl relative p-12 card-hover">
                        <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-10 rounded-bl-full -mr-16 -mt-16"></div>
                        <div className="text-center relative z-10">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">Wait for Approval</h3>
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                Your registration is complete! A Super Admin or Club Admin is currently reviewing your application.
                            </p>
                            <div className="bg-slate-50 rounded-xl p-4 inline-block border border-slate-100">
                                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Status: Pending Verification</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
