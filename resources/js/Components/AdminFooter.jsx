import React from "react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function AdminFooter() {
    return (
        <footer className="bg-blue-100/90 border-t border-blue-200 mt-16 py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo & Tagline */}
                <motion.div
                    className="flex flex-col items-start space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Link href={route("dashboard")}>
                        {/* Ensure logos.png exists in public folder or replace */}
                        <img
                            src="/logos.png"
                            alt="Admin Logo"
                            className="h-12 object-contain cursor-pointer"
                        />
                    </Link>
                    <p className="text-slate-700 text-sm max-w-xs">
                        SportBase — your platform to discover, register, and
                        join sports clubs with ease.
                    </p>
                    <div className="flex-shrink-0 !mt-1">
                        <img
                            src="/blurple.svg"
                            alt="Powered by Stripe"
                            className="h-16 md:h-7 object-contain opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
                        />
                    </div>
                </motion.div>

                {/* Quick Links */}
                <motion.div
                    className="flex flex-col space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    <h4 className="text-slate-800 font-semibold mb-2">
                        Quick Links
                    </h4>
                    <Link
                        href={route("dashboard")}
                        className="text-slate-700 hover:text-brand-blue transition-colors"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href={route("admin.clubs.index")}
                        className="text-slate-700 hover:text-brand-blue transition-colors"
                    >
                        Clubs
                    </Link>
                    <Link
                        href={route("profile.edit")}
                        className="text-slate-700 hover:text-brand-blue transition-colors"
                    >
                        Profile
                    </Link>
                    {/* <Link
                        href={route("events.contact")}
                        className="text-slate-700 hover:text-brand-blue transition-colors"
                    >
                        Contact Us
                    </Link> */}
                    <Link
                        href={route("logout")}
                        className="text-slate-700 hover:text-brand-blue transition-colors"
                    >
                        Logout
                    </Link>
                </motion.div>

                {/* Legal & Social */}
                <motion.div
                    className="flex flex-col space-y-4 items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="h-12 object-contain cursor-pointer"
                        onClick={() =>
                            window.open(
                                "https://www.mlsporttech.ee",
                                "_blank",
                                "noopener,noreferrer"
                            )
                        }
                    />

                    <p className="text-slate-600 text-xs mt-4">
                        © {new Date().getFullYear()} ML SPORT Technologies. All
                        rights reserved.
                        <br />
                        <a
                            href="/policy.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-brand-blue transition-colors mx-1 hover:underline"
                        >
                            Policy
                        </a>{" "}
                        |
                        <a
                            href="/terms.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-brand-blue transition-colors mx-1 hover:underline"
                        >
                            Terms
                        </a>
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
