import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { 
    UsersRound, 
    Users, 
    AlertCircle, 
    Plus, 
    FileText, 
    CreditCard,
    ArrowUpRight,
    LayoutDashboard,
    Settings
} from "lucide-react";
import ClubLayout from "@/Layouts/ClubLayout";

export default function ClubDashboard({ club, stats }) {
    const statCards = [
        {
            title: "Training Groups",
            value: stats.groups_count,
            color: "text-brand-blue",
            route: route('club.training-groups.index'),
            icon: UsersRound
        },
        {
            title: "Active Athletes",
            value: stats.athletes_count,
            color: "text-brand-green",
            route: route('club.athletes.index'),
            icon: Users
        },
        {
            title: "Pending Requests",
            value: stats.pending_athletes,
            color: "text-brand-red",
            route: route('club.athletes.index'),
            icon: AlertCircle
        },
    ];

    return (
        <ClubLayout title="Club Dashboard">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Club Dashboard
                    </h1>
                    <p className="text-slate-500 mt-1">Logged in as {club.name}</p>
                </div>
                
                <div className="flex gap-4 mt-4 sm:mt-0">
                    <Link
                        href={route('club.training-groups.create')}
                        className="inline-flex items-center bg-brand-blue text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        New Group
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statCards.map((card) => (
                        <Link
                            key={card.title}
                            href={card.route}
                            className="block"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white shadow-card rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border border-slate-100 group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-lg ${card.color.replace('text-', 'bg-')}/10`}>
                                        <card.icon className={`w-6 h-6 ${card.color}`} />
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-brand-blue transition-colors" />
                                </div>
                                <h3 className="text-slate-500 text-sm font-medium">
                                    {card.title}
                                </h3>
                                <p className={`mt-2 text-3xl font-semibold ${card.color}`}>
                                    {card.value}
                                </p>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Quick Actions / Integration Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-card border border-slate-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                            <LayoutDashboard className="w-5 h-5 text-brand-blue" />
                            <h3 className="text-lg font-bold text-slate-800">Quick Management</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link
                                href={route('club.contracts.index')}
                                className="flex items-center p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all group"
                            >
                                <div className="p-2 rounded-lg bg-white border border-slate-100 mr-4 group-hover:border-brand-blue/30">
                                    <FileText className="w-5 h-5 text-slate-600 group-hover:text-brand-blue" />
                                </div>
                                <span className="font-semibold text-slate-700">Contracts</span>
                            </Link>
                            <Link
                                href={route('subscription.portal')}
                                className="flex items-center p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all group"
                            >
                                <div className="p-2 rounded-lg bg-white border border-slate-100 mr-4 group-hover:border-brand-green/30">
                                    <CreditCard className="w-5 h-5 text-slate-600 group-hover:text-brand-green" />
                                </div>
                                <span className="font-semibold text-slate-700">Billing</span>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-card border border-slate-100 p-8 flex flex-col justify-center items-center text-center">
                        <div className="p-4 rounded-full bg-blue-50 mb-4">
                            <Settings className="w-8 h-8 text-brand-blue" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Need Help?</h3>
                        <p className="text-slate-600 mb-6">
                            Manage your club members, training groups, and documentation easily. For any technical issues, contact our support team.
                        </p>
                        <Link 
                            href={route('profile.edit')}
                            className="text-brand-blue font-bold hover:underline"
                        >
                            Update Profile Settings →
                        </Link>
                    </div>
                </div>
            </div>
        </ClubLayout>
    );
}
