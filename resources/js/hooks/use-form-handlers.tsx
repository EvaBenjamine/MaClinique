'use client';

import { useDossierPatient } from '@/contexts/dossier-patient-context';
import { router, useForm } from '@inertiajs/react';

// Types pour les formulaires Inertia.js
interface FormData {
    [key: string]: string | number | File | boolean | null | undefined;
}

interface InertiaFormData {
    data: FormData;
    setData: (key: string, value: string | number | File | null) => void;
    errors: Record<string, string>;
    processing: boolean;
    reset: () => void;
    post: (
        url: string,
        options?: {
            onSuccess?: () => void;
            onError?: (errors: Record<string, string>) => void;
        },
    ) => void;
}

function useRealForm(initialData: FormData) {
    const form = useForm(initialData);

    return form;
}

export function useFormHandlers() {
    const { setIsDialogOpen, refreshData } = useDossierPatient();

    const handleSubmit = (
        form: InertiaFormData,
        routeName: string,
        options?: {
            onSuccess?: () => void;
            onError?: (errors: Record<string, string>) => void;
        },
    ) => {
        router.post(routeName, form.data, {
            onSuccess: () => {
                if (options?.onSuccess) {
                    options.onSuccess();
                } else {
                    setIsDialogOpen(false);
                    form.reset();
                    refreshData();
                }
            },
            onError: (errors: Record<string, string>) => {
                if (options?.onError) {
                    options.onError(errors);
                } else {
                    console.error('Erreurs de validation:', errors);
                }
            },
        });
    };

    const handleDelete = (type: string, id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
            const routeName = `${type}s.destroy`;

            router.delete(route(routeName, { id }), {
                onSuccess: refreshData,
            });
        }
    };

    return { handleSubmit, handleDelete };
}

export function useConsultationForm() {
    const { dossier } = useDossierPatient();

    const initialData = {
        dossier_patient_id: dossier.id,
        // Champs communs (14)
        date: '',
        type_consultation: '',
        poids: '',
        tension_arterielle_systolique: '',
        tension_arterielle_diastolique: '',
        hauteur_uterine: '',
        position_foetus: '',
        rythme_cardiaque_foetal: '',
        observations: '',
        prescriptions: '',
        examens_prescrits: '',
        recommandations: '',

        // Champs CPN (10)
        age_gestationnel_semaines: '',
        plaintes: '',
        dents_gencives: '',
        varices: '',
        maf: '',
        vulve: '',
        examen_speculum: '',
        toucher_vaginal: '',
        etat_bassin: '',
        prochain_rdv: '',

        // Champs CPP (17)
        jour_postnatal: '',
        montee_lait: '',
        presence_gercures: false,
        engorgement_mamaire: false,
        involution_uterine: '',
        perinee: '',
        lochies: '',
        mollets: '',
        toucher_vaginal_cpp: '',
        contraception: '',
        poids_nouveau_ne: '',
        taille_nouveau_ne: '',
        perimetre_cranien_nouveau_ne: '',
        perimetre_thoracique_nouveau_ne: '',
        temperature_nouveau_ne: '',
        cordon: '',
        reflexes: '',
    };

    return useRealForm(initialData);
}

export function useAccouchementForm() {
    const { dossier } = useDossierPatient();

    const initialData = {
        dossier_patient_id: dossier.id,
        date_accouchement: '',
        heure_accouchement: '',
        age_gestationnel: '',
        travail: '',
        presentation: '',
        mode_accouchement: '',
        episiotomie: false,
        dechirure: false,
        delivrance: '',
        mode_delivrance: '',
        poids_placenta: '',
        peau_a_peau: false,
        poids_bebe: '',
        taille_bebe: '',
        perimetre_cranien_bebe: '',
        perimetre_thoracique_bebe: '',
        sexe: '',
        mise_au_sein: false,
        vitamine_k: false,
        complications: '',
        observations: '',
    };

    return useRealForm(initialData);
}

export function useExamenForm() {
    const { dossier } = useDossierPatient();

    const initialData = {
        dossier_patient_id: dossier.id,
        type: '',
        date_examen: '',
        prescrit_par: '',
        realise_par: '',
        resultats: '',
        interpretation: '',
        fichier_rapport: null as File | null,
    };

    return useRealForm(initialData);
}

export function usePrescriptionForm() {
    const { dossier } = useDossierPatient();

    const initialData = {
        dossier_id: dossier.id,
        consultation_id: '',
        medicament: '',
        dosage: '',
        frequence: '',
        duree: '',
        instructions: '',
    };

    return useRealForm(initialData);
}

export function useRendezVousForm() {
    const { dossier } = useDossierPatient();

    const initialData = {
        dossier_id: dossier.id,
        date_heure: '',
        sage_femme_id: '',
        type_consultation: '',
        statut: '',
        motif: '',
        notes: '',
    };

    return useRealForm(initialData);
}

export function useDocumentForm() {
    const { dossier } = useDossierPatient();

    const initialData = {
        dossier_id: dossier.id,
        titre: '',
        type_document: '',
        date_document: '',
        description: '',
        chemin_fichier: null as File | null,
    };

    return useRealForm(initialData);
}

export function useNoteSuiviForm() {
    const { dossier } = useDossierPatient();

    const initialData = {
        dossier_id: dossier.id,
        date_note: '',
        type_note: '',
        contenu: '',
    };

    return useRealForm(initialData);
}
