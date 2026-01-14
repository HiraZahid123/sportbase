import AdminSidebar from '@/Components/AdminSidebar';
import ClubSidebar from '@/Components/ClubSidebar';
import AthleteSidebar from '@/Components/AthleteSidebar';
import Header from '@/Components/Header';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Menu } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const isImpersonating = usePage().props.auth.isImpersonating;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Determine which sidebar to show based on user role
    let activeSidebar;
    if (user.role === 'super_admin') {
        activeSidebar = <AdminSidebar />;
    } else if (user.role === 'club') {
        activeSidebar = <ClubSidebar />;
    } else if (user.role === 'athlete') {
        activeSidebar = <AthleteSidebar />;
    } else {
        // Default sidebar for any other role
        activeSidebar = <AdminSidebar />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {isImpersonating && (
                <div className="bg-orange-600 text-white px-4 py-2 flex justify-between items-center sticky top-0 z-50 shadow-lg">
                    <span>You are currently impersonating <strong>{user.name}</strong></span>
                    <Link
                        href={route('stop-impersonating')}
                        method="post"
                        as="button"
                        className="bg-white text-orange-600 px-3 py-1 rounded-md text-sm font-bold hover:bg-gray-100"
                    >
                        Stop Impersonating
                    </Link>
                </div>
            )}

            <div className="flex">
                {/* Sidebar Desktop */}
                <div className="hidden lg:block">
                    {activeSidebar}
                </div>

                {/* Sidebar Mobile Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar Mobile */}
                <div className={`fixed inset-y-0 left-0 z-30 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:hidden`}>
                    {activeSidebar}
                </div>

                <div className="flex-1 flex flex-col min-w-0">
                    {/* Mobile Header with Menu Toggle */}
                    <div className="flex items-center bg-white border-b border-gray-200 lg:hidden px-4 h-16">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="text-gray-500 hover:text-orange-600"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="ml-4">
                            <h1 className="text-xl font-bold text-orange-600">SportBase</h1>
                        </div>
                    </div>

                    <Header />

                    {header && (
                        <header className="bg-white border-b border-gray-200 px-8 py-4">
                            <div className="mx-auto max-w-7xl">
                                {header}
                            </div>
                        </header>
                    )}

                    <main className="p-8 flex-1">
                        <div className="mx-auto max-w-7xl">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
