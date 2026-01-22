import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon } from "@heroicons/react/24/solid";
import AdminFooter from "@/Components/AdminFooter";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AdminDashboard({ stats }) {
    const { flash } = usePage().props;

    // Use stats from SportBase
    const totalClubs = stats?.clubs_count || 0;
    const totalAthletes = stats?.athletes_count || 0;
    const pendingClubs = stats?.pending_clubs || 0;
    
    // Placeholder for table data if not yet provided by controller
    const latestClubs = []; 

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                    <h1 className="text-3xl font-bold text-slate-800 mb-4 sm:mb-0">
                        Admin Dashboard
                    </h1>
                </div>
            }
        >
            <div className="max-w-7xl mx-auto px-6 space-y-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Total Clubs",
                            value: totalClubs,
                            color: "text-brand-blue",
                            route: route("admin.clubs.index"),
                        },
                        {
                            title: "Total Athletes",
                            value: totalAthletes,
                            color: "text-brand-green",
                            route: route("admin.clubs.index"), // Or athletes index if available
                        },
                        {
                            title: "Pending Clubs",
                            value: pendingClubs,
                            color: "text-brand-red",
                            route: route("admin.clubs.index"),
                        },
                    ].map((card) => (
                        <Link
                            key={card.title}
                            href={card.route}
                            className="block"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white shadow-card rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                            >
                                <h3 className="text-gray-500 text-sm font-medium">
                                    {card.title}
                                </h3>
                                <p
                                    className={`mt-2 text-3xl font-semibold ${card.color}`}
                                >
                                    {card.value}
                                </p>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <div className="overflow-x-auto rounded-lg !mb-5 shadow-card border bg-white">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">
                            Latest Clubs (Coming Soon)
                        </h3>
                    </div>
                    {/* Placeholder Table - Data Logic to be implemented */}
                    <table className="w-full table-auto border-collapse">
                        <thead className="bg-slate-100">
                            <tr>
                                {["Club Name", "Date", "Status", "Actions"].map((title) => (
                                    <th
                                        key={title}
                                        className="p-3 text-left text-slate-700 font-medium border-b"
                                    >
                                        {title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td
                                    colSpan={4}
                                    className="p-6 text-center text-gray-500"
                                >
                                    No data available yet
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <AdminFooter/>
            </div>
        </AuthenticatedLayout>
    );
}
