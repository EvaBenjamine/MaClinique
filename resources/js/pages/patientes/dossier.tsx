import DossierPatientTabs from '@/components/dossier-medical/dossier-patient-tabs';
import Sidebar from '@/components/Sidebar';
import { Head, usePage } from '@inertiajs/react';

export default function DossierPatiente() {
    const { auth, patiente, consultations, examens, prescriptions, documents, dossier, sage_femme, trimestre, age_grossesse_semaines } =
        usePage().props;

    const dossierP = {
        id: dossier.id,
        patiente_id: dossier.patiente_id,
        sage_femme_id: dossier.sage_femme_id,
        date_derniere_regle: dossier.date_derniere_regle,
        date_accouchement_prevue: dossier.date_accouchement_prevue,
        grossesse_multiple: dossier.grossesse_multiple,
        nombre_foetus: dossier.nombre_foetus,
        grossesse_a_risque: dossier.grossesse_a_risque,
        facteurs_risque: dossier.facteurs_risque,
        nombre_grossesses_anterieures: dossier.nombre_grossesses_anterieures,
        nombre_accouchements: dossier.nombre_accouchements,
        nombre_avortements: dossier.nombre_avortements,
        nombre_enfants_vivants: dossier.nombre_enfants_vivants,
        antecedents_medicaux: dossier.antecedents_medicaux,
        antecedents_chirurgicaux: dossier.antecedents_chirurgicaux,
        antecedents_familiaux: dossier.antecedents_familiaux,
        antecedents_gynecologiques: dossier.antecedents_gynecologiques,
        antecedents_obstetricaux: dossier.antecedents_obstetricaux,
        allergies: dossier.allergies,
        traitements_en_cours: dossier.traitements_en_cours,
        maladies_chroniques: dossier.maladies_chroniques,
        tabac: dossier.tabac,
        alcool: dossier.alcool,
        activite_physique: dossier.activite_physique,
        regime_alimentaire: dossier.regime_alimentaire,
        statut_dossier: dossier.statut_dossier,
        date_derniere_consultation: dossier.date_derniere_consultation,
        notes_importantes: dossier.notes_importantes,
        recommandations_particulieres: dossier.recommandations_particulieres,
        age_grossesse_semaines: age_grossesse_semaines,
        trimestre: trimestre,
        sage_femme: sage_femme,
        patiente: patiente,
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
                    <DossierPatientTabs dossier={dossierP} />
                </div>
            </div>
        </Sidebar>
    );
}
