import React from "react";
import { Link, usePage, Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminFooter from "@/Components/AdminFooter";

export default function ClubLayout({ children, title }) {
    const { flash } = usePage().props;

    React.useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <div className="min-h-screen bg-slate-50">
            {title && <Head title={title} />}
            
            {/* Navbar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href={route("dashboard")}>
                        <img
                            src="/logos.png"
                            alt="Logo"
                            className="h-12 object-contain cursor-pointer"
                        />
                    </Link>
                    <div className="space-x-6 flex items-center">
                        <Link
                            href={route("dashboard")}
                            className={`text-slate-700 hover:text-brand-blue font-medium transition-colors duration-200 ${route().current('dashboard') ? 'text-brand-blue' : ''}`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route("club.training-groups.index")}
                            className={`text-slate-700 hover:text-brand-blue font-medium transition-colors duration-200 ${route().current('club.training-groups.*') ? 'text-brand-blue' : ''}`}
                        >
                            Groups
                        </Link>
                        <Link
                            href={route("club.athletes.index")}
                            className={`text-slate-700 hover:text-brand-blue font-medium transition-colors duration-200 ${route().current('club.athletes.index') ? 'text-brand-blue' : ''}`}
                        >
                            Athletes
                        </Link>
                        <Link
                            href={route("club.contracts.index")}
                            className={`text-slate-700 hover:text-brand-blue font-medium transition-colors duration-200 ${route().current('club.contracts.index') ? 'text-brand-blue' : ''}`}
                        >
                            Contracts
                        </Link>
                        <Link
                            href={route("profile.edit")}
                            className={`text-slate-700 hover:text-brand-blue font-medium transition-colors duration-200 ${route().current('profile.edit') ? 'text-brand-blue' : ''}`}
                        >
                            Profile
                        </Link>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="text-slate-700 hover:text-brand-blue font-medium transition-colors duration-200"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="py-8">
                {children}
            </main>

            <AdminFooter />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
