// UsersIndex.jsx - Page principale pour la gestion des utilisateurs
import Sidebar from '@/components/Sidebar';
import UserCreationForm from '@/components/UserCreationForm';
import { PlusIcon, UserIcon } from '@heroicons/react/outline';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const UsersIndex = () => {
    const { auth, admins, sageFemmes, secretaires } = usePage().props;
    const [activeTab, setActiveTab] = useState('tous');
    const [showCreationForm, setShowCreationForm] = useState(false);
    const [creationType, setCreationType] = useState(null);

    const tabs = [
        { id: 'tous', name: 'Tous les utilisateurs' },
        { id: 'admins', name: 'Administrateurs' },
        { id: 'sage_femmes', name: 'Sages-femmes' },
        { id: 'secretaires', name: 'Secrétaires' },
    ];

    const startCreation = (type) => {
        setCreationType(type);
        setShowCreationForm(true);
        window.scrollTo(0, 0);
    };

    const getUsersByTab = () => {
        switch (activeTab) {
            case 'admins':
                return admins;
            case 'sage_femmes':
                return sageFemmes;
            case 'secretaires':
                return secretaires;
            default:
                return [
                    ...admins.map((admin) => ({ ...admin, type: 'admin' })),
                    ...sageFemmes.map((sf) => ({ ...sf, type: 'sage_femme' })),
                    ...secretaires.map((sec) => ({ ...sec, type: 'secretaire' })),
                ];
        }
    };

    const getAvailableRoles = () => {
        if (auth.user.role === 'admin') {
            return creationType ? [creationType] : ['admin', 'sage_femme', 'secretaire'];
        } else {
            return ['patiente'];
        }
    };

    return (
        <Sidebar>
            <Head title="Gestion des utilisateurs" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {showCreationForm ? (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="border-b border-gray-200 bg-white p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-800">Création d'un utilisateur</h2>
                                    <button
                                        onClick={() => setShowCreationForm(false)}
                                        className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
                                    >
                                        Annuler
                                    </button>
                                </div>

                                <UserCreationForm roles={getAvailableRoles()} canCreateAdmin={auth.user.role === 'admin'} />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className="border-b border-gray-200 bg-white p-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-semibold text-gray-800">Gestion des utilisateurs</h2>

                                        {auth.user.role === 'admin' ? (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => startCreation('admin')}
                                                    className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                                >
                                                    <PlusIcon className="mr-1 h-4 w-4" />
                                                    Admin
                                                </button>
                                                <button
                                                    onClick={() => startCreation('sage_femme')}
                                                    className="inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                                                >
                                                    <PlusIcon className="mr-1 h-4 w-4" />
                                                    Sage-femme
                                                </button>
                                                <button
                                                    onClick={() => startCreation('secretaire')}
                                                    className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                                >
                                                    <PlusIcon className="mr-1 h-4 w-4" />
                                                    Secrétaire
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div>
                                    <nav className="flex border-b border-gray-200">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`px-4 py-3 text-sm font-medium ${
                                                    activeTab === tab.id
                                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                                        : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                                }`}
                                            >
                                                {tab.name}
                                            </button>
                                        ))}
                                    </nav>

                                    <div className="p-6">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                        Nom et Prénom
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                        Email
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                        Rôle
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {getUsersByTab().map((user) => (
                                                    <tr key={user.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="h-10 w-10 flex-shrink-0">
                                                                    <div
                                                                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                                                            user.type === 'admin'
                                                                                ? 'bg-blue-100 text-blue-500'
                                                                                : user.type === 'sage_femme'
                                                                                  ? 'bg-purple-100 text-purple-500'
                                                                                  : user.type === 'secretaire'
                                                                                    ? 'bg-green-100 text-green-500'
                                                                                    : 'bg-pink-100 text-pink-500'
                                                                        }`}
                                                                    >
                                                                        <UserIcon className="h-6 w-6" />
                                                                    </div>
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {user.nom} {user.prenom}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{user.email}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span
                                                                className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                                                                    user.type === 'admin'
                                                                        ? 'bg-blue-100 text-blue-800'
                                                                        : user.type === 'sage_femme'
                                                                          ? 'bg-purple-100 text-purple-800'
                                                                          : user.type === 'secretaire'
                                                                            ? 'bg-green-100 text-green-800'
                                                                            : 'bg-pink-100 text-pink-800'
                                                                }`}
                                                            >
                                                                {user.type === 'admin'
                                                                    ? 'Administrateur'
                                                                    : user.type === 'sage_femme'
                                                                      ? 'Sage-femme'
                                                                      : user.type === 'secretaire'
                                                                        ? 'Secrétaire'
                                                                        : 'Patiente'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                            <Link href={`/users/${user.id}`} className="mr-3 text-blue-600 hover:text-blue-900">
                                                                Voir
                                                            </Link>
                                                            {auth.user.role === 'admin' && (
                                                                <Link href={`/users/${user.id}/edit`} className="text-green-600 hover:text-green-900">
                                                                    Modifier
                                                                </Link>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Sidebar>
    );
};

export default UsersIndex;
