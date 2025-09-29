'use client';

import { useDossierPatient } from '@/contexts/dossier-patient-context';
import { router, useForm, usePage } from '@inertiajs/react';

// Types pour les formulaires Inertia.js
interface FormData {
    [key: string]: string | number | File | null | undefined;
}

type AuthUser = {
    nom: string;
    prenom: string;
    role?: string;
    id: number;
    // Ajoutez d'autres propriétés utilisateur si nécessaire
};

type PageProps = {
    auth: {
        user: AuthUser;
    };
    // Ajoutez d'autres propriétés de page si nécessaire
};

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

    const handleSubmit = (form: InertiaFormData, routeName: string) => {
        router.post(routeName, form.data, {
            onSuccess: () => {
                setIsDialogOpen(false);
                form.reset();
                refreshData();
            },
            onError: (errors: Record<string, string>) => {
                console.error('Erreurs de validation:', errors);
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
    const { props } = usePage<PageProps>();
    const authUser = props.auth.user;

    const initialData = {
        dossier_patient_id: dossier.id,
        sage_femme_id: authUser.id,
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

export function useAccouchementForm() {
    const { dossier } = useDossierPatient();

    const initialData = {
        dossier_id: dossier.id,
        date_accouchement: '',
        type_accouchement: '',
        duree_travail: '',
        duree_expulsion: '',
        presentation: '',
        poids_bebe: '',
        taille_bebe: '',
        perimetre_cranien: '',
        sexe: '',
        apgar_1min: '',
        apgar_5min: '',
        complications: '',
        observations_accouchement: '',
        equipe_medicale: '',
    };

    return useRealForm(initialData);
}
