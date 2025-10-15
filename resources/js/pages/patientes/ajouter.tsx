import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';

const AjoutPatient: React.FC = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        dateNaissance: '',
        numero: '',
        numeroConjoint: '',
        quartier: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            numeroConjoint: '',
            quartier: '',
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar children={undefined} />

            {/* Contenu principal */}
            <div className="flex-1 p-6">
                <div className="mx-auto mt-12 max-w-lg rounded-lg bg-white p-8 shadow-xl">
                    <h2 className="mb-6 text-center text-3xl font-semibold text-pink-600">Ajouter une Patiente</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="nom" className="mb-2 block text-sm font-medium text-gray-700">
                                Nom
                            </label>
                            <input
                                type="text"
                                id="nom"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="prenom" className="mb-2 block text-sm font-medium text-gray-700">
                                Prénom
                            </label>
                            <input
                                type="text"
                                id="prenom"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="dateNaissance" className="mb-2 block text-sm font-medium text-gray-700">
                                Date de Naissance
                            </label>
                            <input
                                type="date"
                                id="dateNaissance"
                                name="dateNaissance"
                                value={formData.dateNaissance}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="numero" className="mb-2 block text-sm font-medium text-gray-700">
                                Numéro de téléphone
                            </label>
                            <input
                                type="text"
                                id="numero"
                                name="numero"
                                value={formData.numero}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="numeroConjoint" className="mb-2 block text-sm font-medium text-gray-700">
                                Numéro du conjoint
                            </label>
                            <input
                                type="text"
                                id="numeroConjoint"
                                name="numeroConjoint"
                                value={formData.numeroConjoint}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="quartier" className="mb-2 block text-sm font-medium text-gray-700">
                                Quartier
                            </label>
                            <textarea
                                id="quartier"
                                name="quartier"
                                value={formData.quartier}
                                onChange={handleChange}
                                rows={3}
                                className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-md bg-pink-600 py-3 font-semibold text-white transition duration-300 ease-in-out hover:bg-pink-700"
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
