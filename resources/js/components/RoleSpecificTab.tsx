// RoleSpecificTab.jsx - Deuxième étape: Informations spécifiques au rôle
import InputError from '../components/InputError';

const RoleSpecificTab = ({ data, setData, errors }) => {
    // Champs communs à plusieurs rôles
    const commonFields = (
        <>
            <div>
                <label htmlFor="numero_telephone" className="block text-sm font-medium text-gray-700">
                    Numéro de téléphone
                </label>
                <input
                    type="text"
                    id="numero_telephone"
                    name="numero_telephone"
                    value={data.numero_telephone}
                    onChange={(e) => setData('numero_telephone', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.numero_telephone && <InputError message={errors.numero_telephone} className="mt-2" />}
            </div>

            <div>
                <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
                    Adresse
                </label>
                <textarea
                    id="adresse"
                    name="adresse"
                    value={data.adresse}
                    onChange={(e) => setData('adresse', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.adresse && <InputError message={errors.adresse} className="mt-2" />}
            </div>
        </>
    );

    // Champs spécifiques aux sages-femmes et secrétaires
    const staffFields = (
        <>
            <div>
                <label htmlFor="matricule" className="block text-sm font-medium text-gray-700">
                    Matricule
                </label>
                <input
                    type="text"
                    id="matricule"
                    name="matricule"
                    value={data.matricule}
                    onChange={(e) => setData('matricule', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.matricule && <InputError message={errors.matricule} className="mt-2" />}
            </div>

            <div>
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                    Grade
                </label>
                <input
                    type="text"
                    id="grade"
                    name="grade"
                    value={data.grade}
                    onChange={(e) => setData('grade', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.grade && <InputError message={errors.grade} className="mt-2" />}
            </div>
        </>
    );

    // Champs spécifiques aux sages-femmes
    const sageFemmeFields = (
        <div>
            <label htmlFor="specialite" className="block text-sm font-medium text-gray-700">
                Spécialité
            </label>
            <input
                type="text"
                id="specialite"
                name="specialite"
                value={data.specialite}
                onChange={(e) => setData('specialite', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {errors.specialite && <InputError message={errors.specialite} className="mt-2" />}
        </div>
    );

    // Champs spécifiques aux patientes
    const patienteFields = (
        <>
            <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                    Âge
                </label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={data.age}
                    onChange={(e) => setData('age', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.age && <InputError message={errors.age} className="mt-2" />}
            </div>

            <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
                    Profession
                </label>
                <input
                    type="text"
                    id="profession"
                    name="profession"
                    value={data.profession}
                    onChange={(e) => setData('profession', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.profession && <InputError message={errors.profession} className="mt-2" />}
            </div>

            <div>
                <label htmlFor="situation_matrimoniale" className="block text-sm font-medium text-gray-700">
                    Situation matrimoniale
                </label>
                <select
                    id="situation_matrimoniale"
                    name="situation_matrimoniale"
                    value={data.situation_matrimoniale}
                    onChange={(e) => setData('situation_matrimoniale', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
                >
                    <option value="">Sélectionner</option>
                    <option value="célibataire">Célibataire</option>
                    <option value="mariée">Mariée</option>
                    <option value="divorcée">Divorcée</option>
                    <option value="veuve">Veuve</option>
                </select>
                {errors.situation_matrimoniale && <InputError message={errors.situation_matrimoniale} className="mt-2" />}
            </div>

            <div>
                <label htmlFor="groupe_sanguin" className="block text-sm font-medium text-gray-700">
                    Groupe sanguin
                </label>
                <select
                    id="groupe_sanguin"
                    name="groupe_sanguin"
                    value={data.groupe_sanguin}
                    onChange={(e) => setData('groupe_sanguin', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
                >
                    <option value="">Sélectionner</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
                {errors.groupe_sanguin && <InputError message={errors.groupe_sanguin} className="mt-2" />}
            </div>

            <div>
                <label htmlFor="numero_urgence" className="block text-sm font-medium text-gray-700">
                    Numéro d'urgence
                </label>
                <input
                    type="text"
                    id="numero_urgence"
                    name="numero_urgence"
                    value={data.numero_urgence}
                    onChange={(e) => setData('numero_urgence', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.numero_urgence && <InputError message={errors.numero_urgence} className="mt-2" />}
            </div>
        </>
    );

    return (
        <div className="space-y-4">
            {data.role === 'patiente' ? (
                <>
                    {patienteFields}
                    {commonFields}
                </>
            ) : data.role === 'sage_femme' ? (
                <>
                    {staffFields}
                    {sageFemmeFields}
                    {commonFields}
                </>
            ) : data.role === 'secretaire' ? (
                <>
                    {staffFields}
                    {commonFields}
                </>
            ) : (
                // Admin
                <>{commonFields}</>
            )}
        </div>
    );
};

export default RoleSpecificTab;
