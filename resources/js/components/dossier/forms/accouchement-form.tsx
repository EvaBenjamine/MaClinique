'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAccouchementForm, useFormHandlers } from '@/hooks/use-form-handlers';
import { AlertCircle, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

interface AccouchementFormProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
}

const steps = [
    {
        id: 'general',
        title: 'Informations générales',
        description: 'Date et âge gestationnel',
        requiredFields: ['date_accouchement', 'age_gestationnel'],
    },
    {
        id: 'travail',
        title: 'Travail et accouchement',
        description: 'Déroulement du travail',
        requiredFields: [],
    },
    {
        id: 'delivrance',
        title: 'Délivrance',
        description: 'Mode de délivrance et placenta',
        requiredFields: [],
    },
    {
        id: 'bebe',
        title: 'Nouveau-né',
        description: 'Informations sur le bébé',
        requiredFields: [],
    },
    {
        id: 'complications',
        title: 'Complications et observations',
        description: 'Notes cliniques',
        requiredFields: [],
    },
];

export function AccouchementForm({ isOpen, onClose, onComplete }: AccouchementFormProps) {
    const form = useAccouchementForm();
    const { handleSubmit } = useFormHandlers();
    const [step, setStep] = useState<number>(1);
    const totalSteps = steps.length;

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

    const currentStepData = steps[step - 1];

    // Vérifier si l'étape actuelle est valide
    const isStepValid = (): boolean => {
        if (!currentStepData) return true;

        switch (currentStepData.id) {
            case 'general':
                return Boolean(form.data.date_accouchement && form.data.age_gestationnel);
            case 'travail':
            case 'delivrance':
            case 'bebe':
            case 'complications':
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
            handleSubmit(form, '/accouchements', {
                onSuccess: () => {
                    onClose();
                    form.reset();
                    onComplete();
                },
                onError: () => {
                    // Naviguer vers l'étape contenant l'erreur si nécessaire
                    const errorFields = Object.keys(form.errors);
                    const stepWithError = steps.findIndex((stepItem) => stepItem.requiredFields.some((field) => errorFields.includes(field)));
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

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="date_accouchement">
                                    Date
                                </Label>
                                <Input
                                    type="date"
                                    id="date_accouchement"
                                    value={getStringValue(form.data.date_accouchement)}
                                    onChange={(e) => handleInputChange('date_accouchement', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                                {/* @ts-expect-error - Type issue with Inertia form errors */}
                                {form.errors.date_accouchement && <p className="text-sm text-red-500">{form.errors.date_accouchement}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="heure_accouchement">
                                    Heure
                                </Label>
                                <Input
                                    type="time"
                                    id="heure_accouchement"
                                    value={getStringValue(form.data.heure_accouchement)}
                                    onChange={(e) => handleInputChange('heure_accouchement', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="age_gestationnel">
                                    Âge gestationnel (SA)
                                </Label>
                                <Input
                                    type="number"
                                    id="age_gestationnel"
                                    placeholder="39"
                                    value={getStringValue(form.data.age_gestationnel)}
                                    onChange={(e) => handleInputChange('age_gestationnel', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                                {/* @ts-expect-error - Type issue with Inertia form errors */}
                                {form.errors.age_gestationnel && <p className="text-sm text-red-500">{form.errors.age_gestationnel}</p>}
                            </div>
                        </div>
                    </div>
                );

            case 'travail':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-pink-700">Travail et accouchement</h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="travail">
                                    Travail
                                </Label>
                                <Select value={getStringValue(form.data.travail)} onValueChange={(value) => handleInputChange('travail', value)}>
                                    <SelectTrigger className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500">
                                        <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="spontane">Spontané</SelectItem>
                                        <SelectItem value="déclenché">Déclenché</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="presentation">
                                    Présentation
                                </Label>
                                <Input
                                    id="presentation"
                                    placeholder="Vertex, siège..."
                                    value={getStringValue(form.data.presentation)}
                                    onChange={(e) => handleInputChange('presentation', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>
                            ce
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="mode_accouchement">
                                    Mode
                                </Label>
                                <Select
                                    value={getStringValue(form.data.mode_accouchement)}
                                    onValueChange={(value) => handleInputChange('mode_accouchement', value)}
                                >
                                    <SelectTrigger className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500">
                                        <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="voie_basse">Voie basse</SelectItem>
                                        <SelectItem value="cesarienne">Césarienne</SelectItem>
                                        <SelectItem value="ventouse">Ventouse</SelectItem>
                                        <SelectItem value="forceps">Forceps</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center space-x-2 pt-8">
                                <Checkbox
                                    id="episiotomie"
                                    checked={getBooleanValue(form.data.episiotomie)}
                                    onCheckedChange={(checked) => handleInputChange('episiotomie', checked === true)}
                                />
                                <Label htmlFor="episiotomie" className="text-pink-800">
                                    Épisiotomie
                                </Label>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="dechirure"
                                checked={getBooleanValue(form.data.dechirure)}
                                onCheckedChange={(checked) => handleInputChange('dechirure', checked === true)}
                            />
                            <Label htmlFor="dechirure" className="text-pink-800">
                                Déchirure périnéale
                            </Label>
                        </div>
                    </div>
                );

            case 'delivrance':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-pink-700">Délivrance</h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="delivrance">
                                    Délivrance
                                </Label>
                                <Select
                                    value={getStringValue(form.data.delivrance)}
                                    onValueChange={(value) => handleInputChange('delivrance', value)}
                                >
                                    <SelectTrigger className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500">
                                        <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="complete">Complète</SelectItem>
                                        <SelectItem value="incomplete">Incomplète</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="mode_delivrance">
                                    Mode de délivrance
                                </Label>
                                <Select
                                    value={getStringValue(form.data.mode_delivrance)}
                                    onValueChange={(value) => handleInputChange('mode_delivrance', value)}
                                >
                                    <SelectTrigger className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500">
                                        <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="naturelle">Naturelle</SelectItem>
                                        <SelectItem value="dirigee">Dirigée</SelectItem>
                                        <SelectItem value="artificielle">Artificielle</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-pink-800" htmlFor="poids_placenta">
                                Poids du placenta (g)
                            </Label>
                            <Input
                                type="number"
                                id="poids_placenta"
                                placeholder="500"
                                value={getStringValue(form.data.poids_placenta)}
                                onChange={(e) => handleInputChange('poids_placenta', e.target.value)}
                                className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                            />
                        </div>
                    </div>
                );

            case 'bebe':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-pink-700">Informations sur le nouveau-né</h2>

                        {/* Mesures anthropométriques */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-pink-600">Mesures anthropométriques</h3>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="poids_bebe">
                                        Poids (g)
                                    </Label>
                                    <Input
                                        type="number"
                                        id="poids_bebe"
                                        placeholder="3200"
                                        value={getStringValue(form.data.poids_bebe)}
                                        onChange={(e) => handleInputChange('poids_bebe', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="taille_bebe">
                                        Taille (cm)
                                    </Label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        id="taille_bebe"
                                        placeholder="50"
                                        value={getStringValue(form.data.taille_bebe)}
                                        onChange={(e) => handleInputChange('taille_bebe', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="perimetre_cranien_bebe">
                                        PC (cm)
                                    </Label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        id="perimetre_cranien_bebe"
                                        placeholder="34"
                                        value={getStringValue(form.data.perimetre_cranien_bebe)}
                                        onChange={(e) => handleInputChange('perimetre_cranien_bebe', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="perimetre_thoracique_bebe">
                                        PT (cm)
                                    </Label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        id="perimetre_thoracique_bebe"
                                        placeholder="32"
                                        value={getStringValue(form.data.perimetre_thoracique_bebe)}
                                        onChange={(e) => handleInputChange('perimetre_thoracique_bebe', e.target.value)}
                                        className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Informations générales */}
                        <div className="space-y-4 border-t border-pink-100 pt-4">
                            <h3 className="text-sm font-medium text-pink-600">Informations générales</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="text-pink-800" htmlFor="sexe">
                                        Sexe
                                    </Label>
                                    <Select value={getStringValue(form.data.sexe)} onValueChange={(value) => handleInputChange('sexe', value)}>
                                        <SelectTrigger className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500">
                                            <SelectValue placeholder="Sélectionner" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="masculin">Masculin</SelectItem>
                                            <SelectItem value="feminin">Féminin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center space-x-2 pt-8">
                                    <Checkbox
                                        id="peau_a_peau"
                                        checked={getBooleanValue(form.data.peau_a_peau)}
                                        onCheckedChange={(checked) => handleInputChange('peau_a_peau', checked === true)}
                                    />
                                    <Label htmlFor="peau_a_peau" className="text-pink-800">
                                        Peau à peau immédiat
                                    </Label>
                                </div>
                            </div>
                        </div>

                        {/* Soins post-naissance */}
                        <div className="space-y-4 border-t border-pink-100 pt-4">
                            <h3 className="text-sm font-medium text-pink-600">Soins post-naissance</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="mise_au_sein"
                                        checked={getBooleanValue(form.data.mise_au_sein)}
                                        onCheckedChange={(checked) => handleInputChange('mise_au_sein', checked === true)}
                                    />
                                    <Label htmlFor="mise_au_sein" className="text-pink-800">
                                        Mise au sein
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="vitamine_k"
                                        checked={getBooleanValue(form.data.vitamine_k)}
                                        onCheckedChange={(checked) => handleInputChange('vitamine_k', checked === true)}
                                    />
                                    <Label htmlFor="vitamine_k" className="text-pink-800">
                                        Vitamine K administrée
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'complications':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-pink-700">Complications et observations</h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="complications">
                                    Complications
                                </Label>
                                <Textarea
                                    id="complications"
                                    placeholder="Décrire les complications éventuelles..."
                                    rows={3}
                                    value={getStringValue(form.data.complications)}
                                    onChange={(e) => handleInputChange('complications', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="observations">
                                    Observations
                                </Label>
                                <Textarea
                                    id="observations"
                                    placeholder="Observations générales sur l'accouchement..."
                                    rows={4}
                                    value={getStringValue(form.data.observations)}
                                    onChange={(e) => handleInputChange('observations', e.target.value)}
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
                            "Enregistrer l'accouchement"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
