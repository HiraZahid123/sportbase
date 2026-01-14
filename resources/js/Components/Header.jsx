import React from 'react';
import { usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import { User, LogOut, ChevronDown } from 'lucide-react';

export default function Header() {
    const user = usePage().props.auth.user;

    return (
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-end sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
                            <span className="uppercase font-bold tracking-tight">{user.name}</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link href={route('profile.edit')}>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Profile
                            </div>
                        </Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                            <div className="flex items-center gap-2 text-red-600">
                                <LogOut className="w-4 h-4" />
                                Log Out
                            </div>
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </header>
    );
}
