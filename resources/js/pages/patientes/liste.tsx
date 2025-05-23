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
    groupeSanguin: string;
    typeConsultation: string; // Ajout du type de consultation
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
            groupeSanguin: 'A+',
            typeConsultation: 'Consultation générale',
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
            groupeSanguin: 'O-',
            typeConsultation: 'Consultation pédiatrique',
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
            groupeSanguin: 'B+',
            typeConsultation: 'Consultation spécialisée',
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
            groupeSanguin: 'AB+',
            typeConsultation: 'Consultation d\'urgence',
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
            groupeSanguin: 'A-',
            typeConsultation: 'Consultation de suivi',
        },
    ]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTypeConsultation, setSelectedTypeConsultation] = useState<string>(''); // Filtre par type de consultation
    const [showConfirmDelete, setShowConfirmDelete] = useState<{ id: number | null; show: boolean }>({ id: null, show: false });

    // Obtenir la liste unique des types de consultation
    const typesConsultation = Array.from(new Set(patientes.map(p => p.typeConsultation))).sort();

    // Fonction pour calculer l'âge
    const calculateAge = (dateNaissance: string): number => {
        const today = new Date();
        const birthDate = new Date(dateNaissance);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    const handleDownload = () => {
        const csvContent = [
            ['ID', 'Nom', 'Prénom', 'Type de Consultation', 'Groupe Sanguin', 'Médecin Traitant', 'Âge', 'Date de Naissance', 'Numéro', "Date d'Enregistrement", 'Dossier Créé'],
            ...patientes.map((patiente) => [
                patiente.id,
                patiente.nom,
                patiente.prenom,
                patiente.typeConsultation,
                patiente.groupeSanguin,
                patiente.medecin || '',
                calculateAge(patiente.dateNaissance),
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
        (patiente) => {
            // Filtre par recherche textuelle
            const matchesSearch = patiente.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                patiente.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                patiente.numero.includes(searchQuery) ||
                patiente.groupeSanguin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (patiente.medecin && patiente.medecin.toLowerCase().includes(searchQuery.toLowerCase()));

            // Filtre par type de consultation
            const matchesType = selectedTypeConsultation === '' || patiente.typeConsultation === selectedTypeConsultation;

            return matchesSearch && matchesType;
        }
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
                        <input
                            type="text"
                            placeholder="Rechercher par nom, prénom, groupe sanguin ou médecin..."
                            className="w-full rounded-lg border py-2 pr-4 pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className="absolute top-2.5 left-3">🔍</span>
                    </div>

                    {/* Filtres par type de consultation */}
                    <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Filtrer par type de consultation :</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedTypeConsultation('')}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                    selectedTypeConsultation === ''
                                        ? 'bg-pink-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Toutes ({patientes.length})
                            </button>
                            {typesConsultation.map((type) => {
                                const count = patientes.filter(p => p.typeConsultation === type).length;
                                return (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedTypeConsultation(type)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                            selectedTypeConsultation === type
                                                ? 'bg-pink-500 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {type} ({count})
                                    </button>
                                );
                            })}
                        </div>

                        {/* Indicateur de filtre actif */}
                        {selectedTypeConsultation && (
                            <div className="mt-2 text-sm text-pink-600">
                                📋 Filtré par : <span className="font-medium">{selectedTypeConsultation}</span>
                                <button
                                    onClick={() => setSelectedTypeConsultation('')}
                                    className="ml-2 text-pink-500 hover:text-pink-700 underline"
                                >
                                    Effacer le filtre
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tableau historique */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-pink-600">Liste des Patientes</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {filteredPatientes.length} patiente{filteredPatientes.length > 1 ? 's' : ''}
                                {selectedTypeConsultation && ` • ${selectedTypeConsultation}`}
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <a
                                href="/patientes/ajouter"
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

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="border-b text-left text-gray-500">
                                    <th className="px-4 py-3 font-semibold">Nom</th>
                                    <th className="px-4 py-3 font-semibold">Prénom</th>
                                    <th className="px-4 py-3 font-semibold">Type de Consultation</th>
                                    <th className="px-4 py-3 font-semibold">Groupe Sanguin</th>
                                    <th className="px-4 py-3 font-semibold">Médecin Traitant</th>
                                    <th className="px-4 py-3 font-semibold">Âge</th>
                                    <th className="px-4 py-3 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPatientes.map((patiente) => (
                                    <tr key={patiente.id} className="border-t hover:bg-pink-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-900">{patiente.nom}</td>
                                        <td className="px-4 py-3 text-gray-700">{patiente.prenom}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                                                ${patiente.typeConsultation === 'Consultation d\'urgence' ? 'bg-red-100 text-red-800' :
                                                patiente.typeConsultation === 'Consultation spécialisée' ? 'bg-blue-100 text-blue-800' :
                                                patiente.typeConsultation === 'Consultation pédiatrique' ? 'bg-green-100 text-green-800' :
                                                patiente.typeConsultation === 'Consultation de suivi' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'}`}
                                            >
                                                {patiente.typeConsultation}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800">
                                                {patiente.groupeSanguin}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">{patiente.medecin || 'Non assigné'}</td>
                                        <td className="px-4 py-3 text-gray-700">{calculateAge(patiente.dateNaissance)} ans</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center space-x-2">
                                                <a
                                                    href={`/patiente/${patiente.id}/dossier`}
                                                    className="rounded bg-pink-500 px-3 py-1 text-xs text-white hover:bg-pink-600 transition-colors"
                                                >
                                                    Voir dossier
                                                </a>
                                                <a
                                                    href={`/patiente/${patiente.id}/dossier/nouveau`}
                                                    className="rounded bg-pink-300 px-3 py-1 text-xs text-white hover:bg-pink-400 transition-colors"
                                                >
                                                    Créer dossier
                                                </a>
                                                <button
                                                    onClick={() => setShowConfirmDelete({ id: patiente.id, show: true })}
                                                    className="text-red-500 hover:text-red-600 transition-colors"
                                                    title="Supprimer la patiente"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredPatientes.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <p>Aucune patiente trouvée.</p>
                        </div>
                    )}

                    {/* Message de confirmation */}
                    {showConfirmDelete.show && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirmer la suppression</h3>
                                <p className="text-gray-600 mb-6">Êtes-vous sûr de vouloir supprimer cette patiente ? Cette action ne peut pas être annulée.</p>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={cancelDelete}
                                        className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={() => handleDelete(showConfirmDelete.id!)}
                                        className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition-colors"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Liste;
