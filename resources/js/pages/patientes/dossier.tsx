import DossierPatientRefactored from '@/components/dossier/dossier-patient-refactored';
import Sidebar from '@/components/Sidebar';
import { Head, usePage } from '@inertiajs/react';

export default function Page() {
    const { patiente, consultations, examens, prescriptions, documents, dossier, sage_femme, trimestre, age_grossesse_semaines, sages_femmes } =
        usePage().props;

    // Add a type assertion for dossier
    const typedDossier = dossier as {
        id: number;
        patiente_id: number;
        sage_femme_id: number;
        date_derniere_regle: string;
        date_accouchement_prevue: string;
        grossesse_multiple: boolean;
        nombre_foetus: number;
        grossesse_a_risque: boolean;
        facteurs_risque: string;
        nombre_grossesses_anterieures: number;
        nombre_accouchements: number;
        nombre_avortements: number;
        nombre_enfants_vivants: number;
        antecedents_medicaux: string;
        antecedents_chirurgicaux: string;
        antecedents_familiaux: string;
        antecedents_gynecologiques: string;
        antecedents_obstetricaux: string;
        allergies: string;
        traitements_en_cours: string;
        maladies_chroniques: string;
        tabac: boolean;
        alcool: boolean;
        activite_physique: string;
        regime_alimentaire: string;
        statut_dossier: string;
        date_derniere_consultation: string;
        notes_importantes: string;
        recommandations_particulieres: string;
    };

    const dossierP = {
        id: typedDossier.id,
        patiente_id: typedDossier.patiente_id,
        sage_femme_id: typedDossier.sage_femme_id,
        date_derniere_regle: typedDossier.date_derniere_regle,
        date_accouchement_prevue: typedDossier.date_accouchement_prevue,
        grossesse_multiple: typedDossier.grossesse_multiple,
        nombre_foetus: typedDossier.nombre_foetus,
        grossesse_a_risque: typedDossier.grossesse_a_risque,
        facteurs_risque: typedDossier.facteurs_risque,
        nombre_grossesses_anterieures: typedDossier.nombre_grossesses_anterieures,
        nombre_accouchements: typedDossier.nombre_accouchements,
        nombre_avortements: typedDossier.nombre_avortements,
        nombre_enfants_vivants: typedDossier.nombre_enfants_vivants,
        antecedents_medicaux: typedDossier.antecedents_medicaux,
        antecedents_chirurgicaux: typedDossier.antecedents_chirurgicaux,
        antecedents_familiaux: typedDossier.antecedents_familiaux,
        antecedents_gynecologiques: typedDossier.antecedents_gynecologiques,
        antecedents_obstetricaux: typedDossier.antecedents_obstetricaux,
        allergies: typedDossier.allergies,
        traitements_en_cours: typedDossier.traitements_en_cours,
        maladies_chroniques: typedDossier.maladies_chroniques,
        tabac: typedDossier.tabac,
        alcool: typedDossier.alcool,
        activite_physique: typedDossier.activite_physique,
        regime_alimentaire: typedDossier.regime_alimentaire,
        statut_dossier: typedDossier.statut_dossier,
        date_derniere_consultation: typedDossier.date_derniere_consultation,
        notes_importantes: typedDossier.notes_importantes,
        recommandations_particulieres: typedDossier.recommandations_particulieres,
        age_grossesse_semaines: age_grossesse_semaines,
        trimestre: trimestre,
        sage_femme: sage_femme as { nom: string; prenom: string } | undefined,
        patiente: patiente as { nom: string; prenom: string; age: number; numero_telephone: string; email: string } | undefined,
        consultations: consultations,
        examens: examens,
        prescriptions: prescriptions,
        documents: documents,
    };

    return (
        <Sidebar>
            <Head title="Dossier médical" />
            <div className="py-6">
                <div className="mx-auto max-w-7xl">
                    <DossierPatientRefactored dossier={dossierP} sages_femmes={sages_femmes} />
                </div>
            </div>
        </Sidebar>
    );
}
