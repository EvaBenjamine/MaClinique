import { Disclosure } from '@headlessui/react';
import { ChevronDown, FileText, LayoutDashboard, Stethoscope, Users } from 'lucide-react';

interface SidebarProps {
    children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
    return (
        <div className="flex h-screen overflow-hidden bg-pink-100">
            {/* Sidebar - non scrollable */}
            <aside className="h-screen w-72 overflow-y-auto rounded-r-3xl bg-gradient-to-b from-pink-300 to-violet-500 p-6 text-white shadow-2xl">
                <div className="mb-10">
                    <h1 className="text-center font-serif text-4xl font-bold tracking-wide">💖 MaClinique</h1>
                </div>

                <nav className="flex flex-col space-y-4">
                    {/* Dashboard */}
                    <a href="/dashboard" className="flex items-center gap-3 rounded-md px-4 py-2 transition hover:bg-violet-600 hover:shadow">
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Dashboard</span>
                    </a>

                    {/* Patientes */}
                    <Disclosure>
                        {({ open }) => (
                            <div>
                                <Disclosure.Button className="flex w-full items-center justify-between rounded-md px-4 py-2 transition hover:bg-violet-600 hover:shadow">
                                    <span className="flex items-center gap-3">
                                        <Users size={20} />
                                        Patientes
                                    </span>
                                    <ChevronDown className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                                </Disclosure.Button>
                                <Disclosure.Panel className="mt-2 space-y-2 pl-12 text-sm text-violet-100">
                                    <a href="/patientes/liste" className="block transition hover:text-yellow-200">
                                        👩‍⚕️ Liste des patientes
                                    </a>
                                    <a href="/patientes/ajouter" className="block transition hover:text-yellow-200">
                                        ➕ Ajouter une patiente
                                    </a>
                                </Disclosure.Panel>
                            </div>
                        )}
                    </Disclosure>

                    {/* Consultations */}
                    <Disclosure>
                        {({ open }) => (
                            <div>
                                <Disclosure.Button className="flex w-full items-center justify-between rounded-md px-4 py-2 transition hover:bg-violet-600 hover:shadow">
                                    <span className="flex items-center gap-3">
                                        <Stethoscope size={20} />
                                        Consultations
                                    </span>
                                    <ChevronDown className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                                </Disclosure.Button>
                                <Disclosure.Panel className="mt-2 space-y-2 pl-12 text-sm text-violet-100">
                                    <a href="/consultations/prenatales" className="block transition hover:text-yellow-200">
                                        🤰 Prénatales
                                    </a>
                                    <a href="/consultations/postnatales" className="block transition hover:text-yellow-200">
                                        👶 Postnatales
                                    </a>
                                </Disclosure.Panel>
                            </div>
                        )}
                    </Disclosure>

                    {/* Dossiers médicaux */}
                    <Disclosure>
                        {({ open }) => (
                            <div>
                                <Disclosure.Button className="flex w-full items-center justify-between rounded-md px-4 py-2 transition hover:bg-violet-600 hover:shadow">
                                    <span className="flex items-center gap-3">
                                        <Stethoscope size={20} />
                                        Dossiers médicaux
                                    </span>
                                    <ChevronDown className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                                </Disclosure.Button>
                                <Disclosure.Panel className="mt-2 space-y-2 pl-12 text-sm text-violet-100">
                                    <a href="/dossierMedical/VoirDossier" className="block transition hover:text-yellow-200">
                                        Voir Dossier
                                    </a>
                                    <a href="/dossierMedical/postnatales" className="block transition hover:text-yellow-200">
                                        👶 Postnatales
                                    </a>
                                </Disclosure.Panel>
                            </div>
                        )}
                    </Disclosure>

                    {/* Rapports */}
                    <a href="/rapports" className="flex items-center gap-3 rounded-md px-4 py-2 transition hover:bg-violet-600 hover:shadow">
                        <FileText size={20} />
                        <span className="font-medium">Rapports</span>
                    </a>

                    {/* Utilisateurs */}
                    <a href="/users" className="flex items-center gap-3 rounded-md px-4 py-2 transition hover:bg-violet-600 hover:shadow">
                        <Users size={20} />
                        <span className="font-medium">Utilisateurs</span>
                    </a>
                </nav>
            </aside>

            {/* Contenu principal - scrollable */}
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
    );
}
