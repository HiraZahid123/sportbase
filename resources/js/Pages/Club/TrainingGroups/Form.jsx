import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

export default function Form({ group = null }) {
    const isEditing = !!group;

    const { data, setData, post, put, processing, errors, recentlySuccessful } = useForm({
        name: group?.name || '',
        description: group?.description || '',
        price: group?.price || '',
        max_members: group?.max_members || '',
        schedule_json: group?.schedule_json || [{ day: 'Monday', time: '17:00' }],
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('club.training-groups.update', group.id));
        } else {
            post(route('club.training-groups.store'));
        }
    };

    const addScheduleItem = () => {
        setData('schedule_json', [...data.schedule_json, { day: 'Monday', time: '17:00' }]);
    };

    const removeScheduleItem = (index) => {
        const newSchedule = [...data.schedule_json];
        newSchedule.splice(index, 1);
        setData('schedule_json', newSchedule);
    };

    const updateScheduleItem = (index, field, value) => {
        const newSchedule = [...data.schedule_json];
        newSchedule[index][field] = value;
        setData('schedule_json', newSchedule);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                {isEditing ? 'Edit Training Group' : 'Create Training Group'}
            </h2>}
        >
            <Head title={isEditing ? 'Edit Training Group' : 'Create Training Group'} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6 max-w-xl">
                                <div>
                                    <InputLabel htmlFor="name" value="Group Name" />
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        isFocused
                                    />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="Description" />
                                    <textarea
                                        id="description"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.description} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="price" value="Monthly Price (€)" />
                                        <TextInput
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            className="mt-1 block w-full"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            required
                                        />
                                        <InputError className="mt-2" message={errors.price} />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="max_members" value="Max Members" />
                                        <TextInput
                                            id="max_members"
                                            type="number"
                                            className="mt-1 block w-full"
                                            value={data.max_members}
                                            onChange={(e) => setData('max_members', e.target.value)}
                                            required
                                        />
                                        <InputError className="mt-2" message={errors.max_members} />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <InputLabel value="Training Schedule" />
                                        <button
                                            type="button"
                                            onClick={addScheduleItem}
                                            className="text-xs text-indigo-600 hover:text-indigo-900"
                                        >
                                            + Add Session
                                        </button>
                                    </div>
                                    
                                    {data.schedule_json.map((item, index) => (
                                        <div key={index} className="flex space-x-2 mb-2">
                                            <select
                                                value={item.day}
                                                onChange={(e) => updateScheduleItem(index, 'day', e.target.value)}
                                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                                            >
                                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                                    <option key={day} value={day}>{day}</option>
                                                ))}
                                            </select>
                                            <TextInput
                                                type="time"
                                                className="block w-full text-sm"
                                                value={item.time}
                                                onChange={(e) => updateScheduleItem(index, 'time', e.target.value)}
                                            />
                                            {data.schedule_json.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeScheduleItem(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    &times;
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <InputError className="mt-2" message={errors.schedule_json} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save Group</PrimaryButton>
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600">Saved.</p>
                                    </Transition>
                                    <Link href={route('club.training-groups.index')} className="text-sm text-gray-600 hover:underline">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
