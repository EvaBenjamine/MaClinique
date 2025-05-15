import Sidebar from '@/components/Sidebar';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Patients() {
  return (
    <Sidebar>
      <Head title="Patientes" />
      <div className="flex flex-1 flex-col gap-6 rounded-xl p-6 bg-pink-50">
        <h2 className="text-3xl font-bold text-pink-700">Gestion des Patientes 🧑‍🍼</h2>
        <div className="flex justify-end mb-4">
          <Button className="bg-pink-400 text-white hover:bg-pink-500">
            + Ajouter une patiente
          </Button>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          {/* Table des patientes ici */}
          <table className="w-full">
            <thead>
              <tr className="text-pink-700">
                <th className="py-2">Nom</th>
                <th className="py-2">Prénom</th>
                <th className="py-2">Téléphone</th>
                <th className="py-2">Adresse</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Exemple de données */}
              <tr>
                <td className="py-2">Dupont</td>
                <td className="py-2">Marie</td>
                <td className="py-2">0601020304</td>
                <td className="py-2">Paris</td>
                <td className="py-2">
                  <Button className="bg-pink-200 text-pink-800 mr-2">Dossier</Button>
                  <Button className="bg-pink-100 text-pink-800">Supprimer</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Sidebar>
  );
}
