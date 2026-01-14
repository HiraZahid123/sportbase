import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

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

            <div className="py-12 space-y-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-12">
                    {/* Pending Clubs */}
                    <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8">
                        <div className="text-gray-900">
                            <h3 className="text-xl font-bold mb-6 text-orange-600 flex items-center">
                                <span className="w-2 h-6 bg-orange-400 rounded-full me-3"></span>
                                Pending Approval ({pendingClubs.length})
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Club Name</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Email</th>
                                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pendingClubs.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.club?.name || user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                                                    <PrimaryButton
                                                        onClick={() => handleAction(user.id, 'approve')}
                                                        className="premium-gradient text-white border-0 shadow-md shadow-green-100"
                                                    >
                                                        Approve
                                                    </PrimaryButton>
                                                    <button
                                                        onClick={() => handleAction(user.id, 'reject')}
                                                        className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                    >
                                                        Reject
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {pendingClubs.length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No pending requests.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* All Clubs */}
                    <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8">
                        <div className="text-gray-900">
                            <h3 className="text-xl font-bold mb-6 flex items-center">
                                <span className="w-2 h-6 premium-gradient rounded-full me-3"></span>
                                All Registered Clubs
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Name</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Payment</th>
                                            <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {allClubs.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.club?.name || user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        user.status === 'active' ? 'bg-green-100 text-green-800' :
                                                        user.status === 'pending' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.club?.is_paid ? (
                                                        <span className="text-green-600 font-bold">Paid</span>
                                                    ) : (
                                                        <span className="text-red-600">Unpaid</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <Link
                                                        href={route('admin.impersonate', user.id)}
                                                        method="post"
                                                        as="button"
                                                        className="text-indigo-600 hover:text-indigo-900 font-bold text-xs uppercase"
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
