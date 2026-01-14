import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import {
    Building2,
    Users,
    FileText,
    CreditCard,
    Calendar,
    Activity
} from 'lucide-react';

export default function AthleteDashboard({ profile, contracts_count }) {
    const { flash } = usePage().props;

    React.useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Dashboard</h2>}
        >
            <Head title="Athlete Dashboard" />
            <ToastContainer />

            <div className="space-y-8">
                {/* Profile Overview Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-orange-50">
                                <Building2 className="w-8 h-8 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{profile.club?.name || 'No Club Joined'}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                    <Users className="w-4 h-4" />
                                    {profile.training_group?.name || 'No Training Group'}
                                </p>
                            </div>
                        </div>
                        <div>
                            <span className={`inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider ${
                                profile.user?.status === 'active' 
                                    ? 'bg-green-50 text-green-700 border border-green-200' 
                                    : 'bg-orange-50 text-orange-700 border border-orange-200'
                            }`}>
                                <span className={`w-2 h-2 rounded-full me-2 ${profile.user?.status === 'active' ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`}></span>
                                {profile.user?.status?.toUpperCase() || 'UNKNOWN'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-lg bg-blue-50">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-800">Contract Status</h4>
                        </div>
                        <p className="text-gray-600 mb-4 text-sm">
                            You have <span className="font-bold text-blue-600">{contracts_count}</span> contract documents in your records.
                        </p>
                        <Link href={route('athlete.contracts.index')} className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm hover:gap-2 transition-all">
                            View My Contracts <span>→</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-lg bg-green-50">
                                <CreditCard className="w-6 h-6 text-green-600" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-800">Subscription</h4>
                        </div>
                        <p className="text-gray-600 mb-4 text-sm">
                            Managed by <span className="font-bold text-gray-900">{profile.club?.name || 'your club'}</span>. View your payment history and current plan.
                        </p>
                        <Link href={route('subscription.index')} className="inline-flex items-center gap-1 text-green-600 font-semibold text-sm hover:gap-2 transition-all">
                            Manage Billing <span>→</span>
                        </Link>
                    </motion.div>
                </div>

                {/* Training Schedule */}
                {profile.training_group?.schedule_json && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-orange-50">
                                <Calendar className="w-5 h-5 text-orange-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">Weekly Training Schedule</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {Array.isArray(profile.training_group.schedule_json) ? (
                                profile.training_group.schedule_json.map((session, index) => (
                                    <div key={index} className="group p-5 rounded-lg bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                                        <div className="flex items-start justify-between mb-2">
                                            <p className="font-bold text-orange-600 uppercase text-xs tracking-wider">{session.day}</p>
                                            <Activity className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors" />
                                        </div>
                                        <p className="text-xl font-bold text-gray-900">{session.time}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200 text-gray-400">
                                    Schedule not yet defined
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
