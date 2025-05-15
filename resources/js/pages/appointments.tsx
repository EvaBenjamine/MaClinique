import Sidebar from '@/components/Sidebar';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Appointments() {
  return (
    <Sidebar>
      <Head title="Rendez-vous" />
      <div className="flex flex-1 flex-col gap-6 rounded-xl p-6 bg-pink-50">
        <h2 className="text-3xl font-bold text-pink-700">Gestion des Rendez-vous 📅</h2>
        <div className="flex justify-end mb-4">
          <Button className="bg-pink-400 text-white hover:bg-pink-500">
            + Nouveau rendez-vous
          </Button>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          {/* Table des rendez-vous ici */}
          <table className="w-full">
            <thead>
              <tr className="text-pink-700">
                <th className="py-2">Patiente</th>
                <th className="py-2">Date</th>
                <th className="py-2">Heure</th>
                <th className="py-2">Type</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Exemple de données */}
              <tr>
                <td className="py-2">Marie Dupont</td>
                <td className="py-2">2025-05-20</td>
                <td className="py-2">10:00</td>
                <td className="py-2">Prénatale</td>
                <td className="py-2">
                  <Button className="bg-pink-200 text-pink-800 mr-2">Voir</Button>
                  <Button className="bg-pink-100 text-pink-800">Annuler</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Sidebar>
  );
}
