import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import AthleteLayout from '@/Layouts/AthleteLayout';
import { FileDown, FileCheck, CheckCircle, Clock, ExternalLink, Download, UploadCloud, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index({ contracts }) {
    const { data, setData, post, processing, errors } = useForm({
        signed_file: null,
    });

    const handleSign = (e, contractId) => {
        e.preventDefault();
        post(route('athlete.contracts.sign', contractId));
    };

    return (
        <AthleteLayout title="My Contracts">
            <div className="max-w-7xl mx-auto px-6 space-y-12">
                <div>
                    <motion.h2 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl font-black text-slate-800 tracking-tight"
                    >
                        Official Agreement Documents
                    </motion.h2>
                    <p className="text-slate-500 mt-2">View and finalize your contracts with sports clubs</p>
                </div>

                <div className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 rounded-xl bg-brand-blue/10">
                                <FileCheck className="w-6 h-6 text-brand-blue" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">My Contracts</h3>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50/50 rounded-xl border border-blue-100">
                            <Info className="w-4 h-4 text-brand-blue" />
                            <span className="text-xs font-bold text-slate-600">Download, sign, and upload your PDF agreement</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Sporting Club</th>
                                    <th className="px-8 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Document Status</th>
                                    <th className="px-8 py-5 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Available Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                                {contracts.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="px-8 py-20 text-center">
                                            <div className="p-4 rounded-full bg-slate-50 w-fit mx-auto mb-4">
                                                <FileDown className="w-10 h-10 text-slate-200" />
                                            </div>
                                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No contract documents assigned to you yet</p>
                                        </td>
                                    </tr>
                                ) : (
                                    contracts.map((contract) => (
                                        <tr key={contract.id} className="hover:bg-slate-50/50 transition-all group">
                                            <td className="px-8 py-8">
                                                <div className="font-extrabold text-slate-800 text-lg group-hover:text-brand-blue transition-colors outline-none cursor-default">
                                                    {contract.club.name}
                                                </div>
                                            </td>
                                            <td className="px-8 py-8">
                                                <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase border ${
                                                    contract.status === 'signed' 
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                                        : 'bg-amber-50 text-amber-700 border-amber-100'
                                                }`}>
                                                    {contract.status === 'signed' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5 animate-pulse" />}
                                                    {contract.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-8 py-8">
                                                <div className="flex items-center justify-end">
                                                    {contract.status === 'pending_athlete' ? (
                                                        <form onSubmit={(e) => handleSign(e, contract.id)} className="flex items-center gap-6 bg-slate-100/50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                                                            <a 
                                                                href={`/storage/${contract.template_path}`} 
                                                                target="_blank" 
                                                                className="text-brand-blue p-3 bg-white rounded-xl shadow-sm hover:translate-y-[-2px] transition-all border border-blue-50 group/link"
                                                                title="Download Original Template"
                                                            >
                                                                <Download className="w-5 h-5" />
                                                            </a>
                                                            <div className="relative group/upload">
                                                                <input
                                                                    type="file"
                                                                    accept=".pdf"
                                                                    onChange={(e) => setData('signed_file', e.target.files[0])}
                                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                                    required
                                                                />
                                                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-slate-300 bg-white group-hover/upload:border-brand-blue group-hover/upload:bg-blue-50/50 transition-all">
                                                                    <UploadCloud className="w-5 h-5 text-slate-400 group-hover/upload:text-brand-blue" />
                                                                    <span className="text-xs font-bold text-slate-500 group-hover/upload:text-brand-blue">
                                                                        {data.signed_file ? data.signed_file.name : 'Choose signed PDF'}
                                                                    </span>
                                                                </div>
                                                                <InputError message={errors.signed_file} className="absolute top-full left-0 mt-1 whitespace-nowrap" />
                                                            </div>
                                                            <PrimaryButton 
                                                                className="bg-brand-blue px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.1em] hover:opacity-90 transition-all h-fit" 
                                                                disabled={processing}
                                                            >
                                                                Commit Signature
                                                            </PrimaryButton>
                                                        </form>
                                                    ) : (
                                                        <div className="flex gap-4">
                                                            <a 
                                                                href={`/storage/${contract.template_path}`} 
                                                                target="_blank" 
                                                                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-50 text-slate-500 hover:text-slate-800 transition-all border border-slate-100 font-bold text-sm"
                                                            >
                                                                <Download className="w-4 h-4" />
                                                                Original
                                                            </a>
                                                            <a 
                                                                href={`/storage/${contract.signed_path}`} 
                                                                target="_blank" 
                                                                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 text-emerald-600 hover:translate-y-[-2px] transition-all border border-emerald-100 font-bold text-sm shadow-md shadow-emerald-50"
                                                            >
                                                                <CheckCircle className="w-4 h-4" />
                                                                Signed Copy
                                                            </a>
                                                        </div>
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
        </AthleteLayout>
    );
}
