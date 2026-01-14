import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import {
    UsersRound,
    Users,
    AlertCircle,
    ArrowUpRight,
    Plus,
    FileText,
    CreditCard
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, href }) => (
    <Link href={href}>
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group"
        >
            <div className="flex justify-between items-start">
                <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors" />
            </div>
            <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
        </motion.div>
    </Link>
);

export default function ClubDashboard({ club, stats }) {
    const { flash } = usePage().props;

    React.useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Club Dashboard: {club.name}</h2>}
        >
            <Head title="Club Dashboard" />
            <ToastContainer />

            <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard
                        title="Training Groups"
                        value={stats.groups_count}
                        icon={UsersRound}
                        color="text-blue-600"
                        href={route('club.training-groups.index')}
                    />
                    <StatCard
                        title="Active Athletes"
                        value={stats.athletes_count}
                        icon={Users}
                        color="text-green-600"
                        href={route('club.athletes.index')}
                    />
                    <StatCard
                        title="Pending Requests"
                        value={stats.pending_athletes}
                        icon={AlertCircle}
                        color="text-orange-600"
                        href={route('club.athletes.index')}
                    />
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="font-bold text-gray-900">Quick Actions</h3>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={route('club.training-groups.create')}
                                className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-orange-700 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Create Training Group
                            </Link>
                            <Link
                                href={route('club.contracts.index')}
                                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
                            >
                                <FileText className="w-4 h-4" />
                                Contract Management
                            </Link>
                            <Link
                                href={route('subscription.portal')}
                                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors"
                            >
                                <CreditCard className="w-4 h-4" />
                                Billing & Subscriptions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
