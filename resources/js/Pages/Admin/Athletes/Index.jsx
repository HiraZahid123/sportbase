import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Users, Building, MapPin, Calendar } from 'lucide-react';

export default function Index({ athletes }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Athlete Management</h2>}
        >
            <Head title="Athletes" />

            <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-50">
                            <Users className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="font-bold text-gray-900">Registered Athletes</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Athlete Name</th>
                                    <th className="px-6 py-4">Club</th>
                                    <th className="px-6 py-4">Training Group</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Contact</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {athletes.map((athlete) => (
                                    <tr key={athlete.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{athlete.user?.name}</div>
                                            <div className="text-xs text-gray-500">{athlete.user?.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Building className="w-4 h-4 text-gray-400" />
                                                {athlete.club?.name || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-700">
                                                {athlete.training_group?.name || 'Unassigned'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                athlete.user?.status === 'active' ? 'bg-green-100 text-green-800' :
                                                athlete.user?.status === 'pending' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {athlete.user?.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">{athlete.phone}</div>
                                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                                <MapPin className="w-3 h-3" />
                                                {athlete.address}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {athletes.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                            No athletes registered yet
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
