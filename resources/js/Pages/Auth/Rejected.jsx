import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Rejected() {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Account Rejected</h2>}
        >
            <Head title="Account Rejected" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl relative p-12 card-hover border-t-4 border-red-500">
                        <div className="text-center relative z-10">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">Registration Rejected</h3>
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                Unfortunately, your account registration has been rejected. This may be due to incomplete information or administrative policies.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="premium-gradient text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:opacity-90 transition-opacity"
                                >
                                    Log Out
                                </Link>
                                <button className="bg-white border border-slate-200 text-slate-700 px-8 py-3 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
