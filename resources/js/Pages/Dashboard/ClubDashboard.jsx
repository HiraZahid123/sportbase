import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ClubDashboard({ club, stats }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Club Dashboard: {club.name}</h2>}
        >
            <Head title="Club Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl p-8 card-hover relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 premium-gradient opacity-10 rounded-bl-full -mr-12 -mt-12"></div>
                            <h3 className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-1">Training Groups</h3>
                            <p className="text-4xl font-bold text-indigo-900">{stats.groups_count}</p>
                            <Link href={route('club.training-groups.index')} className="text-indigo-600 text-sm font-semibold hover:underline mt-4 inline-flex items-center">
                                Manage Groups <span className="ms-1">→</span>
                            </Link>
                        </div>
                        <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl p-8 card-hover relative">
                            <div className="absolute top-0 right-0 w-24 h-24 premium-gradient opacity-10 rounded-bl-full -mr-12 -mt-12"></div>
                            <h3 className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-1">Active Athletes</h3>
                            <p className="text-4xl font-bold text-indigo-900">{stats.athletes_count}</p>
                            <Link href={route('club.athletes.index')} className="text-indigo-600 text-sm font-semibold hover:underline mt-4 inline-flex items-center">
                                Manage Athletes <span className="ms-1">→</span>
                            </Link>
                        </div>
                        <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl p-8 card-hover border-l-4 border-orange-400 relative">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 opacity-20 rounded-bl-full -mr-12 -mt-12"></div>
                            <h3 className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-1">Pending Requests</h3>
                            <p className="text-4xl font-bold text-orange-600">{stats.pending_athletes}</p>
                            <Link href={route('club.athletes.index')} className="text-orange-600 text-sm font-semibold hover:underline mt-4 inline-flex items-center">
                                Review Approvals <span className="ms-1">→</span>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                            <span className="w-2 h-8 premium-gradient rounded-full me-3"></span>
                            Quick Management Actions
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={route('club.training-groups.create')} className="premium-gradient text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:opacity-90 transition-opacity">Create Training Group</Link>
                            <Link href={route('club.contracts.index')} className="bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">Contract Management</Link>
                            <Link href={route('subscription.portal')} className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">Billing & Subscriptions</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
