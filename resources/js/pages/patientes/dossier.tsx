import DossierPatientRefactored from '@/components/dossier/dossier-patient-refactored';
import Sidebar from '@/components/Sidebar';
import { Head, usePage } from '@inertiajs/react';

// Types pour les props de la page
type PageProps = {
    patiente: {
        id: number;
        nom: string;
        prenom: string;
        age: number;
        numero_telephone: string;
        email: string;
        profession?: string;
        situation_matrimoniale?: string;
        groupe_sanguin?: string;
        numero_conjoint?: string;
        quartier?: string;
    };
    dossier: {
        id: number;
        patiente_id: number;
        sage_femme_id: number;
        date_derniere_regle: string | null;
        date_accouchement_prevue: string | null;
        grossesse_multiple: boolean;
        nombre_foetus: number | null;
        grossesse_a_risque: boolean;
        facteurs_risque: string | null;
        gestite: number;
        parite: number;
        fausses_couches: number;
        ev: number;
        morts_nes: number;
        decedes: number;
        antecedents_medicaux: string | null;
        antecedents_chirurgicaux: string | null;
        antecedents_familiaux: string | null;
        antecedents_gynecologiques: string | null;
        antecedents_obstetricaux: string | null;
        allergies: string | null;
        traitements_en_cours: string | null;
        maladies_chroniques: string | null;
        tabac: boolean;
        alcool: boolean;
        activite_physique: string | null;
        regime_alimentaire: string | null;
        statut_dossier: string;
        date_derniere_consultation: string | null;
        notes_importantes: string | null;
        recommandations_particulieres: string | null;
    };
    sage_femme: {
        id: number;
        nom: string;
        prenom: string;
    };
    consultations: Array<unknown>;
    examens: Array<unknown>;
    prescriptions: Array<unknown>;
    documents: Array<unknown>;
    accouchements: Array<unknown>;
    trimestre: string;
    age_grossesse_semaines: number;
    sages_femmes: Array<{
        id: number;
        nom: string;
        prenom: string;
    }>;
};

export default function DossierPage() {
    const {
        patiente,
        consultations,
        examens,
        prescriptions,
        documents,
        accouchements,
        dossier,
        sage_femme,
        trimestre,
        age_grossesse_semaines,
        sages_femmes,
    } = usePage<PageProps>().props;

    // Enrichir le dossier avec les données calculées et les relations
    const enrichedDossier = {
        ...dossier,
        age_grossesse_semaines,
        trimestre,
        sage_femme,
        patiente,
        consultations,
        examens,
        prescriptions,
        documents,
        accouchements,
    };

    return (
        <Sidebar>
            <Head title={`Dossier médical - ${patiente.prenom} ${patiente.nom}`} />
            <div className="py-6">
                <div className="mx-auto max-w-7xl">
                    <DossierPatientRefactored dossier={enrichedDossier} sages_femmes={sages_femmes} />
                </div>
            </div>
        </Sidebar>
    );
}
