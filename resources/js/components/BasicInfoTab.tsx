// Composants pour les étapes du formulaire

// BasicInfoTab.jsx - Première étape: Informations de base de l'utilisateur
import InputError from '../components/InputError';

const BasicInfoTab = ({ data, setData, errors, roles }) => {
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Rôle
                </label>
                <select
                    id="role"
                    name="role"
                    value={data.role}
                    onChange={(e) => setData('role', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
                >
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role === 'sage_femme'
                                ? 'Sage-femme'
                                : role === 'secretaire'
                                  ? 'Secrétaire'
                                  : role === 'patiente'
                                    ? 'Patiente'
                                    : 'Administrateur'}
                        </option>
                    ))}
                </select>
                {errors.role && <InputError message={errors.role} className="mt-2" />}
            </div>

            <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                    Nom
                </label>
                <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={data.nom}
                    onChange={(e) => setData('nom', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.nom && <InputError message={errors.nom} className="mt-2" />}
            </div>

            <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                    Prénom
                </label>
                <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={data.prenom}
                    onChange={(e) => setData('prenom', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.prenom && <InputError message={errors.prenom} className="mt-2" />}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.email && <InputError message={errors.email} className="mt-2" />}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mot de passe
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.password && <InputError message={errors.password} className="mt-2" />}
            </div>

            <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                    Confirmer le mot de passe
                </label>
                <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.password_confirmation && <InputError message={errors.password_confirmation} className="mt-2" />}
            </div>
        </div>
    );
};

export default BasicInfoTab;
