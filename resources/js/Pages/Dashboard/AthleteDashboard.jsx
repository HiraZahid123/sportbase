import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function AthleteDashboard({ profile, contracts_count }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-slate-800 leading-tight">My Dashboard</h2>}
        >
            <Head title="Athlete Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-1">{profile.club?.name || 'No Club Joined'}</h3>
                                <p className="text-lg text-slate-500 flex items-center">
                                    <span className="premium-gradient w-2 h-2 rounded-full me-2"></span>
                                    {profile.training_group?.name || 'No Training Group'}
                                </p>
                            </div>
                            <div className="text-right w-full md:w-auto">
                                <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest ${
                                    profile.user?.status === 'active' 
                                        ? 'bg-green-50 text-green-700 border border-green-100' 
                                        : 'bg-orange-50 text-orange-700 border border-orange-100'
                                }`}>
                                    <span className={`w-2 h-2 rounded-full me-2 ${profile.user?.status === 'active' ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`}></span>
                                    Status: {profile.user?.status?.toUpperCase() || 'UNKNOWN'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8 card-hover">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl">✍️</div>
                                <h4 className="text-lg font-bold text-slate-800">Contract Status</h4>
                            </div>
                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                                You have <span className="font-bold text-indigo-600">{contracts_count}</span> contract documents in your records.
                            </p>
                            <Link href={route('athlete.contracts.index')} className="inline-flex items-center text-indigo-600 font-bold hover:gap-2 transition-all">
                                View My Contracts <span className="ms-1">→</span>
                            </Link>
                        </div>

                        <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8 card-hover">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl">💳</div>
                                <h4 className="text-lg font-bold text-slate-800">Subscription</h4>
                            </div>
                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                                Managed by <span className="font-bold text-slate-900">{profile.club?.name || 'your club'}</span>. View your payment history and current plan.
                            </p>
                            <Link href={route('subscription.index')} className="inline-flex items-center text-emerald-600 font-bold hover:gap-2 transition-all">
                                Manage Billing <span className="ms-1">→</span>
                            </Link>
                        </div>
                    </div>

                    {profile.training_group?.schedule_json && (
                        <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8">
                            <h4 className="text-xl font-bold mb-8 text-slate-900 flex items-center">
                                <span className="w-2 h-6 premium-gradient rounded-full me-3"></span>
                                Weekly Training Schedule
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {Array.isArray(profile.training_group.schedule_json) ? (
                                    profile.training_group.schedule_json.map((session, index) => (
                                        <div key={index} className="group relative p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-indigo-50">
                                            <p className="font-black text-indigo-600 uppercase text-xs tracking-[0.2em] mb-2">{session.day}</p>
                                            <p className="text-2xl font-bold text-slate-900">{session.time}</p>
                                            <div className="absolute top-4 right-4 text-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity">📅</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400">
                                        Schedule format invalid or not yet defined.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
