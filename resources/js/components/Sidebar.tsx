import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import {
  ChevronDown,
  LayoutDashboard,
  Users,
  Stethoscope,
  FileText,
} from 'lucide-react';

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <div className="flex min-h-screen bg-pink-50">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-pink-400 to-pink-600 text-white p-6 shadow-2xl rounded-r-3xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-center tracking-wide font-serif">
            💖 MaClinique
          </h1>
        </div>

        {/* Dashboard */}
        <a
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-2 hover:bg-pink-500 hover:shadow rounded-md transition"
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </a>

        {/* Patientes */}
        <Disclosure>
          {({ open }) => (
            <div className="mt-4">
              <Disclosure.Button className="flex w-full items-center justify-between px-4 py-2 hover:bg-pink-500 hover:shadow rounded-md transition">
                <span className="flex items-center gap-3">
                  <Users size={20} />
                  Patientes
                </span>
                <ChevronDown
                  className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pl-12 mt-2 space-y-2 text-sm text-pink-100">
                <a
                  href="/patientes/liste"
                  className="block hover:text-yellow-200 transition"
                >
                  👩‍⚕️ Liste des patientes
                </a>
                <a
                  href="/patientes/ajouter"
                  className="block hover:text-yellow-200 transition"
                >
                  ➕ Ajouter une patiente
                </a>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        {/* Consultations */}
        <Disclosure>
          {({ open }) => (
            <div className="mt-4">
              <Disclosure.Button className="flex w-full items-center justify-between px-4 py-2 hover:bg-pink-500 hover:shadow rounded-md transition">
                <span className="flex items-center gap-3">
                  <Stethoscope size={20} />
                  Consultations
                </span>
                <ChevronDown
                  className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pl-12 mt-2 space-y-2 text-sm text-pink-100">
                <a
                  href="/consultations/prenatales"
                  className="block hover:text-yellow-200 transition"
                >
                  🤰 Prénatales
                </a>
                <a
                  href="/consultations/postnatales"
                  className="block hover:text-yellow-200 transition"
                >
                  👶 Postnatales
                </a>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        {/* Rapports */}
        <a
          href="/rapports"
          className="flex items-center gap-3 px-4 py-2 mt-4 hover:bg-pink-500 hover:shadow rounded-md transition"
        >
          <FileText size={20} />
          <span className="font-medium">Rapports</span>
        </a>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
