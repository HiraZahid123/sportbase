import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Plus, Edit2, Trash2, UsersRound, ArrowUpRight } from 'lucide-react';
import ClubLayout from '@/Layouts/ClubLayout';

export default function Index({ groups }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this group?')) {
            destroy(route('club.training-groups.destroy', id));
        }
    };

    return (
        <ClubLayout title="Training Groups">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">Training Groups</h2>
                        <p className="text-slate-500 mt-1">Manage your club's training sessions and capacity</p>
                    </div>
                    <Link
                        href={route('club.training-groups.create')}
                        className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                    >
                        <Plus className="w-4 h-4" />
                        New Group
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
                    {groups.length === 0 ? (
                        <div className="p-16 text-center">
                            <div className="p-4 rounded-full bg-slate-50 w-fit mx-auto mb-4">
                                <UsersRound className="w-12 h-12 text-slate-300" />
                            </div>
                            <p className="text-slate-500 font-medium">No training groups found. Click "New Group" to get started.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                        <th className="px-8 py-5">Group Name</th>
                                        <th className="px-8 py-5">Capacity</th>
                                        <th className="px-8 py-5">Monthly Price</th>
                                        <th className="px-8 py-5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {groups.map((group) => (
                                        <tr key={group.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="font-bold text-slate-800">{group.name}</div>
                                                <div className="text-sm text-slate-500 line-clamp-1 max-w-xs">{group.description}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-slate-800">{group.athlete_profiles_count}</span>
                                                    <span className="text-slate-400 text-sm">/ {group.max_members} members</span>
                                                </div>
                                                <div className="w-32 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                                    <div 
                                                        className="h-full bg-brand-blue rounded-full" 
                                                        style={{ width: `${Math.min((group.athlete_profiles_count / group.max_members) * 100, 100)}%` }}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="font-black text-slate-800">€{group.price}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center justify-end gap-4">
                                                    <Link
                                                        href={route('club.training-groups.edit', group.id)}
                                                        className="inline-flex items-center p-2 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-brand-blue/5 transition-all"
                                                        title="Edit"
                                                    >
                                                        <Edit2 className="w-5 h-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(group.id)}
                                                        className="inline-flex items-center p-2 rounded-lg text-slate-400 hover:text-brand-red hover:bg-brand-red/5 transition-all"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
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
        </ClubLayout>
    );
}
