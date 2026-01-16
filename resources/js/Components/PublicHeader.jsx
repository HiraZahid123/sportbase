import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function PublicHeader() {
    const { auth } = usePage().props;

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-white/20 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href={route("welcome")}>
                    <motion.img
                        src="/logos.png"
                        alt="Logo"
                        className="h-12 object-contain"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                </Link>

                <motion.div
                    className="space-x-6 flex items-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Link
                        href={route("welcome")}
                        className="text-slate-700 hover:text-brand-blue font-medium transition-all duration-200 hover:scale-105"
                    >
                        Home
                    </Link>
                    {auth?.user ? (
                        <Link
                            href={route("dashboard")}
                            className="text-slate-700 hover:text-brand-blue font-medium transition-all duration-200 hover:scale-105"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="text-slate-700 hover:text-brand-blue font-medium transition-all duration-200 hover:scale-105"
                            >
                                Login
                            </Link>
                            <Link
                                href={route("register")}
                                className="text-slate-700 hover:text-brand-blue font-medium transition-all duration-200 hover:scale-105"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </motion.div>
            </div>
        </nav>
    );
}
