import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import ClubLayout from '@/Layouts/ClubLayout';
import { Save, X, Calendar, DollarSign, Users, Type, AlignLeft, Trash2, Plus } from 'lucide-react';

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
        <ClubLayout title={isEditing ? 'Edit Training Group' : 'Create Training Group'}>
            <div className="max-w-4xl mx-auto px-6">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">
                            {isEditing ? 'Configure Group' : 'New Training Group'}
                        </h2>
                        <p className="text-slate-500 mt-2">Define the schedule, pricing, and capacity for your athletes</p>
                    </div>
                    <Link 
                        href={route('club.training-groups.index')}
                        className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-all"
                    >
                        <X className="w-6 h-6" />
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden">
                    <form onSubmit={submit} className="p-10 space-y-10">
                        {/* Basic Info Section */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
                                <Type className="w-5 h-5 text-brand-blue" />
                                <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">General Information</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-8">
                                <div className="space-y-2">
                                    <InputLabel htmlFor="name" value="Group Designation" className="text-slate-600 font-bold" />
                                    <TextInput
                                        id="name"
                                        placeholder="e.g. U14 Competitive Squad"
                                        className="mt-1 block w-full bg-slate-50/50 border-slate-200 focus:border-brand-blue focus:ring-brand-blue rounded-xl py-3"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        isFocused
                                    />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div className="space-y-2">
                                    <InputLabel htmlFor="description" value="Service Description" className="text-slate-600 font-bold" />
                                    <textarea
                                        id="description"
                                        placeholder="Tell athletes what to expect from this group..."
                                        className="mt-1 block w-full bg-slate-50/50 border-slate-200 focus:border-brand-blue focus:ring-brand-blue rounded-xl min-h-[120px] transition-all"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.description} />
                                </div>
                            </div>
                        </div>

                        {/* Financials & Capacity Section */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
                                <DollarSign className="w-5 h-5 text-emerald-600" />
                                <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Capacity & Billing</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <InputLabel htmlFor="price" value="Monthly Subscription Fee (€)" className="text-slate-600 font-bold" />
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-bold">€</div>
                                        <TextInput
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            className="mt-1 block w-full pl-10 bg-slate-50/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl py-3"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError className="mt-2" message={errors.price} />
                                </div>
                                <div className="space-y-2">
                                    <InputLabel htmlFor="max_members" value="Maximum Roster Size" className="text-slate-600 font-bold" />
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                            <Users className="w-4 h-4" />
                                        </div>
                                        <TextInput
                                            id="max_members"
                                            type="number"
                                            className="mt-1 block w-full pl-10 bg-slate-50/50 border-slate-200 focus:border-brand-blue focus:ring-brand-blue rounded-xl py-3"
                                            value={data.max_members}
                                            onChange={(e) => setData('max_members', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError className="mt-2" message={errors.max_members} />
                                </div>
                            </div>
                        </div>

                        {/* Schedule Section */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-50">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-amber-600" />
                                    <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Weekly Schedule</h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={addScheduleItem}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black bg-slate-100 text-slate-600 hover:bg-brand-blue hover:text-white transition-all uppercase tracking-tighter"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Session
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                {data.schedule_json.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 group animate-in fade-in slide-in-from-left-2 transition-all duration-300">
                                        <div className="flex-1 grid grid-cols-2 gap-4">
                                            <select
                                                value={item.day}
                                                onChange={(e) => updateScheduleItem(index, 'day', e.target.value)}
                                                className="bg-white border-slate-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl text-sm font-bold text-slate-700 h-12 transition-all"
                                            >
                                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                                    <option key={day} value={day}>{day}</option>
                                                ))}
                                            </select>
                                            <TextInput
                                                type="time"
                                                className="bg-white border-slate-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl text-sm font-bold text-slate-700 h-12"
                                                value={item.time}
                                                onChange={(e) => updateScheduleItem(index, 'time', e.target.value)}
                                            />
                                        </div>
                                        {data.schedule_json.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeScheduleItem(index)}
                                                className="text-slate-300 hover:text-brand-red p-2 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <InputError className="mt-2" message={errors.schedule_json} />
                            </div>
                        </div>

                        {/* Submit Section */}
                        <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <PrimaryButton 
                                    className="bg-brand-blue px-10 py-4 rounded-2xl shadow-lg shadow-blue-100 font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:translate-y-[-2px] transition-all" 
                                    disabled={processing}
                                >
                                    <Save className="w-5 h-5" />
                                    {isEditing ? 'Commit Changes' : 'Initialize Group'}
                                </PrimaryButton>
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-emerald-600 font-bold bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">Success! Configuration saved.</p>
                                </Transition>
                            </div>
                            <Link 
                                href={route('club.training-groups.index')} 
                                className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
                            >
                                Cancel Operation
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </ClubLayout>
    );
}
