import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

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
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-slate-800 leading-tight">Contracts Management</h2>}
        >
            <Head title="Contracts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-12">
                    <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100">
                        <div className="p-8">
                            <h3 className="text-xl font-bold mb-6 flex items-center">
                                <span className="w-2 h-6 premium-gradient rounded-full me-3"></span>
                                Upload New Contract Template
                            </h3>
                            <form onSubmit={submit} className="space-y-4 max-w-xl">
                                <div>
                                    <InputLabel htmlFor="athlete_id" value="Select Athlete" />
                                    <select
                                        id="athlete_id"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.athlete_id}
                                        onChange={(e) => setData('athlete_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Select an athlete</option>
                                        {athletes.map(athlete => (
                                            <option key={athlete.user.id} value={athlete.user.id}>{athlete.user.name}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.athlete_id} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="template" value="PDF Template" />
                                    <input
                                        id="template"
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setData('template', e.target.files[0])}
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                                        required
                                    />
                                    <InputError message={errors.template} className="mt-2" />
                                </div>

                                <PrimaryButton className="premium-gradient text-white px-8 py-3 rounded-xl shadow-lg shadow-indigo-100 hover:opacity-90 transition-all border-0 font-bold" disabled={processing}>Upload Template</PrimaryButton>
                            </form>
                        </div>
                    </div>

                    <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100">
                        <div className="p-8">
                            <h3 className="text-xl font-bold mb-6 flex items-center">
                                <span className="w-2 h-6 premium-gradient rounded-full me-3"></span>
                                Existing Contracts
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-100">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Athlete</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {contracts.map((contract) => (
                                            <tr key={contract.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contract.athlete.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        contract.status === 'signed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {contract.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <a href={`/storage/${contract.template_path}`} target="_blank" className="text-indigo-600 hover:text-indigo-900 mr-4">Template</a>
                                                    {contract.signed_path && (
                                                        <a href={`/storage/${contract.signed_path}`} target="_blank" className="text-green-600 hover:text-green-900">Signed</a>
                                                    )}
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
