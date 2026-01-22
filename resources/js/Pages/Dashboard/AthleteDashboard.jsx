import React from "react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { 
    Building2, 
    Users, 
    FileText, 
    CreditCard, 
    Calendar, 
    Activity,
    ArrowUpRight,
    UserCircle
} from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AthleteDashboard({ profile, contracts_count }) {
    return (
        <AuthenticatedLayout header={
            <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                            <UserCircle className="w-12 h-12 text-brand-blue" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-800">
                                {profile.user?.name || 'Athlete Name'}
                            </h1>
                            <div className="flex items-center gap-4 mt-2">
                                <p className="text-slate-500 flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    {profile.club?.name || 'No Club Joined'}
                                </p>
                                <p className="text-slate-500 flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    {profile.training_group?.name || 'No Training Group'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className={`inline-flex items-center px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                            profile.user?.status === 'active' 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                            <span className={`w-2 h-2 rounded-full me-2 ${profile.user?.status === 'active' ? 'bg-emerald-500 transition-all shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`}></span>
                            {profile.user?.status?.toUpperCase() || 'UNKNOWN'}
                        </span>
                    </div>
                </div>
            </div>
        }>
            <div className="max-w-7xl mx-auto px-6 space-y-8 pb-12 py-8">
                {/* Stats / Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-card border border-slate-100 p-8 hover:shadow-lg transition-all"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-blue-50">
                                    <FileText className="w-6 h-6 text-brand-blue" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-800">Contract Records</h4>
                            </div>
                            <Link href={route('athlete.contracts.index')}>
                                <ArrowUpRight className="w-5 h-5 text-slate-400 hover:text-brand-blue transition-colors" />
                            </Link>
                        </div>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            You currently have <span className="font-bold text-slate-800">{contracts_count}</span> contract documents in our secure storage.
                        </p>
                        <Link 
                            href={route('athlete.contracts.index')} 
                            className="inline-flex items-center justify-center w-full bg-slate-50 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-100 transition-colors border border-slate-100"
                        >
                            Manage My Contracts
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-card border border-slate-100 p-8 hover:shadow-lg transition-all"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-emerald-50">
                                    <CreditCard className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-800">Payments & Plan</h4>
                            </div>
                            <Link href={route('subscription.index')}>
                                <ArrowUpRight className="w-5 h-5 text-slate-400 hover:text-emerald-500 transition-colors" />
                            </Link>
                        </div>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Managed through <span className="font-bold text-slate-800">{profile.club?.name || 'your sport club'}</span>. Keep track of your contributions.
                        </p>
                        <Link 
                            href={route('subscription.index')} 
                            className="inline-flex items-center justify-center w-full bg-slate-50 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-100 transition-colors border border-slate-100"
                        >
                            View Subscription details
                        </Link>
                    </motion.div>
                </div>

                {/* Training Schedule Section */}
                {profile.training_group?.schedule_json && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-card border border-slate-100 p-8"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-2.5 rounded-xl bg-brand-blue">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-2xl font-bold text-slate-800">Weekly Training Schedule</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {Array.isArray(profile.training_group.schedule_json) ? (
                                profile.training_group.schedule_json.map((session, index) => (
                                    <div key={index} className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                                        <div className="flex items-start justify-between mb-4">
                                            <p className="font-bold text-brand-blue uppercase text-xs tracking-widest">{session.day}</p>
                                            <Activity className="w-4 h-4 text-slate-300 group-hover:text-brand-blue transition-colors" />
                                        </div>
                                        <p className="text-2xl font-black text-slate-800 tracking-tight">{session.time}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <p className="text-slate-400 font-medium">Training schedule details will appear here once defined by your club.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
