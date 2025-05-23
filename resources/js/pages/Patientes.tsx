import React from 'react';
import { Link } from '@inertiajs/react';


type Consultation = {
  id: number;
  date: string;
};

type Patiente = {
  id: number;
  nom: string;
  telephone: string;
  prenatales: Consultation[];
  postnatales: Consultation[];
};

type Props = {
  patientes: Patiente[];
};

export default function Patientes({ patientes }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des Patientes</h1>

      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Nom</th>
            <th className="p-2 border">Téléphone</th>
            <th className="p-2 border">Consult. Prénatales</th>
            <th className="p-2 border">Consult. Postnatales</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patientes.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.nom}</td>
              <td className="border p-2">{p.telephone}</td>
              <td className="border p-2">{p.prenatales.length} / 8</td>
              <td className="border p-2">{p.postnatales.length} / 7</td>
              <td className="border p-2">
                <Link
                  href={`/dossier/${p.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Voir dossier
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
