import Sidebar from '@/components/Sidebar';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale, // Ajout de ArcElement
    PieController,
    Title,
    Tooltip,
} from 'chart.js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Enregistrer les composants Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement, // Enregistrer ArcElement pour les graphiques circulaires
    PieController, // Enregistrer PieController pour les graphiques en secteurs
);

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalPatientes: 0,
        totalConsultationsPrenatales: 0,
        totalConsultationsPostnatales: 0,
        consultationsRestantes: 0,
    });

    useEffect(() => {
        // Simuler une API
        setStats({
            totalPatientes: 150,
            totalConsultationsPrenatales: 120,
            totalConsultationsPostnatales: 90,
            consultationsRestantes: 60,
        });
    }, []);

    // Données pour les graphiques
    const dataBarChart = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Consultations Mensuelles',
                data: [30, 45, 70, 50, 90, 120],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const dataPieChart = {
        labels: ['Prénatales', 'Postnatales'],
        datasets: [
            {
                data: [120, 90],
                backgroundColor: ['#FF99C8', '#FF6B81'],
                borderColor: ['#FF99C8', '#FF6B81'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Sidebar>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl py-6">
                <h2 className="text-3xl font-bold text-pink-700">Bienvenue sur le Dashboard 💕</h2>

                {/* Cartes de statistiques */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard title="Total Patientes" value={stats.totalPatientes} color="bg-pink-100" icon="👩‍⚕️" />
                    <StatCard title="Consultations Prénatales" value={stats.totalConsultationsPrenatales} color="bg-pink-200" icon="🤰" />
                    <StatCard title="Consultations Postnatales" value={stats.totalConsultationsPostnatales} color="bg-pink-300" icon="👶" />
                    <StatCard title="Consultations Restantes" value={stats.consultationsRestantes} color="bg-pink-400" icon="📅" />
                </div>

                {/* Graphiques */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                    <div className="rounded-xl bg-white p-6 shadow-md">
                        <h3 className="text-xl font-semibold text-pink-700">Consultations Mensuelles</h3>
                        <Bar data={dataBarChart} options={{ responsive: true }} />
                    </div>
                    <div className="rounded-xl bg-white p-6 shadow-md">
                        <h3 className="text-xl font-semibold text-pink-700">Répartition des Consultations</h3>
                        <Pie data={dataPieChart} options={{ responsive: true }} />
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}

// Composant réutilisable pour les cartes de stats
function StatCard({ title, value, color, icon }: { title: string; value: number; color: string; icon: string }) {
    return (
        <div className={`${color} transform rounded-2xl p-6 shadow-lg transition duration-300 hover:scale-[1.02]`}>
            <div className="text-4xl">{icon}</div>
            <h3 className="mt-2 text-lg font-semibold text-pink-800">{title}</h3>
            <p className="text-3xl font-bold text-pink-900">{value}</p>
        </div>
    );
}
