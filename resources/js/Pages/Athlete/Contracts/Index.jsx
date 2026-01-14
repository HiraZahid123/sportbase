import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Index({ contracts }) {
    const { data, setData, post, processing, errors } = useForm({
        signed_file: null,
    });

    const handleSign = (e, contractId) => {
        e.preventDefault();
        post(route('athlete.contracts.sign', contractId));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-slate-800 leading-tight">My Contracts</h2>}
        >
            <Head title="My Contracts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100">
                        <div className="p-8">
                            <h3 className="text-xl font-bold mb-6 flex items-center">
                                <span className="w-2 h-6 premium-gradient rounded-full me-3"></span>
                                Contract Documents
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-100">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Club</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {contracts.map((contract) => (
                                            <tr key={contract.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contract.club.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        contract.status === 'signed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {contract.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {contract.status === 'pending_athlete' ? (
                                                        <form onSubmit={(e) => handleSign(e, contract.id)} className="flex items-center space-x-4">
                                                            <a href={`/storage/${contract.template_path}`} target="_blank" className="text-indigo-600 hover:text-indigo-900">Download Template</a>
                                                            <div>
                                                                <input
                                                                    type="file"
                                                                    accept=".pdf"
                                                                    onChange={(e) => setData('signed_file', e.target.files[0])}
                                                                    className="text-xs text-gray-500"
                                                                    required
                                                                />
                                                                <InputError message={errors.signed_file} />
                                                            </div>
                                                            <PrimaryButton disabled={processing}>Upload Signed</PrimaryButton>
                                                        </form>
                                                    ) : (
                                                        <div className="flex space-x-4">
                                                            <a href={`/storage/${contract.template_path}`} target="_blank" className="text-gray-600 hover:text-gray-900">View Template</a>
                                                            <a href={`/storage/${contract.signed_path}`} target="_blank" className="text-green-600 hover:text-green-900">View Signed</a>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        {contracts.length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                                                    No contracts found.
                                                </td>
                                            </tr>
                                        )}
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
