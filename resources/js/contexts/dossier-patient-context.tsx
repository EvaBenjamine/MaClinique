'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface DossierPatientContextType {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
    dialogType: DialogType;
    setDialogType: (type: DialogType) => void;
    dossier: DossierData;
    sagesFemmes: SageFemme[];
    refreshData: () => void;
}

export type DialogType = 'consultation' | 'examen' | 'prescription' | 'rendez-vous' | 'document' | 'note' | 'accouchement';

export interface DossierData {
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
    patiente?: {
        nom: string;
        prenom: string;
        age: number;
        numero_telephone: string;
        numero_conjoint?: string;
        quartier?: string;
        email: string;
    };
    sage_femme?: {
        nom: string;
        prenom: string;
    };
    age_grossesse_semaines?: number;
    trimestre?: string;
    consultations?: unknown[];
    examens?: unknown[];
    prescriptions?: unknown[];
    rendez_vous?: unknown[];
    documents?: unknown[];
    notes_suivi?: unknown[];
    accouchements?: unknown[];
}

export interface SageFemme {
    id: number;
    nom: string;
    prenom: string;
}

const DossierPatientContext = createContext<DossierPatientContextType | undefined>(undefined);

export function DossierPatientProvider({
    children,
    dossier,
    sagesFemmes = [],
    initialDialogType = 'consultation',
    initialIsDialogOpen = false,
}: {
    children: ReactNode;
    dossier: DossierData;
    sagesFemmes?: SageFemme[];
    initialDialogType?: DialogType;
    initialIsDialogOpen?: boolean;
}) {
    const [activeTab, setActiveTab] = useState('general');
    const [isDialogOpen, setIsDialogOpen] = useState(initialIsDialogOpen);
    const [dialogType, setDialogType] = useState<DialogType>(initialDialogType);

    // Synchroniser avec les props quand elles changent
    useEffect(() => {
        setDialogType(initialDialogType);
    }, [initialDialogType]);

    useEffect(() => {
        setIsDialogOpen(initialIsDialogOpen);
    }, [initialIsDialogOpen]);

    const refreshData = () => {
        // Logique pour rafraîchir les données
        window.location.reload();
    };

    return (
        <DossierPatientContext.Provider
            value={{
                activeTab,
                setActiveTab,
                isDialogOpen,
                setIsDialogOpen,
                dialogType,
                setDialogType,
                dossier,
                sagesFemmes,
                refreshData,
            }}
        >
            {children}
        </DossierPatientContext.Provider>
    );
}

export function useDossierPatient() {
    const context = useContext(DossierPatientContext);
    if (context === undefined) {
        throw new Error('useDossierPatient must be used within a DossierPatientProvider');
    }
    return context;
}
