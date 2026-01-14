import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';

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
            <table className="min-w-full divide-y divide-slate-100">
                <thead>
                    <tr className="bg-slate-50/50">
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Name</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Group</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Contact</th>
                        {showActions && <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Actions</th>}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {athletes.map((athlete) => (
                        <tr key={athlete.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{athlete.user.name}</div>
                                <div className="text-sm text-gray-500">{athlete.user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {athlete.training_group?.name || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {athlete.phone}
                            </td>
                            {showActions && (
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleApprove(athlete.user_id)}
                                        className="text-green-600 hover:text-green-900 mr-4"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(athlete.user_id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Reject
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                    {athletes.length === 0 && (
                        <tr>
                            <td colSpan={showActions ? 4 : 3} className="px-6 py-4 text-center text-sm text-gray-500">
                                No athletes found.
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

            <div className="py-12 space-y-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100">
                        <div className="p-8">
                            <h3 className="text-xl font-bold mb-6 text-orange-600 flex items-center">
                                <span className="w-2 h-6 bg-orange-400 rounded-full me-3"></span>
                                Pending Approvals
                            </h3>
                            <AthleteTable athletes={pendingAthletes} showActions={true} />
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100">
                        <div className="p-8">
                            <h3 className="text-xl font-bold mb-6 text-green-600 flex items-center">
                                <span className="w-2 h-6 bg-green-400 rounded-full me-3"></span>
                                Active Athletes
                            </h3>
                            <AthleteTable athletes={activeAthletes} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
