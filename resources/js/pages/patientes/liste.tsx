import Sidebar from '@/components/Sidebar';
import { Trash } from 'lucide-react';
import React, { useState } from 'react';

type Patiente = {
    id: number;
    nom: string;
    prenom: string;
    dateNaissance: string;
    numero: string;
    dateEnregistrement: string;
    dossierCree: boolean;
    prescription?: string;
    medecin?: string;
};

const Liste: React.FC = () => {
    const [patientes, setPatientes] = useState<Patiente[]>([
        {
            id: 1,
            nom: 'Diop',
            prenom: 'Aminata',
            dateNaissance: '1985-06-15',
            numero: '770123456',
            dateEnregistrement: '2025-04-10',
            dossierCree: true,
            prescription: 'Paracétamol 500mg',
            medecin: 'Dr. Diallo',
        },
        {
            id: 2,
            nom: 'Ndiaye',
            prenom: 'Moussa',
            dateNaissance: '1990-02-20',
            numero: '771987654',
            dateEnregistrement: '2025-04-12',
            dossierCree: true,
            prescription: 'Amoxicilline 250mg',
            medecin: 'Dr. Sarr',
        },
        {
            id: 3,
            nom: 'Kouadio',
            prenom: 'Nadine',
            dateNaissance: '1992-11-02',
            numero: '773456789',
            dateEnregistrement: '2025-04-15',
            dossierCree: true,
            prescription: 'Ibuprofène 400mg',
            medecin: 'Dr. Toure',
        },
        {
            id: 4,
            nom: 'Sow',
            prenom: 'Mamadou',
            dateNaissance: '1987-09-30',
            numero: '770654321',
            dateEnregistrement: '2025-03-25',
            dossierCree: true,
            prescription: 'Oméprazole 20mg',
            medecin: 'Dr. Mbaye',
        },
        {
            id: 5,
            nom: 'Toure',
            prenom: 'Fatoumata',
            dateNaissance: '1995-04-18',
            numero: '771234567',
            dateEnregistrement: '2025-03-28',
            dossierCree: true,
            prescription: 'Loratadine 10mg',
            medecin: 'Dr. Keita',
        },
    ]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchQuery, setSearchQuery] = useState('');
    const [showConfirmDelete, setShowConfirmDelete] = useState<{ id: number | null; show: boolean }>({ id: null, show: false });

    const handleDownload = () => {
        const csvContent = [
            ['ID', 'Nom', 'Prénom', 'Date de Naissance', 'Numéro', "Date d'Enregistrement", 'Dossier Créé'],
            ...patientes.map((patiente) => [
                patiente.id,
                patiente.nom,
                patiente.prenom,
                patiente.dateNaissance,
                patiente.numero,
                patiente.dateEnregistrement,
                patiente.dossierCree ? 'Oui' : 'Non',
            ]),
        ]
            .map((row) => row.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'liste_patientes.csv';
        link.click();
    };

    const handleDelete = (id: number) => {
        setPatientes(patientes.filter((patiente) => patiente.id !== id));
        setShowConfirmDelete({ id: null, show: false });
    };

    const cancelDelete = () => {
        setShowConfirmDelete({ id: null, show: false });
    };

    const filteredPatientes = patientes.filter(
        (patiente) =>
            patiente.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patiente.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patiente.numero.includes(searchQuery),
    );

    return (
        <div className="flex h-screen bg-pink-50">
            <Sidebar children={undefined} />
            <div className="flex-1 overflow-y-auto p-6">
                {/* Barre d'infos simplifiée */}
                <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-pink-600">Consultations</h1>
                        <p className="text-sm text-gray-500">Dernière mise à jour : {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="relative mb-4">
                        <input type="text" placeholder="Rechercher une patiente..." className="w-full rounded-lg border py-2 pr-4 pl-10" />
                        <span className="absolute top-2.5 left-3">🔍</span>
                    </div>
                </div>
                {/* Tableau historique */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-pink-600">Historique des Consultations</h2>
                        <div className="flex space-x-2">
                            <a
                                href="/patiente/nouveau"
                                className="rounded-lg bg-pink-500 px-4 py-2 font-semibold text-white transition hover:bg-pink-600"
                            >
                                Ajouter une Patiente
                            </a>
                            <button
                                onClick={handleDownload}
                                className="rounded-lg bg-pink-300 px-4 py-2 font-semibold text-white transition hover:bg-pink-400"
                            >
                                Télécharger Liste
                            </button>
                        </div>
                    </div>
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="border-b text-left text-gray-500">
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Date D'Enregistrement</th>
                                <th className="px-4 py-2">Nom</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatientes.map((patiente) => (
                                <tr key={patiente.id} className="border-t hover:bg-pink-50">
                                    <td className="px-4 py-2">{patiente.numero.substring(0, 6)}</td>
                                    <td className="px-4 py-2">{patiente.dateEnregistrement}</td>
                                    <td className="px-4 py-2">
                                        {patiente.prenom} {patiente.nom} — {patiente.medecin}
                                    </td>
                                    <td className="flex items-center space-x-2 px-4 py-2">
                                        <a
                                            href={`/patiente/${patiente.id}/dossier`}
                                            className="rounded bg-pink-500 px-3 py-1 text-white hover:bg-pink-600"
                                        >
                                            Voir dossier
                                        </a>
                                        <a
                                            href={`/patiente/${patiente.id}/dossier/nouveau`}
                                            className="rounded bg-pink-300 px-3 py-1 text-white hover:bg-pink-400"
                                        >
                                            Créer dossier
                                        </a>
                                        <button
                                            onClick={() => setShowConfirmDelete({ id: patiente.id, show: true })}
                                            className="ml-2 text-red-500 hover:text-red-600"
                                        >
                                            <Trash className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Message de confirmation */}
                    {showConfirmDelete.show && (
                        <div className="mt-4 rounded-lg bg-red-100 p-4 text-red-800">
                            <p className="font-semibold">Êtes-vous sûr de vouloir supprimer cette patiente ?</p>
                            <div className="mt-2 flex justify-center space-x-4">
                                <button
                                    onClick={() => handleDelete(showConfirmDelete.id!)}
                                    className="rounded-lg bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
                                >
                                    Oui, supprimer
                                </button>
                                <button onClick={cancelDelete} className="rounded-lg bg-gray-300 px-4 py-2 text-black hover:bg-gray-400">
                                    Annuler
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Liste;
