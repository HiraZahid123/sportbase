import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Users, CheckCircle, XCircle, AlertCircle, Phone, Mail, User, Settings2, Save, X } from 'lucide-react';
import ClubLayout from '@/Layouts/ClubLayout';

export default function Index({ pendingAthletes, activeAthletes, groups }) {
    const { post, processing } = useForm();

    const handleApprove = (id) => {
        post(route('club.athletes.approve', id));
    };

    const handleReject = (id) => {
        if (confirm('Are you sure you want to reject this athlete?')) {
            post(route('club.athletes.reject', id));
        }
    };

    const GroupSelector = ({ athlete }) => {
        const [isEditing, setIsEditing] = useState(false);
        const { data, setData, post: postUpdate, processing: updating } = useForm({
            training_group_id: athlete.training_group_id || '',
        });

        const handleUpdate = () => {
            postUpdate(route('club.athletes.update-group', athlete.user_id), {
                onSuccess: () => setIsEditing(false),
            });
        };

        if (!isEditing) {
            return (
                <div className="flex items-center gap-2 group/btn">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-bold border border-blue-100 italic">
                        {athlete.training_group?.name || 'Unassigned'}
                    </span>
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 opacity-0 group-hover/btn:opacity-100 transition-all"
                    >
                        <Settings2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            );
        }

        return (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2">
                <select
                    value={data.training_group_id}
                    onChange={(e) => setData('training_group_id', e.target.value)}
                    className="bg-white border-slate-200 focus:border-brand-blue focus:ring-brand-blue rounded-xl text-[10px] font-bold text-slate-700 h-8 py-0 transition-all"
                >
                    <option value="">Select...</option>
                    {groups.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select>
                <button 
                    disabled={updating}
                    onClick={handleUpdate}
                    className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all"
                >
                    <Save className="w-3.5 h-3.5" />
                </button>
                <button 
                    onClick={() => setIsEditing(false)}
                    className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all"
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            </div>
        );
    };

    const AthleteTable = ({ athletes, showActions = false, showGroupEdit = false, emptyMessage = "No athletes found" }) => (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50/50 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <th className="px-8 py-5">Athlete Information</th>
                        <th className="px-8 py-5">Training Group</th>
                        <th className="px-8 py-5">Contact Details</th>
                        {showActions && <th className="px-8 py-5 text-right">Approval Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {athletes.map((athlete) => (
                        <tr key={athlete.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-full bg-slate-100 text-slate-400 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-colors">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-800">{athlete.user.name}</div>
                                        <div className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                                            <Mail className="w-3.5 h-3.5" />
                                            {athlete.user.email}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                {showGroupEdit ? (
                                    <GroupSelector athlete={athlete} />
                                ) : (
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-bold border border-blue-100">
                                        {athlete.training_group?.name || 'Unassigned'}
                                    </div>
                                )}
                            </td>
                            <td className="px-8 py-6">
                                <div className="text-sm text-slate-600 font-medium flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    {athlete.phone || 'No phone provided'}
                                </div>
                            </td>
                            {showActions && (
                                <td className="px-8 py-6">
                                    <div className="flex items-center justify-end gap-3">
                                        <button
                                            onClick={() => handleApprove(athlete.user_id)}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-green text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-md shadow-emerald-100"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(athlete.user_id)}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-400 text-xs font-bold rounded-xl hover:text-brand-red hover:bg-red-50 transition-all border border-slate-100"
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
                            <td colSpan={showActions ? 4 : 3} className="px-8 py-16 text-center">
                                <p className="text-slate-400 font-medium uppercase tracking-widest text-xs">{emptyMessage}</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <ClubLayout title="Manage Athletes">
            <div className="max-w-7xl mx-auto px-6 space-y-12">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Athlete Administration</h2>
                    <p className="text-slate-500 mt-2">Oversee your clinical membership and pending applications</p>
                </div>

                <div className="space-y-10">
                    {/* Pending Approvals */}
                    <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                                    <AlertCircle className="w-6 h-6 text-amber-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">
                                    Registration Requests
                                </h3>
                            </div>
                            {pendingAthletes.length > 0 && (
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 animate-pulse border border-amber-200">
                                    {pendingAthletes.length} PENDING
                                </span>
                            )}
                        </div>
                        <AthleteTable athletes={pendingAthletes} showActions={true} emptyMessage="No pending requests at this time" />
                    </div>

                    {/* Active Athletes */}
                    <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                                    <Users className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">
                                    Active Roster
                                </h3>
                            </div>
                            {activeAthletes.length > 0 && (
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                                    {activeAthletes.length} TOTAL
                                </span>
                            )}
                        </div>
                        <AthleteTable athletes={activeAthletes} showGroupEdit={true} emptyMessage="No active athletes found" />
                    </div>
                </div>
            </div>
        </ClubLayout>
    );
}
