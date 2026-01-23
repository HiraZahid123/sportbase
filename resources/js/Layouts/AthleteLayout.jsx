import React from "react";
import { Link, usePage, Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminFooter from "@/Components/AdminFooter";
import MainNavbar from "@/Components/MainNavbar";

export default function AthleteLayout({ children, title }) {
    const { flash } = usePage().props;

    React.useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <div className="min-h-screen bg-slate-50">
            {title && <Head title={title} />}
            
            <MainNavbar />

            <main className="py-8">
                {children}
            </main>

            <AdminFooter />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
