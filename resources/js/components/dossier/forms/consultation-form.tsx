'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useConsultationForm, useFormHandlers } from '@/hooks/use-form-handlers';
import { AlertCircle, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

interface ConsultationFormProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
}

const steps = [
    {
        id: 'general',
        title: 'Informations générales',
        description: 'Type et informations de base',
        requiredFields: ['date', 'type_consultation'],
    },
    {
        id: 'measures',
        title: 'Mesures physiques et obstétricales',
        description: 'Poids, tension, hauteur utérine',
        requiredFields: [],
    },
    {
        id: 'specific_cpn',
        title: 'Examen prénatal (CPN)',
        description: 'Champs spécifiques CPN',
        requiredFields: [],
        visibleFor: ['consultation_prenatale'],
    },
    {
        id: 'specific_cpp',
        title: 'Examen postnatal (CPP)',
        description: 'Champs spécifiques CPP',
        requiredFields: [],
        visibleFor: ['consultation_postnatale'],
    },
    {
        id: 'notes',
        title: 'Observations et prescriptions',
        description: 'Notes cliniques',
        requiredFields: [],
    },
];

export function ConsultationForm({ isOpen, onClose, onComplete }: ConsultationFormProps) {
    const form = useConsultationForm();
    const { handleSubmit } = useFormHandlers();
    const [step, setStep] = useState<number>(1);

    // Réinitialiser le formulaire quand la modale s'ouvre
    useEffect(() => {
        if (isOpen) {
            form.reset();
            setStep(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    // Helper pour gérer les valeurs sûrement
    const getStringValue = (value: unknown): string => {
        return typeof value === 'string' ? value : '';
    };

    const getBooleanValue = (value: unknown): boolean => {
        return typeof value === 'boolean' ? value : false;
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        // @ts-expect-error - Problème temporaire avec les types Inertia
        form.setData(field, value);
    };

    // Filtrer les étapes selon le type de consultation
    const getVisibleSteps = () => {
        const typeConsultation = getStringValue(form.data.type_consultation);
        return steps.filter((s) => {
            if (!s.visibleFor) return true;
            return s.visibleFor.includes(typeConsultation);
        });
    };

    const visibleSteps = getVisibleSteps();
    const totalSteps = visibleSteps.length;
    const currentStepData = visibleSteps[step - 1];

    // Vérifier si l'étape actuelle est valide
    const isStepValid = (): boolean => {
        if (!currentStepData) return true;

        switch (currentStepData.id) {
            case 'general':
                return Boolean(form.data.date && form.data.type_consultation);
            case 'measures':
            case 'specific_cpn':
            case 'specific_cpp':
            case 'notes':
                return true;
            default:
                return true;
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (step < totalSteps) {
            if (isStepValid()) {
                setStep(step + 1);
            }
        } else {
            handleSubmit(form, '/consultations', {
                onSuccess: () => {
                    onClose();
                    form.reset();
                    onComplete();
                },
                onError: () => {
                    // Naviguer vers l'étape contenant l'erreur si nécessaire
                    const errorFields = Object.keys(form.errors);
                    const stepWithError = visibleSteps.findIndex((stepItem) => stepItem.requiredFields.some((field) => errorFields.includes(field)));
                    if (stepWithError !== -1) {
                        setStep(stepWithError + 1);
                    }
                },
            });
        }
    };

    // Gérer le retour à l'étape précédente
    const handlePrevious = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    // Calculer le pourcentage de progression
    const progress = Math.min((step / totalSteps) * 100, 100);

    // Rendu de l'étape actuelle
    const renderStep = () => {
        if (!currentStepData) return null;

        switch (currentStepData.id) {
            case 'general':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-pink-700">Informations générales</h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="date">
                                    Date de consultation
                                </Label>
                                <Input
                                    type="date"
                                    id="date"
                                    value={getStringValue(form.data.date)}
                                    onChange={(e) => handleInputChange('date', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                                {/* @ts-expect-error - Type issue with Inertia form errors */}
                                {form.errors.date && <p className="text-sm text-red-500">{form.errors.date}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="type_consultation">
                                    Type de consultation
                                </Label>
                                <Select
                                    value={getStringValue(form.data.type_consultation)}
                                    onValueChange={(value) => {
                                        handleInputChange('type_consultation', value);
                                        // Réinitialiser à l'étape 1 si le type change pour recalculer les étapes visibles
                                        setStep(1);
                                    }}
                                >
                                    <SelectTrigger className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500">
                                        <SelectValue placeholder="Sélectionner le type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="suivi_grossesse">Suivi de grossesse</SelectItem>
                                        <SelectItem value="consultation_urgence">Consultation d'urgence</SelectItem>
                                        <SelectItem value="consultation_controle">Consultation de contrôle</SelectItem>
                                        <SelectItem value="consultation_prenatale">Consultation prénatale (CPN)</SelectItem>
                                        <SelectItem value="consultation_postnatale">Consultation postnatale (CPP)</SelectItem>
                                    </SelectContent>
                                </Select>
                                {/* @ts-expect-error - Type issue with Inertia form errors */}
                                {form.errors.type_consultation && <p className="text-sm text-red-500">{form.errors.type_consultation}</p>}
                            </div>
                        </div>
                    </div>
                );

            case 'measures':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-pink-700">Mesures physiques</h2>

                        {/* Mesures physiques uniquement */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="poids">
                                        Poids (kg)
                                    </Label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        id="poids"
                                        placeholder="65.5"
                                        value={getStringValue(form.data.poids)}
                                        onChange={(e) => handleInputChange('poids', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="tension_arterielle_systolique">
                                        Tension systolique
                                    </Label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        id="tension_arterielle_systolique"
                                        placeholder="120"
                                        value={getStringValue(form.data.tension_arterielle_systolique)}
                                        onChange={(e) => handleInputChange('tension_arterielle_systolique', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="tension_arterielle_diastolique">
                                        Tension diastolique
                                    </Label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        id="tension_arterielle_diastolique"
                                        placeholder="80"
                                        value={getStringValue(form.data.tension_arterielle_diastolique)}
                                        onChange={(e) => handleInputChange('tension_arterielle_diastolique', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'specific_cpn':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-pink-700">Examen prénatal (CPN)</h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="age_gestationnel_semaines">
                                    Âge gestationnel (semaines)
                                </Label>
                                <Input
                                    type="number"
                                    id="age_gestationnel_semaines"
                                    placeholder="28"
                                    value={getStringValue(form.data.age_gestationnel_semaines)}
                                    onChange={(e) => handleInputChange('age_gestationnel_semaines', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="plaintes">
                                    Plaintes
                                </Label>
                                <Input
                                    id="plaintes"
                                    placeholder="Douleurs, nausées..."
                                    value={getStringValue(form.data.plaintes)}
                                    onChange={(e) => handleInputChange('plaintes', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>
                        </div>

                        {/* Mesures obstétricales (uniquement pour CPN) */}
                        <div className="space-y-4 border-t border-pink-100 pt-4">
                            <h3 className="text-sm font-medium text-pink-600">Mesures obstétricales</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="hauteur_uterine">
                                        Hauteur utérine (cm)
                                    </Label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        id="hauteur_uterine"
                                        placeholder="32.5"
                                        value={getStringValue(form.data.hauteur_uterine)}
                                        onChange={(e) => handleInputChange('hauteur_uterine', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="position_foetus">
                                        Position du fœtus
                                    </Label>
                                    <Input
                                        id="position_foetus"
                                        placeholder="Vertex, siège..."
                                        value={getStringValue(form.data.position_foetus)}
                                        onChange={(e) => handleInputChange('position_foetus', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="rythme_cardiaque_foetal">
                                        BCF (bpm)
                                    </Label>
                                    <Input
                                        type="number"
                                        id="rythme_cardiaque_foetal"
                                        placeholder="140"
                                        value={getStringValue(form.data.rythme_cardiaque_foetal)}
                                        onChange={(e) => handleInputChange('rythme_cardiaque_foetal', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Examen clinique */}
                        <div className="space-y-4 border-t border-pink-100 pt-4">
                            <h3 className="text-sm font-medium text-pink-600">Examen clinique</h3>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="dents_gencives">
                                        Dents / Gencives
                                    </Label>
                                    <Input
                                        id="dents_gencives"
                                        placeholder="État des dents et gencives"
                                        value={getStringValue(form.data.dents_gencives)}
                                        onChange={(e) => handleInputChange('dents_gencives', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="varices">
                                        Varices
                                    </Label>
                                    <Input
                                        id="varices"
                                        placeholder="Présence de varices"
                                        value={getStringValue(form.data.varices)}
                                        onChange={(e) => handleInputChange('varices', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="maf">
                                    MAF (Mouvements Actifs Fœtaux)
                                </Label>
                                <Input
                                    id="maf"
                                    placeholder="Fréquence et qualité des MAF"
                                    value={getStringValue(form.data.maf)}
                                    onChange={(e) => handleInputChange('maf', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>
                        </div>

                        {/* Examen gynécologique */}
                        <div className="space-y-4 border-t border-pink-100 pt-4">
                            <h3 className="text-sm font-medium text-pink-600">Examen gynécologique</h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="vulve">
                                        Vulve
                                    </Label>
                                    <Textarea
                                        id="vulve"
                                        placeholder="État de la vulve"
                                        rows={2}
                                        value={getStringValue(form.data.vulve)}
                                        onChange={(e) => handleInputChange('vulve', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="examen_speculum">
                                        Examen au spéculum
                                    </Label>
                                    <Textarea
                                        id="examen_speculum"
                                        placeholder="Résultats de l'examen au spéculum"
                                        rows={2}
                                        value={getStringValue(form.data.examen_speculum)}
                                        onChange={(e) => handleInputChange('examen_speculum', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="toucher_vaginal">
                                        Toucher vaginal
                                    </Label>
                                    <Textarea
                                        id="toucher_vaginal"
                                        placeholder="Résultats du toucher vaginal"
                                        rows={2}
                                        value={getStringValue(form.data.toucher_vaginal)}
                                        onChange={(e) => handleInputChange('toucher_vaginal', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="etat_bassin">
                                        État du bassin
                                    </Label>
                                    <Input
                                        id="etat_bassin"
                                        placeholder="Normal, rétréci..."
                                        value={getStringValue(form.data.etat_bassin)}
                                        onChange={(e) => handleInputChange('etat_bassin', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="prochain_rdv">
                                        Prochain RDV
                                    </Label>
                                    <Input
                                        type="date"
                                        id="prochain_rdv"
                                        value={getStringValue(form.data.prochain_rdv)}
                                        onChange={(e) => handleInputChange('prochain_rdv', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'specific_cpp':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-pink-700">Examen postnatal (CPP)</h2>

                        <div className="space-y-2">
                            <Label className="text-pink-800" htmlFor="jour_postnatal">
                                Jour postnatal
                            </Label>
                            <Input
                                type="number"
                                id="jour_postnatal"
                                placeholder="7"
                                value={getStringValue(form.data.jour_postnatal)}
                                onChange={(e) => handleInputChange('jour_postnatal', e.target.value)}
                                className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                            />
                        </div>

                        {/* Section Allaitement */}
                        <div className="space-y-4 border-t border-pink-100 pt-4">
                            <h3 className="text-sm font-medium text-pink-600">Allaitement</h3>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="flex items-center justify-between rounded-xl border border-pink-200 bg-pink-50/30 p-3">
                                    <Label htmlFor="montee_lait" className="text-pink-800 cursor-pointer">
                                        Montée de lait
                                    </Label>
                                    <Checkbox
                                        id="montee_lait"
                                        checked={getBooleanValue(form.data.montee_lait)}
                                        onCheckedChange={(checked) => handleInputChange('montee_lait', checked === true)}
                                    />
                                </div>

                                <div className="flex items-center justify-between rounded-xl border border-pink-200 bg-pink-50/30 p-3">
                                    <Label htmlFor="presence_gercures" className="text-pink-800 cursor-pointer">
                                        Présence de gerçures
                                    </Label>
                                    <Checkbox
                                        id="presence_gercures"
                                        checked={getBooleanValue(form.data.presence_gercures)}
                                        onCheckedChange={(checked) => handleInputChange('presence_gercures', checked === true)}
                                    />
                                </div>

                                <div className="flex items-center justify-between rounded-xl border border-pink-200 bg-pink-50/30 p-3">
                                    <Label htmlFor="engorgement_mamaire" className="text-pink-800 cursor-pointer">
                                        Engorgement mamaire
                                    </Label>
                                    <Checkbox
                                        id="engorgement_mamaire"
                                        checked={getBooleanValue(form.data.engorgement_mamaire)}
                                        onCheckedChange={(checked) => handleInputChange('engorgement_mamaire', checked === true)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section Involution utérine */}
                        <div className="space-y-4 border-t border-pink-100 pt-4">
                            <h3 className="text-sm font-medium text-pink-600">Involution utérine</h3>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="flex items-center justify-between rounded-xl border border-pink-200 bg-pink-50/30 p-3">
                                    <Label htmlFor="involution_uterine" className="text-pink-800 cursor-pointer">
                                        Involution utérine normale
                                    </Label>
                                    <Checkbox
                                        id="involution_uterine"
                                        checked={getBooleanValue(form.data.involution_uterine)}
                                        onCheckedChange={(checked) => handleInputChange('involution_uterine', checked === true)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="lochies">
                                        Lochies
                                    </Label>
                                    <Select value={getStringValue(form.data.lochies)} onValueChange={(value) => handleInputChange('lochies', value)}>
                                        <SelectTrigger id="lochies" className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500">
                                            <SelectValue placeholder="Sélectionner l'état des lochies" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="normales">Normales</SelectItem>
                                            <SelectItem value="abondantes">Abondantes</SelectItem>
                                            <SelectItem value="malodorantes">Malodorantes</SelectItem>
                                            <SelectItem value="absentes">Absentes</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Section Périnée et examen */}
                        <div className="space-y-4 border-t border-pink-100 pt-4">
                            <h3 className="text-sm font-medium text-pink-600">Périnée et examen clinique</h3>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="perinee">
                                        Périnée
                                    </Label>
                                    <Input
                                        id="perinee"
                                        placeholder="État du périnée, cicatrisation"
                                        value={getStringValue(form.data.perinee)}
                                        onChange={(e) => handleInputChange('perinee', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="mollets">
                                        Mollets
                                    </Label>
                                    <Input
                                        id="mollets"
                                        placeholder="Signe de Homans, œdème"
                                        value={getStringValue(form.data.mollets)}
                                        onChange={(e) => handleInputChange('mollets', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="toucher_vaginal_cpp">
                                    Toucher vaginal
                                </Label>
                                <Textarea
                                    id="toucher_vaginal_cpp"
                                    placeholder="Résultats du toucher vaginal postnatal"
                                    rows={2}
                                    value={getStringValue(form.data.toucher_vaginal_cpp)}
                                    onChange={(e) => handleInputChange('toucher_vaginal_cpp', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="contraception">
                                    Contraception
                                </Label>
                                <Input
                                    id="contraception"
                                    placeholder="Méthode de contraception discutée"
                                    value={getStringValue(form.data.contraception)}
                                    onChange={(e) => handleInputChange('contraception', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>
                        </div>

                        {/* Section Nouveau-né */}
                        <div className="space-y-4 border-t border-pink-100 pt-4">
                            <h3 className="text-sm font-medium text-pink-600">Examen du nouveau-né</h3>

                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="poids_nouveau_ne">
                                        Poids (g)
                                    </Label>
                                    <Input
                                        type="number"
                                        id="poids_nouveau_ne"
                                        placeholder="3200"
                                        value={getStringValue(form.data.poids_nouveau_ne)}
                                        onChange={(e) => handleInputChange('poids_nouveau_ne', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="taille_nouveau_ne">
                                        Taille (cm)
                                    </Label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        id="taille_nouveau_ne"
                                        placeholder="50"
                                        value={getStringValue(form.data.taille_nouveau_ne)}
                                        onChange={(e) => handleInputChange('taille_nouveau_ne', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="perimetre_cranien_nouveau_ne">
                                        PC (cm)
                                    </Label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        id="perimetre_cranien_nouveau_ne"
                                        placeholder="34"
                                        value={getStringValue(form.data.perimetre_cranien_nouveau_ne)}
                                        onChange={(e) => handleInputChange('perimetre_cranien_nouveau_ne', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="perimetre_thoracique_nouveau_ne">
                                        PT (cm)
                                    </Label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        id="perimetre_thoracique_nouveau_ne"
                                        placeholder="32"
                                        value={getStringValue(form.data.perimetre_thoracique_nouveau_ne)}
                                        onChange={(e) => handleInputChange('perimetre_thoracique_nouveau_ne', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="temperature_nouveau_ne">
                                        Température (°C)
                                    </Label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        id="temperature_nouveau_ne"
                                        placeholder="36.5"
                                        value={getStringValue(form.data.temperature_nouveau_ne)}
                                        onChange={(e) => handleInputChange('temperature_nouveau_ne', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="cordon">
                                        Cordon
                                    </Label>
                                    <Input
                                        id="cordon"
                                        placeholder="État du cordon ombilical"
                                        value={getStringValue(form.data.cordon)}
                                        onChange={(e) => handleInputChange('cordon', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between rounded-xl border border-pink-200 bg-pink-50/30 p-3">
                                    <Label htmlFor="reflexes" className="text-pink-800 cursor-pointer">
                                        Réflexes normaux
                                    </Label>
                                    <Checkbox
                                        id="reflexes"
                                        checked={getBooleanValue(form.data.reflexes)}
                                        onCheckedChange={(checked) => handleInputChange('reflexes', checked === true)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'notes':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-pink-700">Observations et prescriptions</h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="observations">
                                    Observations
                                </Label>
                                <Textarea
                                    id="observations"
                                    placeholder="Observations cliniques de la consultation..."
                                    rows={3}
                                    value={getStringValue(form.data.observations)}
                                    onChange={(e) => handleInputChange('observations', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="prescriptions">
                                    Prescriptions
                                </Label>
                                <Textarea
                                    id="prescriptions"
                                    placeholder="Médicaments prescrits..."
                                    rows={2}
                                    value={getStringValue(form.data.prescriptions)}
                                    onChange={(e) => handleInputChange('prescriptions', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="examens_prescrits">
                                    Examens prescrits
                                </Label>
                                <Textarea
                                    id="examens_prescrits"
                                    placeholder="Examens à réaliser..."
                                    rows={2}
                                    value={getStringValue(form.data.examens_prescrits)}
                                    onChange={(e) => handleInputChange('examens_prescrits', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="recommandations">
                                    Recommandations
                                </Label>
                                <Textarea
                                    id="recommandations"
                                    placeholder="Recommandations pour la patiente..."
                                    rows={2}
                                    value={getStringValue(form.data.recommandations)}
                                    onChange={(e) => handleInputChange('recommandations', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Barre de progression */}
            <div className="space-y-2">
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-pink-100 shadow-inner">
                    <div className="absolute h-full bg-pink-500 transition-all duration-300 ease-in-out" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex justify-between text-xs text-pink-700">
                    <span className="font-medium">
                        Étape {step} sur {totalSteps}
                    </span>
                    <span className="font-medium">{Math.round(progress)}% complété</span>
                </div>
            </div>

            {/* Messages d'erreur globaux */}
            {Object.keys(form.errors).length > 0 && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>Veuillez corriger les erreurs dans le formulaire.</AlertDescription>
                </Alert>
            )}

            {/* Contenu du formulaire */}
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="min-h-[400px]">{renderStep()}</div>

                {/* Boutons de navigation */}
                <div className="flex items-center justify-between border-t border-pink-100 pt-6">
                    {step > 1 ? (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={form.processing}
                            className="rounded-xl border-pink-400 text-pink-600 hover:bg-pink-100"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Précédent
                        </Button>
                    ) : (
                        <div />
                    )}

                    <Button
                        type="submit"
                        disabled={form.processing || !isStepValid()}
                        className="rounded-xl bg-pink-600 text-white shadow hover:bg-pink-700"
                    >
                        {form.processing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {step < totalSteps ? 'Traitement...' : 'Enregistrement...'}
                            </>
                        ) : step < totalSteps ? (
                            <>
                                Suivant <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        ) : (
                            'Enregistrer la consultation'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
