import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Edit2, Trash2, UsersRound } from 'lucide-react';

export default function Index({ groups }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this group?')) {
            destroy(route('club.training-groups.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Training Groups</h2>
                <Link
                    href={route('club.training-groups.create')}
                    className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-orange-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Create New Group
                </Link>
            </div>}
        >
            <Head title="Training Groups" />

            <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {groups.length === 0 ? (
                        <div className="p-12 text-center">
                            <UsersRound className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-400">No training groups found. Click "Create New Group" to get started.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Members</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {groups.map((group) => (
                                        <tr key={group.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{group.name}</div>
                                                <div className="text-sm text-gray-500">{group.description}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                <span className="font-medium text-gray-900">{group.athlete_profiles_count}</span> / {group.max_members}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                €{group.price} / month
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Link
                                                        href={route('club.training-groups.edit', group.id)}
                                                        className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-semibold text-sm transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(group.id)}
                                                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-semibold text-sm transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
