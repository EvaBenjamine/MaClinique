import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

interface SageFemme {
    id: number;
    nom: string;
    prenom?: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    sagesFemmes: SageFemme[];
    onComplete: () => void;
}

const steps = [
    {
        id: 'personal',
        title: 'Informations personnelles',
        description: 'Informations de base de la patiente',
        requiredFields: ['nom', 'prenom', 'age'],
    },
    {
        id: 'contact',
        title: 'Contact & Adresse',
        description: 'Coordonnées et informations de contact',
        requiredFields: ['numero_telephone'],
    },
    {
        id: 'pregnancy',
        title: 'Grossesse actuelle',
        description: 'Informations sur la grossesse en cours',
        requiredFields: [],
    },
    {
        id: 'obstetrical',
        title: 'Antécédents obstétricaux',
        description: 'Historique des grossesses précédentes',
        requiredFields: [],
    },
    {
        id: 'medical',
        title: 'Antécédents médicaux',
        description: 'Historique médical et traitements',
        requiredFields: [],
    },
    {
        id: 'lifestyle',
        title: 'Mode de vie',
        description: 'Habitudes et style de vie',
        requiredFields: [],
    },
    {
        id: 'followup',
        title: 'Suivi médical',
        description: 'Assignment et notes importantes',
        requiredFields: ['sage_femme_id'],
    },
];

