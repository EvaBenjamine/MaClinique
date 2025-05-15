import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';

const AjoutPatient: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    numero: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Données soumises:', formData);
    setFormData({
      nom: '',
      prenom: '',
      dateNaissance: '',
      numero: '',
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar children={undefined} />

      {/* Contenu principal */}
      <div className="flex-1 p-6">
        <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-xl mt-12">
          <h2 className="text-3xl font-semibold text-center text-pink-600 mb-6">Ajouter une Patiente</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
                Prénom
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700 mb-2">
                Date de Naissance
              </label>
              <input
                type="date"
                id="dateNaissance"
                name="dateNaissance"
                value={formData.dateNaissance}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de téléphone
              </label>
              <input
                type="text"
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 transition duration-300 ease-in-out"
            >
              Ajouter la Patiente
            </button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default AjoutPatient;
