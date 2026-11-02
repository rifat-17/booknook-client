import Link from "next/link";
import {
    BookOpen,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";
import {
    FaFacebookF,
    FaInstagram,
} from "react-icons/fa6";
export function Footer() {
    return (
        <footer className="border-t border-orange-100 bg-[#FFF3E3]">
            <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Logo & Description */}
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-orange-600 text-white">
                                <BookOpen className="size-5" />
                            </div>

                            <span className="text-2xl font-bold tracking-tight text-[#172033]">
                                Book<span className="text-orange-600">Nook</span>
                            </span>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
                            BookNook is your cozy corner for discovering amazing books,
                            exploring new ideas, and finding your next favorite read.
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-base font-bold text-[#172033]">
                            Get in Touch
                        </h3>

                        <ul className="mt-5 space-y-4">
                            <li className="flex items-center gap-3 text-sm text-slate-600">
                                <Mail className="size-4 shrink-0 text-orange-600" />
                                <a
                                    href="mailto:hello@booknook.com"
                                    className="transition hover:text-orange-600"
                                >
                                    hello@booknook.com
                                </a>
                            </li>

                            <li className="flex items-center gap-3 text-sm text-slate-600">
                                <Phone className="size-4 shrink-0 text-orange-600" />
                                <a href="tel:+8801234567890">
                                    +880 1234567890
                                </a>
                            </li>

                            <li className="flex items-center gap-3 text-sm text-slate-600">
                                <MapPin className="size-4 shrink-0 text-orange-600" />
                                <span>Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>


                    {/* Social Links */}
                    <div>
                        <h3 className="text-base font-bold text-[#172033]">
                            Follow Us
                        </h3>

                        <p className="mt-5 text-sm leading-7 text-slate-600">
                            Stay connected and discover more stories with us.
                        </p>

                        <div className="mt-5 flex items-center gap-3">
                            <a
                                href="https://facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="flex size-10 items-center justify-center rounded-full bg-white text-[#1877F2] shadow-sm transition hover:-translate-y-1 hover:bg-[#1877F2] hover:text-white"
                            >
                                <FaFacebookF className="size-4" />
                            </a>

                            <a
                                href="https://instagram.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="flex size-10 items-center justify-center rounded-full bg-white text-[#E4405F] shadow-sm transition hover:-translate-y-1 hover:bg-[#E4405F] hover:text-white"
                            >
                                <FaInstagram className="size-5" />
                            </a>



                            <a
                                href="mailto:hello@booknook.com"
                                aria-label="Email"
                                className="flex size-10 items-center justify-center rounded-full bg-white text-orange-600 shadow-sm transition hover:-translate-y-1 hover:bg-orange-600 hover:text-white"
                            >
                                <Mail className="size-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 border-t border-orange-200 pt-6 text-center">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} BookNook. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}