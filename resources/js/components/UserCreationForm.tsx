import { Tab } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import BasicInfoTab from '../components/BasicInfoTab';
import ConfirmationTab from '../components/ConfirmationTab';
import RoleSpecificTab from '../components/RoleSpecificTab';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const UserCreationForm = ({ roles, canCreateAdmin = false }) => {
    const [currentTab, setCurrentTab] = useState(0);

    const { data, setData, post, processing, errors } = useForm({
        // Données de base pour tous les utilisateurs
        nom: '',
        prenom: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'sage_femme', // Par défaut

        // Données spécifiques au rôle (seront remplies selon le rôle sélectionné)
        matricule: '',
        grade: '',
        specialite: '',
        numero_telephone: '',
        adresse: '',

        // Données spécifiques aux patientes
        age: '',
        profession: '',
        situation_matrimoniale: '',
        groupe_sanguin: '',
        numero_urgence: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Déterminer l'URL endpoint selon le rôle
        let endpoint;
        switch (data.role) {
            case 'admin':
                endpoint = route('admin.users.store');
                break;
            case 'sage_femme':
                endpoint = route('admin.sage-femmes.store');
                break;
            case 'secretaire':
                endpoint = route('admin.secretaires.store');
                break;
            case 'patiente':
                endpoint = route('patientes.store');
                break;
            default:
                endpoint = route('admin.users.store');
        }

        post(endpoint, {
            onSuccess: () => {
                // Redirection ou affichage d'un message de succès
            },
        });
    };

    const tabs = [
        { name: 'Informations de Base', component: BasicInfoTab },
        { name: 'Informations Spécifiques', component: RoleSpecificTab },
        { name: 'Confirmation', component: ConfirmationTab },
    ];

    const nextTab = () => {
        if (currentTab < tabs.length - 1) {
            setCurrentTab(currentTab + 1);
        }
    };

    const prevTab = () => {
        if (currentTab > 0) {
            setCurrentTab(currentTab - 1);
        }
    };

    return (
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-4 shadow">
            <h2 className="mb-6 text-center text-2xl font-bold">
                {data.role === 'patiente' ? 'Créer une patiente' : `Créer un utilisateur (${data.role})`}
            </h2>

            <form onSubmit={handleSubmit}>
                <Tab.Group selectedIndex={currentTab} onChange={setCurrentTab}>
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                className={({ selected }) =>
                                    classNames(
                                        'w-full rounded-lg py-2.5 text-sm leading-5 font-medium',
                                        'ring-opacity-60 ring-white ring-offset-2 ring-offset-blue-400 focus:ring-2 focus:outline-none',
                                        selected ? 'bg-white text-blue-700 shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                                    )
                                }
                            >
                                {tab.name}
                            </Tab>
                        ))}
                    </Tab.List>

                    <Tab.Panels className="mt-6">
                        {tabs.map((tab, index) => (
                            <Tab.Panel key={index} className="rounded-xl bg-white p-3">
                                <tab.component
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    roles={roles.filter((role) => role !== 'admin' || canCreateAdmin)}
                                />
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>

                <div className="mt-6 flex justify-between">
                    {currentTab > 0 && (
                        <button type="button" onClick={prevTab} className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300">
                            Précédent
                        </button>
                    )}

                    {currentTab < tabs.length - 1 ? (
                        <button type="button" onClick={nextTab} className="ml-auto rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                            Suivant
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={processing}
                            className="ml-auto rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        >
                            {processing ? 'Création en cours...' : 'Créer'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UserCreationForm;
