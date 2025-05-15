import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { TrashIcon } from '@heroicons/react/24/outline';

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

  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState<{ id: number | null; show: boolean }>({ id: null, show: false });

  const handleDownload = () => {
    const csvContent = [
      ['ID', 'Nom', 'Prénom', 'Date de Naissance', 'Numéro', 'Date d\'Enregistrement', 'Dossier Créé'],
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
      patiente.numero.includes(searchQuery)
  );

  return (
    <div className="h-screen bg-pink-50 flex">
      <Sidebar children={undefined} />
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Barre d'infos simplifiée */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-pink-600">Consultations</h1>
            <p className="text-sm text-gray-500">Dernière mise à jour : {new Date().toLocaleDateString()}</p>
          </div>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Rechercher une patiente..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <span className="absolute left-3 top-2.5">🔍</span>
          </div>
        </div>
        {/* Tableau historique */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-pink-600">Historique des Consultations</h2>
            <div className="flex space-x-2">
              <a
                href="/patiente/nouveau"
                className="px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition"
              >
                Ajouter une Patiente
              </a>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-pink-300 text-white font-semibold rounded-lg hover:bg-pink-400 transition"
              >
                Télécharger Liste
              </button>
            </div>
          </div>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Date D'Enregistrement</th>
                <th className="py-2 px-4">Nom</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatientes.map((patiente) => (
                <tr key={patiente.id} className="border-t hover:bg-pink-50">
                  <td className="py-2 px-4">{patiente.numero.substring(0, 6)}</td>
                  <td className="py-2 px-4">{patiente.dateEnregistrement}</td>
                  <td className="py-2 px-4">{patiente.prenom} {patiente.nom} — {patiente.medecin}</td>
                  <td className="py-2 px-4 space-x-2 flex items-center">
                    <a
                      href={`/patiente/${patiente.id}/dossier`}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded"
                    >
                      Voir dossier
                    </a>
                    <a
                      href={`/patiente/${patiente.id}/dossier/nouveau`}
                      className="bg-pink-300 hover:bg-pink-400 text-white px-3 py-1 rounded"
                    >
                      Créer dossier
                    </a>
                    <button
                      onClick={() => setShowConfirmDelete({ id: patiente.id, show: true })}
                      className="ml-2 text-red-500 hover:text-red-600"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Message de confirmation */}
          {showConfirmDelete.show && (
            <div className="p-4 mt-4 bg-red-100 text-red-800 rounded-lg">
              <p className="font-semibold">Êtes-vous sûr de vouloir supprimer cette patiente ?</p>
              <div className="flex justify-center space-x-4 mt-2">
                <button
                  onClick={() => handleDelete(showConfirmDelete.id!)}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                >
                  Oui, supprimer
                </button>
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                >
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
