import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Types des consultations
type Consultation = {
  id: number;
  nom: string;
  date: string;
  poids: string;
  tension: string;
  commentaire: string;
};

// Données fictives
const consultations: Consultation[] = [
  {
    id: 1,
    nom: "Fatou Diallo",
    date: "2025-05-01",
    poids: "68 kg",
    tension: "120/80",
    commentaire: "Bonne évolution",
  },
  {
    id: 2,
    nom: "Awa Traoré",
    date: "2025-05-15",
    poids: "70 kg",
    tension: "125/85",
    commentaire: "Surveiller la tension",
  },
  {
    id: 3,
    nom: "Mariam Koné",
    date: "2025-06-03",
    poids: "72 kg",
    tension: "130/85",
    commentaire: "Tout va bien",
  },
];

// Composant principal
const PrenatalConsultations: React.FC = () => {
  return (
    <div className="min-h-screen bg-pink-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-pink-700 text-center mb-8">
          Consultations Prénatales
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-pink-200 text-pink-900">
                <th className="p-3 text-left">Nom</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Poids</th>
                <th className="p-3 text-left">Tension</th>
                <th className="p-3 text-left">Commentaire</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((c) => (
                <tr key={c.id} className="hover:bg-pink-50 transition">
                  <td className="p-3">{c.nom}</td>
                  <td className="p-3">{c.date}</td>
                  <td className="p-3">{c.poids}</td>
                  <td className="p-3">{c.tension}</td>
                  <td className="p-3 italic text-gray-700">{c.commentaire}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Point d'entrée
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PrenatalConsultations />
  </React.StrictMode>
);
