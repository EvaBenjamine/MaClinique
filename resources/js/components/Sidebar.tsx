'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import { FileText, LayoutDashboard, LogOut, Stethoscope, User, Users, Baby, Heart, Calendar, ChevronDown } from 'lucide-react';

interface SidebarProps {
    children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
    const { url, props } = usePage();
    const user = props.auth?.user;

    const isActive = (path: string) => url.startsWith(path);

    const linkClass = (path: string) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
            isActive(path) ? 'bg-pink-600 shadow-inner text-white' : 'text-pink-100 hover:bg-pink-500 hover:text-white'
        }`;

    const handleLogout = () => {
        Inertia.post('/logout');
    };

    const getInitials = (nom: string, prenom: string): string => {
        return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
    };

    // Options du menu déroulant consultations
    const consultationItems = [

        {
            href: "/consultations/prenatales",
            icon: <Baby size={18} />,
            label: "Consultations prénatales"
        },
        {
            href: "/consultations/postnatales",
            icon: <Baby size={18} />,
            label: "Consultations postnatales"
        },
        // {
        //     href: "/consultations/suivi-grossesse",
        //     icon: <Calendar size={18} />,
        //     label: "Suivi de grossesse"
        // },
        // {
        //     href: "/consultations/urgences",
        //     icon: <Stethoscope size={18} />,
        //     label: "Consultations d'urgence"
        // }
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-pink-50">
            {/* Sidebar */}
            <aside className="flex h-full w-72 flex-col justify-between rounded-r-3xl bg-gradient-to-b from-pink-400 to-pink-600 p-6 text-pink-100 shadow-2xl">
                <div>
                    {/* Logo */}
                    <div className="mb-8 flex flex-col items-center gap-2 text-white">
                        <img src="/logo.jpg" alt="MaClinique Logo" width={200} height={200} className="rounded-lg" />
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        <Link href="/dashboard" className={linkClass('/dashboard')}>
                            <LayoutDashboard size={20} />
                            Dashboard
                        </Link>

                        <Link href="/patientes/liste" className={linkClass('/patientes')}>
                            <Users size={20} />
                            Patientes
                        </Link>

                        {/* Menu déroulant Consultations */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className={`${linkClass('/consultations')} w-full justify-between`}>
                                    <div className="flex items-center gap-3">
                                        <Stethoscope size={20} />
                                        Consultations
                                    </div>
                                    <ChevronDown size={16} className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                side="right"
                                align="start"
                                className="w-64 ml-2 bg-gradient-to-br from-pink-500 to-pink-600 text-pink-100 shadow-2xl border border-pink-400/50 rounded-xl backdrop-blur-sm"
                            >
                                {consultationItems.map((item, index) => (
                                    <DropdownMenuItem key={index} asChild>
                                        <Link
                                            href={item.href}
                                            className="flex items-center gap-3 px-4 py-3 text-pink-100 hover:bg-pink-400/50 hover:text-white transition-all duration-200 cursor-pointer rounded-lg mx-1 my-1 font-medium hover:shadow-md"
                                        >
                                            <div className="p-1 rounded-md bg-pink-400/30 hover:bg-pink-300/40 transition-colors">
                                                {item.icon}
                                            </div>
                                            <span>{item.label}</span>
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Link href="/patientes/dossier" className={linkClass('/dossier')}>
                            <Stethoscope size={20} />
                            Dossiers médicaux
                        </Link>

                        <Link href="/rapports" className={linkClass('/rapports')}>
                            <FileText size={20} />
                            Rapports
                        </Link>

                        <Link href="/users" className={linkClass('/users')}>
                            <Users size={20} />
                            Utilisateurs
                        </Link>
                    </nav>
                </div>

                {/* Zone utilisateur */}
                {user && (
                    <div className="mt-6 rounded-xl bg-pink-600 shadow-inner backdrop-blur-sm">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex w-full items-center gap-3 rounded-md p-2 text-white transition hover:bg-pink-500/40">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-200 font-bold text-pink-800">
                                        {getInitials(user.nom, user.prenom)}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-semibold">
                                            {user.prenom} {user.nom}
                                        </div>
                                        <div className="text-sm text-pink-200">{user.role || 'Utilisateur'}</div>
                                    </div>
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="mt-2 w-56 rounded-md bg-white text-gray-800 shadow-lg">
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="flex items-center gap-2 rounded-md px-2 py-2 transition hover:bg-pink-100">
                                        <User size={16} />
                                        Profil
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onSelect={(e) => {
                                        e.preventDefault();
                                        handleLogout();
                                    }}
                                    className="flex items-center gap-2 rounded-md px-2 py-2 text-red-600 transition hover:bg-red-100"
                                >
                                    <LogOut size={16} />
                                    Déconnexion
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
    );
}
