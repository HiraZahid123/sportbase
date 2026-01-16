import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import ClubLayout from '@/Layouts/ClubLayout';
import { FileUp, FileText, CheckCircle, Clock, ExternalLink, Download } from 'lucide-react';

export default function Index({ contracts, athletes }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        athlete_id: '',
        template: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('club.contracts.upload'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <ClubLayout title="Contracts Management">
            <div className="max-w-7xl mx-auto px-6 space-y-12">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Contract Management</h2>
                    <p className="text-slate-500 mt-2">Upload templates and track signed agreements with athletes</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Upload Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2.5 rounded-xl bg-brand-blue/10">
                                        <FileUp className="w-6 h-6 text-brand-blue" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800">New Template</h3>
                                </div>

                                <form onSubmit={submit} className="space-y-6">
                                    <div className="space-y-2">
                                        <InputLabel htmlFor="athlete_id" value="Select Athlete" className="text-slate-600 font-bold" />
                                        <select
                                            id="athlete_id"
                                            className="mt-1 block w-full bg-slate-50 border-slate-200 focus:border-brand-blue focus:ring-brand-blue rounded-xl shadow-sm transition-all"
                                            value={data.athlete_id}
                                            onChange={(e) => setData('athlete_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Choose an athlete...</option>
                                            {athletes.map(athlete => (
                                                <option key={athlete.user.id} value={athlete.user.id}>{athlete.user.name}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.athlete_id} className="mt-2" />
                                    </div>

                                    <div className="space-y-2">
                                        <InputLabel htmlFor="template" value="PDF Document" className="text-slate-600 font-bold" />
                                        <div className="relative group">
                                            <input
                                                id="template"
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => setData('template', e.target.files[0])}
                                                className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition-all cursor-pointer"
                                                required
                                            />
                                        </div>
                                        <InputError message={errors.template} className="mt-2" />
                                    </div>

                                    <PrimaryButton 
                                        className="w-full bg-brand-blue flex justify-center py-4 rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all font-bold" 
                                        disabled={processing}
                                    >
                                        Upload Template
                                    </PrimaryButton>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Existing Contracts Table */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30 flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-slate-100">
                                    <FileText className="w-5 h-5 text-slate-500" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">Agreement Tracking</h3>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-100">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-8 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Athlete</th>
                                            <th className="px-8 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                            <th className="px-8 py-5 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Documents</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-100">
                                        {contracts.length === 0 ? (
                                            <tr>
                                                <td colSpan="3" className="px-8 py-12 text-center text-slate-400 font-medium">
                                                    No contracts uploaded yet
                                                </td>
                                            </tr>
                                        ) : (
                                            contracts.map((contract) => (
                                                <tr key={contract.id} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <div className="font-bold text-slate-800 group-hover:text-brand-blue transition-colors">
                                                            {contract.athlete.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-tighter uppercase ${
                                                            contract.status === 'signed' 
                                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                                                        }`}>
                                                            {contract.status === 'signed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                            {contract.status.replace('_', ' ')}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center justify-end gap-6 text-sm font-bold">
                                                            <a 
                                                                href={`/storage/${contract.template_path}`} 
                                                                target="_blank" 
                                                                className="text-slate-400 hover:text-brand-blue flex items-center gap-1.5 transition-colors"
                                                            >
                                                                <Download className="w-4 h-4" />
                                                                Template
                                                            </a>
                                                            {contract.signed_path && (
                                                                <a 
                                                                    href={`/storage/${contract.signed_path}`} 
                                                                    target="_blank" 
                                                                    className="text-emerald-500 hover:text-emerald-700 flex items-center gap-1.5 transition-colors"
                                                                >
                                                                    <CheckCircle className="w-4 h-4" />
                                                                    Signed
                                                                </a>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ClubLayout>
    );
}
