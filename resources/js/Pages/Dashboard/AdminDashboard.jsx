import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import {
    Building2,
    Users,
    ArrowUpRight,
    AlertCircle
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, href, badge }) => (
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
                {badge && (
                    <p className="text-xs text-orange-600 font-semibold mt-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {badge}
                    </p>
                )}
            </div>
        </motion.div>
    </Link>
);

export default function AdminDashboard({ stats }) {
    const { flash } = usePage().props;

    React.useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />
            <ToastContainer />

            <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Clubs"
                        value={stats.clubs_count}
                        icon={Building2}
                        color="text-blue-600"
                        href={route('admin.clubs.index')}
                        badge={stats.pending_clubs > 0 ? `${stats.pending_clubs} pending approval` : null}
                    />
                    <StatCard
                        title="Total Athletes"
                        value={stats.athletes_count}
                        icon={Users}
                        color="text-green-600"
                        href={route('admin.clubs.index')}
                    />
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                        <Link
                            href={route('admin.clubs.index')}
                            className="inline-flex items-center px-6 py-3 bg-orange-600 border border-transparent rounded-lg font-semibold text-sm text-white uppercase tracking-widest hover:bg-orange-700 active:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Manage Clubs
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