export default function AddPatienteModal({ isOpen, onClose, sagesFemmes, onComplete }: Props) {
    const [step, setStep] = useState<number>(1);
    const [totalSteps] = useState<number>(steps.length);

    // Formulaire Inertia pour la soumission des données
    const { data, setData, post, processing, errors, reset } = useForm({
        // Informations personnelles
        nom: '',
        prenom: '',
        email: '',
        password: '',
        password_confirmation: '',
        age: '',
        profession: '',
        situation_matrimoniale: '',
        groupe_sanguin: '',
        numero_telephone: '',
        numero_conjoint: '',
        quartier: '',

        // Informations grossesse
        date_derniere_regle: '',
        date_accouchement_prevue: '',
        grossesse_multiple: false as boolean,
        nombre_foetus: 1,
        grossesse_a_risque: false as boolean,
        facteurs_risque: '',

        // Antécédents obstétricaux
        gestite: 0,
        parite: 0,
        fausses_couches: 0,
        ev: 0,
        morts_nes: 0,
        decedes: 0,

        // Antécédents médicaux
        antecedents_medicaux: '',
        antecedents_chirurgicaux: '',
        antecedents_familiaux: '',
        antecedents_gynecologiques: '',
        antecedents_obstetricaux: '',
        allergies: '',
        traitements_en_cours: '',
        maladies_chroniques: '',

        // Mode de vie
        tabac: false as boolean,
        alcool: false as boolean,
        activite_physique: '',
        regime_alimentaire: '',

        // Suivi médical
        sage_femme_id: '',
        statut_dossier: 'Actif',
        notes_importantes: '',
        recommandations_particulieres: '',
    });

    // Réinitialiser le formulaire quand la modale s'ouvre
    useEffect(() => {
        if (isOpen) {
            reset();
            setStep(1);
        }
    }, [isOpen, reset]);

    // Calculer automatiquement la date d'accouchement prévue (DDR + 280 jours)
    useEffect(() => {
        if (data.date_derniere_regle) {
            const ddr = new Date(data.date_derniere_regle);
            // Ajouter 280 jours (40 semaines)
            ddr.setDate(ddr.getDate() + 280);
            const dateAccouchementPrevue = ddr.toISOString().split('T')[0];
            setData('date_accouchement_prevue', dateAccouchementPrevue);
        }
    }, [data.date_derniere_regle, setData]);

    // Gérer la soumission du formulaire
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (step < totalSteps) {
            // Passer à l'étape suivante si le formulaire est valide
            if (isStepValid()) {
                setStep(step + 1);
            }
        } else {
            // Soumettre le formulaire avec les données nettoyées
            const formData = {
                ...data,
                age: Number(data.age) || 0,
                nombre_foetus: Number(data.nombre_foetus) || 1,
                gestite: Number(data.gestite) || 0,
                parite: Number(data.parite) || 0,
                fausses_couches: Number(data.fausses_couches) || 0,
                ev: Number(data.ev) || 0,
                morts_nes: Number(data.morts_nes) || 0,
                decedes: Number(data.decedes) || 0,
            };

            post(route('patientes.store'), {
                ...formData,
                onSuccess: () => {
                    handleClose();
                    onComplete();
                },
                onError: () => {
                    // Naviguer vers l'étape contenant l'erreur
                    const errorFields = Object.keys(errors);
                    const stepWithError = steps.findIndex((stepItem) => stepItem.requiredFields.some((field) => errorFields.includes(field)));
                    if (stepWithError !== -1) {
                        setStep(stepWithError + 1);
                    }
                },
            });
        }
    };

    // Vérifier si l'étape actuelle est valide
    const isStepValid = (): boolean => {
        const currentStepData = steps[step - 1];
        if (!currentStepData) return true;

        // Validation personnalisée pour chaque étape
        switch (currentStepData.id) {
            case 'personal':
                return Boolean(data.nom && data.prenom && data.age && !errors.nom && !errors.prenom && !errors.age);
            case 'contact':
                return Boolean(data.numero_telephone && !errors.numero_telephone);
            case 'pregnancy':
            case 'obstetrical':
            case 'medical':
            case 'lifestyle':
                return true;
            case 'followup':
                return Boolean(data.sage_femme_id && !errors.sage_femme_id);
            default:
                return true;
        }
    };

    // Gérer le retour à l'étape précédente
    const handlePrevious = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    // Gérer la fermeture du modal
    const handleClose = () => {
        if (!processing) {
            reset();
            setStep(1);
            onClose();
        }
    };

    // Calculer le pourcentage de progression
    const progress = Math.min((step / totalSteps) * 100, 100);

    // Rendu de l'étape actuelle
    const renderStep = () => {
        const currentStepData = steps[step - 1];
        if (!currentStepData) return null;

        switch (currentStepData.id) {
            case 'personal':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-pink-700">Informations personnelles</h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="prenom">
                                    Prénom
                                </Label>
                                <Input
                                    id="prenom"
                                    value={data.prenom}
                                    onChange={(e) => setData('prenom', e.target.value)}
                                    placeholder="Prénom"
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                                {errors.prenom && <p className="text-sm text-red-500">{errors.prenom}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="nom">
                                    Nom
                                </Label>
                                <Input
                                    id="nom"
                                    value={data.nom}
                                    onChange={(e) => setData('nom', e.target.value)}
                                    placeholder="Nom"
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                                {errors.nom && <p className="text-sm text-red-500">{errors.nom}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-pink-800" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                                className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="age">
                                    Âge
                                </Label>
                                <Input
                                    id="age"
                                    type="number"
                                    min="1"
                                    max="150"
                                    value={data.age}
                                    onChange={(e) => setData('age', e.target.value)}
                                    placeholder="Âge"
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                                {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="groupe_sanguin">
                                    Groupe sanguin
                                </Label>
                                <Select value={data.groupe_sanguin} onValueChange={(value) => setData('groupe_sanguin', value)}>
                                    <SelectTrigger className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500">
                                        <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="A+">A+</SelectItem>
                                        <SelectItem value="A-">A-</SelectItem>
                                        <SelectItem value="B+">B+</SelectItem>
                                        <SelectItem value="B-">B-</SelectItem>
                                        <SelectItem value="AB+">AB+</SelectItem>
                                        <SelectItem value="AB-">AB-</SelectItem>
                                        <SelectItem value="O+">O+</SelectItem>
                                        <SelectItem value="O-">O-</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="situation_matrimoniale" title="Situation matrimoniale">
                                    Statut marital
                                </Label>
                                <Select value={data.situation_matrimoniale} onValueChange={(value) => setData('situation_matrimoniale', value)}>
                                    <SelectTrigger className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500">
                                        <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="celibataire">Célibataire</SelectItem>
                                        <SelectItem value="mariée">Mariée</SelectItem>
                                        <SelectItem value="divorcée">Divorcée</SelectItem>
                                        <SelectItem value="deuve">Veuve</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-pink-800" htmlFor="profession">
                                Profession
                            </Label>
                            <Input
                                id="profession"
                                value={data.profession}
                                onChange={(e) => setData('profession', e.target.value)}
                                placeholder="Profession"
                                className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                            />
                        </div>
                    </div>
                );

            case 'contact':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-pink-700">Contact & Adresse</h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="numero_telephone">
                                    Numéro de téléphone
                                </Label>
                                <Input
                                    id="numero_telephone"
                                    value={data.numero_telephone}
                                    onChange={(e) => setData('numero_telephone', e.target.value)}
                                    placeholder="+33 1 23 45 67 89"
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                                {errors.numero_telephone && <p className="text-sm text-red-500">{errors.numero_telephone}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="numero_conjoint">
                                    Numéro du conjoint
                                </Label>
                                <Input
                                    id="numero_conjoint"
                                    value={data.numero_conjoint}
                                    onChange={(e) => setData('numero_conjoint', e.target.value)}
                                    placeholder="+33 1 23 45 67 89"
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-pink-800" htmlFor="quartier">
                                Quartier
                            </Label>
                            <Textarea
                                id="quartier"
                                value={data.quartier}
                                onChange={(e) => setData('quartier', e.target.value)}
                                rows={3}
                                placeholder="Nom du quartier ou de la zone"
                                className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                            />
                        </div>
                    </div>
                );

            case 'pregnancy':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-pink-700">Grossesse actuelle</h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="date_derniere_regle">
                                    Date des dernières règles
                                </Label>
                                <Input
                                    id="date_derniere_regle"
                                    type="date"
                                    value={data.date_derniere_regle}
                                    onChange={(e) => setData('date_derniere_regle', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="date_accouchement_prevue">
                                    Date d'accouchement prévue{' '}
                                </Label>
                                <Input
                                    id="date_accouchement_prevue"
                                    type="date"
                                    value={data.date_accouchement_prevue}
                                    readOnly
                                    className="rounded-xl border-pink-300 bg-pink-50 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="grossesse_multiple"
                                    checked={data.grossesse_multiple}
                                    onCheckedChange={(checked) => {
                                        setData('grossesse_multiple', checked === true);
                                        if (!checked) {
                                            setData('nombre_foetus', 1);
                                        }
                                    }}
                                />
                                <Label htmlFor="grossesse_multiple" className="text-pink-800">
                                    Grossesse multiple
                                </Label>
                            </div>

                            {data.grossesse_multiple && (
                                <div className="space-y-2">
                                    <Label htmlFor="nombre_foetus" className="text-pink-800">
                                        Nombre de fœtus
                                    </Label>
                                    <Input
                                        id="nombre_foetus"
                                        type="number"
                                        min="2"
                                        max="5"
                                        value={data.nombre_foetus}
                                        onChange={(e) => setData('nombre_foetus', Number(e.target.value) || 2)}
                                        className="w-20 rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="grossesse_a_risque"
                                checked={data.grossesse_a_risque}
                                onCheckedChange={(checked) => setData('grossesse_a_risque', checked === true)}
                            />
                            <Label htmlFor="grossesse_a_risque" className="text-pink-800">
                                Grossesse à risque
                            </Label>
                        </div>

                        {data.grossesse_a_risque && (
                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="facteurs_risque">
                                    Facteurs de risque
                                </Label>
                                <Textarea
                                    id="facteurs_risque"
                                    value={data.facteurs_risque}
                                    onChange={(e) => setData('facteurs_risque', e.target.value)}
                                    rows={3}
                                    placeholder="Décrire les facteurs de risque identifiés (diabète gestationnel, hypertension, etc.)"
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>
                        )}
                    </div>
                );

            case 'obstetrical':
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="mb-2 text-lg font-semibold text-pink-700">Antécédents obstétricaux</h2>
                        </div>

                        {/* Première ligne : Gestité, Parité, Fausses couches */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="gestite">
                                    Gestité
                                </Label>
                                <Input
                                    id="gestite"
                                    type="number"
                                    min="0"
                                    value={data.gestite}
                                    onChange={(e) => setData('gestite', Number(e.target.value) || 0)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    placeholder="0"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="parite">
                                    Parité
                                </Label>
                                <Input
                                    id="parite"
                                    type="number"
                                    min="0"
                                    value={data.parite}
                                    onChange={(e) => setData('parite', Number(e.target.value) || 0)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    placeholder="0"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="fausses_couches">
                                    Fausses couches
                                </Label>
                                <Input
                                    id="fausses_couches"
                                    type="number"
                                    min="0"
                                    value={data.fausses_couches}
                                    onChange={(e) => setData('fausses_couches', Number(e.target.value) || 0)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* Deuxième ligne : Enfants vivants, Morts-nés, Décédés */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="ev">
                                    EV
                                </Label>
                                <Input
                                    id="ev"
                                    type="number"
                                    min="0"
                                    value={data.ev}
                                    onChange={(e) => setData('ev', Number(e.target.value) || 0)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    placeholder="0"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="morts_nes">
                                    Morts-nés
                                </Label>
                                <Input
                                    id="morts_nes"
                                    type="number"
                                    min="0"
                                    value={data.morts_nes}
                                    onChange={(e) => setData('morts_nes', Number(e.target.value) || 0)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    placeholder="0"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="decedes">
                                    Décédés
                                </Label>
                                <Input
                                    id="decedes"
                                    type="number"
                                    min="0"
                                    value={data.decedes}
                                    onChange={(e) => setData('decedes', Number(e.target.value) || 0)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* Section détails */}
                        <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="antecedents_obstetricaux">
                                    Antécédents obstétricaux
                                </Label>
                                <Textarea
                                    id="antecedents_obstetricaux"
                                    value={data.antecedents_obstetricaux}
                                    onChange={(e) => setData('antecedents_obstetricaux', e.target.value)}
                                    rows={3}
                                    placeholder="Complications lors des grossesses/accouchements précédents (césarienne, forceps, prématurité, etc.)"
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-pink-800" htmlFor="antecedents_gynecologiques">
                                    Antécédents gynécologiques
                                </Label>
                                <Textarea
                                    id="antecedents_gynecologiques"
                                    value={data.antecedents_gynecologiques}
                                    onChange={(e) => setData('antecedents_gynecologiques', e.target.value)}
                                    rows={3}
                                    placeholder="Historique gynécologique, interventions, pathologies (fibromes, endométriose, etc.)"
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'medical':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-pink-700">Antécédents médicaux</h2>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="antecedents_medicaux">
                                    Antécédents médicaux
                                </Label>
                                <Textarea
                                    id="antecedents_medicaux"
                                    value={data.antecedents_medicaux}
                                    onChange={(e) => setData('antecedents_medicaux', e.target.value)}
                                    rows={3}
                                    placeholder="Maladies antérieures, hospitalisations"
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="antecedents_chirurgicaux">
                                    Antécédents chirurgicaux
                                </Label>
                                <Textarea
                                    id="antecedents_chirurgicaux"
                                    value={data.antecedents_chirurgicaux}
                                    onChange={(e) => setData('antecedents_chirurgicaux', e.target.value)}
                                    rows={3}
                                    placeholder="Interventions chirurgicales antérieures"
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-pink-800" htmlFor="antecedents_familiaux">
                                Antécédents familiaux
                            </Label>
                            <Textarea
                                id="antecedents_familiaux"
                                value={data.antecedents_familiaux}
                                onChange={(e) => setData('antecedents_familiaux', e.target.value)}
                                rows={2}
                                placeholder="Antécédents médicaux familiaux pertinents (diabète, hypertension, cancers, etc.)"
                                className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="allergies">
                                    Allergies
                                </Label>
                                <Textarea
                                    id="allergies"
                                    value={data.allergies}
                                    onChange={(e) => setData('allergies', e.target.value)}
                                    rows={2}
                                    placeholder="Allergies connues (médicaments, aliments, latex, etc.)"
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="maladies_chroniques">
                                    Maladies chroniques
                                </Label>
                                <Textarea
                                    id="maladies_chroniques"
                                    value={data.maladies_chroniques}
                                    onChange={(e) => setData('maladies_chroniques', e.target.value)}
                                    rows={2}
                                    placeholder="Pathologies chroniques (diabète, hypertension, asthme, etc.)"
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-pink-800" htmlFor="traitements_en_cours">
                                Traitements en cours
                            </Label>
                            <Textarea
                                id="traitements_en_cours"
                                value={data.traitements_en_cours}
                                onChange={(e) => setData('traitements_en_cours', e.target.value)}
                                rows={3}
                                placeholder="Médicaments et traitements actuels (nom, posologie, durée)"
                                className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                            />
                        </div>
                    </div>
                );

            case 'lifestyle':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-pink-700">Mode de vie</h2>

                        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="tabac" checked={data.tabac} onCheckedChange={(checked) => setData('tabac', checked === true)} />
                                <Label htmlFor="tabac" className="text-pink-800">
                                    Consommation de tabac
                                </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="alcool" checked={data.alcool} onCheckedChange={(checked) => setData('alcool', checked === true)} />
                                <Label htmlFor="alcool" className="text-pink-800">
                                    Consommation d'alcool
                                </Label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-pink-800" htmlFor="activite_physique">
                                Activité physique
                            </Label>
                            <Textarea
                                id="activite_physique"
                                value={data.activite_physique}
                                onChange={(e) => setData('activite_physique', e.target.value)}
                                rows={2}
                                placeholder="Type et fréquence des activités physiques (marche, natation, yoga prénatal, etc.)"
                                className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-pink-800" htmlFor="regime_alimentaire">
                                Régime alimentaire
                            </Label>
                            <Textarea
                                id="regime_alimentaire"
                                value={data.regime_alimentaire}
                                onChange={(e) => setData('regime_alimentaire', e.target.value)}
                                rows={2}
                                placeholder="Habitudes alimentaires, régimes spéciaux (végétarien, sans gluten, diabétique, etc.)"
                                className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                            />
                        </div>
                    </div>
                );

            case 'followup':
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-pink-700">Suivi médical</h2>

                        <div className="space-y-2">
                            <Label className="text-pink-800" htmlFor="sage_femme_id">
                                Sage-femme assignée <span className="text-red-500">*</span>
                            </Label>
                            <Select value={data.sage_femme_id} onValueChange={(value) => setData('sage_femme_id', value)}>
                                <SelectTrigger className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500">
                                    <SelectValue placeholder="Sélectionner une sage-femme" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sagesFemmes.map((sf) => (
                                        <SelectItem key={sf.id} value={sf.id.toString()}>
                                            {sf.nom} {sf.prenom && sf.prenom}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.sage_femme_id && <p className="text-sm text-red-500">{errors.sage_femme_id}</p>}
                            {!data.sage_femme_id && <p className="text-xs text-pink-600">Ce champ est obligatoire</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-pink-800" htmlFor="statut_dossier">
                                Statut du dossier
                            </Label>
                            <Select value={data.statut_dossier} onValueChange={(value) => setData('statut_dossier', value)}>
                                <SelectTrigger className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Actif">Actif</SelectItem>
                                    <SelectItem value="Suspendu">Suspendu</SelectItem>
                                    <SelectItem value="Archivé">Archivé</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-pink-800" htmlFor="notes_importantes">
                                Notes importantes
                            </Label>
                            <Textarea
                                id="notes_importantes"
                                value={data.notes_importantes}
                                onChange={(e) => setData('notes_importantes', e.target.value)}
                                rows={3}
                                placeholder="Notes importantes concernant la patiente (urgences, particularités, etc.)"
                                className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-pink-800" htmlFor="recommandations_particulieres">
                                Recommandations particulières
                            </Label>
                            <Textarea
                                id="recommandations_particulieres"
                                value={data.recommandations_particulieres}
                                onChange={(e) => setData('recommandations_particulieres', e.target.value)}
                                rows={3}
                                placeholder="Recommandations spécifiques pour le suivi (fréquence des visites, examens particuliers, etc.)"
                                className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                            />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] max-w-4xl overflow-hidden p-0">
                <div className="flex max-h-[90vh] flex-col">
                    {/* En-tête fixe */}
                    <DialogHeader className="border-b border-pink-100 bg-gradient-to-r from-pink-50 to-white px-6 py-4">
                        <DialogTitle className="text-2xl font-bold text-pink-600">Ajouter une nouvelle patiente</DialogTitle>

                        {/* Barre de progression */}
                        <div className="mt-4 space-y-2">
                            <div className="relative h-2 w-full overflow-hidden rounded-full bg-pink-100 shadow-inner">
                                <div
                                    className="absolute h-full bg-pink-500 transition-all duration-300 ease-in-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-pink-700">
                                <span className="font-medium">
                                    Étape {step} sur {totalSteps}
                                </span>
                                <span className="font-medium">{Math.round(progress)}% complété</span>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Messages d'erreur globaux */}
                    {Object.keys(errors).length > 0 && (
                        <div className="px-6 pt-4">
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>Veuillez corriger les erreurs dans le formulaire.</AlertDescription>
                            </Alert>
                        </div>
                    )}

                    {/* Contenu scrollable */}
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                        <form onSubmit={handleSubmit}>
                            <div className="min-h-[400px]">{renderStep()}</div>

                            {/* Boutons de navigation */}
                            <div className="mt-8 flex items-center justify-between border-t border-pink-100 pt-6">
                                {step > 1 ? (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handlePrevious}
                                        disabled={processing}
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
                                    disabled={processing || !isStepValid()}
                                    className="rounded-xl bg-pink-600 text-white shadow hover:bg-pink-700"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {step < totalSteps ? 'Traitement...' : 'Création...'}
                                        </>
                                    ) : step < totalSteps ? (
                                        <>
                                            Suivant <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    ) : (
                                        'Créer la patiente'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
