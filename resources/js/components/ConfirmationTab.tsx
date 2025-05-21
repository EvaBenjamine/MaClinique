// ConfirmationTab.jsx - Troisième étape: Confirmation des informations

const ConfirmationTab = ({ data }) => {
    // Fonction pour formater les données en fonction du rôle
    const renderRoleSpecificData = () => {
        switch (data.role) {
            case 'admin':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Numéro de téléphone:</div>
                            <div>{data.numero_telephone || '-'}</div>
                            <div className="font-medium">Adresse:</div>
                            <div>{data.adresse || '-'}</div>
                        </div>
                    </>
                );
            case 'sage_femme':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Matricule:</div>
                            <div>{data.matricule || '-'}</div>
                            <div className="font-medium">Grade:</div>
                            <div>{data.grade || '-'}</div>
                            <div className="font-medium">Spécialité:</div>
                            <div>{data.specialite || '-'}</div>
                            <div className="font-medium">Numéro de téléphone:</div>
                            <div>{data.numero_telephone || '-'}</div>
                            <div className="font-medium">Adresse:</div>
                            <div>{data.adresse || '-'}</div>
                        </div>
                    </>
                );
            case 'secretaire':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Matricule:</div>
                            <div>{data.matricule || '-'}</div>
                            <div className="font-medium">Grade:</div>
                            <div>{data.grade || '-'}</div>
                            <div className="font-medium">Numéro de téléphone:</div>
                            <div>{data.numero_telephone || '-'}</div>
                            <div className="font-medium">Adresse:</div>
                            <div>{data.adresse || '-'}</div>
                        </div>
                    </>
                );
            case 'patiente':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Âge:</div>
                            <div>{data.age || '-'}</div>
                            <div className="font-medium">Profession:</div>
                            <div>{data.profession || '-'}</div>
                            <div className="font-medium">Situation matrimoniale:</div>
                            <div>{data.situation_matrimoniale || '-'}</div>
                            <div className="font-medium">Groupe sanguin:</div>
                            <div>{data.groupe_sanguin || '-'}</div>
                            <div className="font-medium">Numéro de téléphone:</div>
                            <div>{data.numero_telephone || '-'}</div>
                            <div className="font-medium">Numéro d'urgence:</div>
                            <div>{data.numero_urgence || '-'}</div>
                            <div className="font-medium">Adresse:</div>
                            <div>{data.adresse || '-'}</div>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    const roleLabel = {
        admin: 'Administrateur',
        sage_femme: 'Sage-femme',
        secretaire: 'Secrétaire',
        patiente: 'Patiente',
    };

    return (
        <div className="space-y-6">
            <div className="rounded-lg bg-blue-50 p-4">
                <h3 className="mb-2 text-lg font-medium text-blue-800">Veuillez vérifier les informations avant de créer</h3>
                <p className="text-sm text-blue-700">
                    Assurez-vous que toutes les informations sont correctes. Vous pouvez revenir en arrière pour effectuer des modifications si
                    nécessaire.
                </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h4 className="mb-4 text-lg font-semibold">Informations de base</h4>
                <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Rôle:</div>
                    <div>{roleLabel[data.role] || data.role}</div>
                    <div className="font-medium">Nom:</div>
                    <div>{data.nom}</div>
                    <div className="font-medium">Prénom:</div>
                    <div>{data.prenom}</div>
                    <div className="font-medium">Email:</div>
                    <div>{data.email}</div>
                </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h4 className="mb-4 text-lg font-semibold">Informations spécifiques</h4>
                {renderRoleSpecificData()}
            </div>
        </div>
    );
};

export default ConfirmationTab;
