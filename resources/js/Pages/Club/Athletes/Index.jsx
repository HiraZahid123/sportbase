import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function Index({ pendingAthletes, activeAthletes }) {
    const { post } = useForm();

    const handleApprove = (id) => {
        post(route('club.athletes.approve', id));
    };

    const handleReject = (id) => {
        if (confirm('Are you sure you want to reject this athlete?')) {
            post(route('club.athletes.reject', id));
        }
    };

    const AthleteTable = ({ athletes, showActions = false }) => (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Group</th>
                        <th className="px-6 py-4">Contact</th>
                        {showActions && <th className="px-6 py-4 text-center">Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {athletes.map((athlete) => (
                        <tr key={athlete.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="font-medium text-gray-900">{athlete.user.name}</div>
                                <div className="text-sm text-gray-500">{athlete.user.email}</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {athlete.training_group?.name || 'N/A'}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {athlete.phone}
                            </td>
                            {showActions && (
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleApprove(athlete.user_id)}
                                            className="inline-flex items-center gap-1 px-4 py-2 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(athlete.user_id)}
                                            className="inline-flex items-center gap-1 px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                    {athletes.length === 0 && (
                        <tr>
                            <td colSpan={showActions ? 4 : 3} className="px-6 py-8 text-center text-gray-400">
                                No athletes found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Athletes</h2>}
        >
            <Head title="Manage Athletes" />

            <div className="space-y-8">
                {/* Pending Approvals */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-orange-50">
                            <AlertCircle className="w-5 h-5 text-orange-600" />
                        </div>
                        <h3 className="font-bold text-gray-900">
                            Pending Approvals
                            {pendingAthletes.length > 0 && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                    {pendingAthletes.length}
                                </span>
                            )}
                        </h3>
                    </div>
                    <AthleteTable athletes={pendingAthletes} showActions={true} />
                </div>

                {/* Active Athletes */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-50">
                            <Users className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="font-bold text-gray-900">
                            Active Athletes
                            {activeAthletes.length > 0 && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {activeAthletes.length}
                                </span>
                            )}
                        </h3>
                    </div>
                    <AthleteTable athletes={activeAthletes} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
