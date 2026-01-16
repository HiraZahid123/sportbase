import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { Building2, CheckCircle, XCircle } from 'lucide-react';

export default function Index({ pendingClubs, allClubs }) {
    const { post } = useForm();

    const handleAction = (userId, action) => {
        if (confirm(`Are you sure you want to ${action} this club?`)) {
            post(route(`admin.clubs.${action}`, userId));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Club Management</h2>}
        >
            <Head title="Clubs" />

            <div className="space-y-8">
                {/* Pending Clubs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-50">
                            <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-gray-900">
                            Pending Approval 
                            {pendingClubs.length > 0 && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {pendingClubs.length}
                                </span>
                            )}
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Club Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {pendingClubs.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{user.club?.name || user.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleAction(user.id, 'approve')}
                                                    className="inline-flex items-center gap-1 px-4 py-2 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleAction(user.id, 'reject')}
                                                    className="inline-flex items-center gap-1 px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {pendingClubs.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-8 text-center text-gray-400">
                                            No pending approval requests
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* All Clubs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="font-bold text-gray-900">All Registered Clubs</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Payment</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {allClubs.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{user.club?.name || user.name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                user.status === 'active' ? 'bg-green-100 text-green-800' :
                                                user.status === 'pending' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.club?.is_paid ? (
                                                <span className="text-green-600 font-semibold text-sm">Paid</span>
                                            ) : (
                                                <span className="text-red-600 font-semibold text-sm">Unpaid</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Link
                                                href={route('admin.impersonate', user.id)}
                                                method="post"
                                                as="button"
                                                className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                                            >
                                                Login As
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
