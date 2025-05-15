import Sidebar from '@/components/Sidebar';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Users() {
  return (
    <Sidebar>
      <Head title="Utilisateurs" />
      <div className="flex flex-1 flex-col gap-6 rounded-xl p-6 bg-pink-50">
        <h2 className="text-3xl font-bold text-pink-700">Gestion des Utilisateurs 👥</h2>
        <div className="flex justify-end mb-4">
          <Button className="bg-pink-400 text-white hover:bg-pink-500">
            + Ajouter un utilisateur
          </Button>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          {/* Table des utilisateurs ici */}
          <table className="w-full">
            <thead>
              <tr className="text-pink-700">
                <th className="py-2">Nom</th>
                <th className="py-2">Prénom</th>
                <th className="py-2">Email</th>
                <th className="py-2">Rôle</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Exemple de données */}
              <tr>
                <td className="py-2">Doe</td>
                <td className="py-2">Jane</td>
                <td className="py-2">jane@example.com</td>
                <td className="py-2">Admin</td>
                <td className="py-2">
                  <Button className="bg-pink-200 text-pink-800 mr-2">Modifier</Button>
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
