import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

interface FormData {
    // Ajout de la signature d'index pour satisfaire FormDataType
    [key: string]: string | number | boolean;

    // Informations personnelles
    nom: string;
    prenom: string;
    email: string;
    password: string;
    password_confirmation: string;
    age: number | string;
    profession: string;
    situation_matrimoniale: string;
    groupe_sanguin: string;
    numero_telephone: string;
    numero_urgence: string;
    adresse: string;

    // Informations grossesse
    date_derniere_regle: string;
    date_accouchement_prevue: string;
    grossesse_multiple: boolean;
    nombre_foetus: number | string;
    grossesse_a_risque: boolean;
    facteurs_risque: string;

    // Antécédents obstétricaux
    nombre_grossesses_anterieures: number | string;
    nombre_accouchements: number | string;
    nombre_avortements: number | string;
    nombre_enfants_vivants: number | string;

    // Antécédents médicaux
    antecedents_medicaux: string;
    antecedents_chirurgicaux: string;
    antecedents_familiaux: string;
    antecedents_gynecologiques: string;
    antecedents_obstetricaux: string;
    allergies: string;
    traitements_en_cours: string;
    maladies_chroniques: string;

    // Mode de vie
    tabac: boolean;
    alcool: boolean;
    activite_physique: string;
    regime_alimentaire: string;

    // Suivi médical
    sage_femme_id: string;
    statut_dossier: string;
    notes_importantes: string;
    recommandations_particulieres: string;
}

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
        requiredFields: ['nom', 'prenom', 'email', 'password', 'password_confirmation', 'age'],
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
        requiredFields: [],
    },
];

export default function AddPatienteModal({ isOpen, onClose, sagesFemmes, onComplete }: Props) {
    const [step, setStep] = useState<number>(1);
    const [totalSteps] = useState<number>(steps.length);

    // Formulaire Inertia pour la soumission des données
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
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
        numero_urgence: '',
        adresse: '',

        // Informations grossesse
        date_derniere_regle: '',
        date_accouchement_prevue: '',
        grossesse_multiple: false,
        nombre_foetus: 1,
        grossesse_a_risque: false,
        facteurs_risque: '',

        // Antécédents obstétricaux
        nombre_grossesses_anterieures: 0,
        nombre_accouchements: 0,
        nombre_avortements: 0,
        nombre_enfants_vivants: 0,

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
        tabac: false,
        alcool: false,
        activite_physique: '',
        regime_alimentaire: '',

        // Suivi médical
        sage_femme_id: '',
        statut_dossier: 'Actif',
        notes_importantes: '',
        recommandations_particulieres: '',
    });

    // Gérer la soumission du formulaire
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (step < totalSteps) {
            // Passer à l'étape suivante si le formulaire est valide
            if (isStepValid()) {
                setStep(step + 1);
            }
        } else {
            // Soumettre le formulaire
            const cleanedData = {
                ...data,
                age: Number(data.age),
                nombre_foetus: Number(data.nombre_foetus),
                nombre_grossesses_anterieures: Number(data.nombre_grossesses_anterieures),
                nombre_accouchements: Number(data.nombre_accouchements),
                nombre_avortements: Number(data.nombre_avortements),
                nombre_enfants_vivants: Number(data.nombre_enfants_vivants),
                // Convertir les booléens en valeurs appropriées pour Laravel
                grossesse_multiple: data.grossesse_multiple ? 1 : 0,
                grossesse_a_risque: data.grossesse_a_risque ? 1 : 0,
                tabac: data.tabac ? 1 : 0,
                alcool: data.alcool ? 1 : 0,
            };

            post(route('patientes.store'), {
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
                return Boolean(
                    data.nom &&
                        data.prenom &&
                        data.email &&
                        data.age &&
                        data.password === data.password_confirmation &&
                        !errors.nom &&
                        !errors.prenom &&
                        !errors.email &&
                        !errors.password &&
                        !errors.password_confirmation &&
                        !errors.age,
                );
            case 'contact':
                return Boolean(data.numero_telephone && !errors.numero_telephone);
            case 'pregnancy':
            case 'obstetrical':
            case 'medical':
            case 'lifestyle':
            case 'followup':
                return true;
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
                                <Label className="text-pink-800" htmlFor="prenom">
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
                                <Label className="text-pink-800" htmlFor="nom">
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
                            <Label className="text-pink-800" htmlFor="email">
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

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="age">
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
                                <Label className="text-pink-800" htmlFor="groupe_sanguin">
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
                                <Label className="text-pink-800" htmlFor="situation_matrimoniale">
                                    Situation matrimoniale
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
                            <Label className="text-pink-800" htmlFor="profession">
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
                                <Label className="text-pink-800" htmlFor="numero_urgence">
                                    Numéro d'urgence
                                </Label>
                                <Input
                                    id="numero_urgence"
                                    value={data.numero_urgence}
                                    onChange={(e) => setData('numero_urgence', e.target.value)}
                                    placeholder="+33 1 23 45 67 89"
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-pink-800" htmlFor="adresse">
                                Adresse complète
                            </Label>
                            <Textarea
                                id="adresse"
                                value={data.adresse}
                                onChange={(e) => setData('adresse', e.target.value)}
                                rows={3}
                                placeholder="123 Rue de la Paix, 75001 Paris, France"
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
                                    Date d'accouchement prévue
                                </Label>
                                <Input
                                    id="date_accouchement_prevue"
                                    type="date"
                                    value={data.date_accouchement_prevue}
                                    onChange={(e) => setData('date_accouchement_prevue', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="grossesse_multiple"
                                    checked={data.grossesse_multiple}
                                    onCheckedChange={(checked) => {
                                        setData('grossesse_multiple', checked as boolean);
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
                                        onChange={(e) => setData('nombre_foetus', e.target.value)}
                                        className="w-20 rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="grossesse_a_risque"
                                checked={data.grossesse_a_risque}
                                onCheckedChange={(checked) => setData('grossesse_a_risque', checked as boolean)}
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
                        <h2 className="text-lg font-semibold text-pink-700">Antécédents obstétricaux</h2>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="nombre_grossesses_anterieures">
                                    Grossesses antérieures
                                </Label>
                                <Input
                                    id="nombre_grossesses_anterieures"
                                    type="number"
                                    min="0"
                                    value={data.nombre_grossesses_anterieures}
                                    onChange={(e) => setData('nombre_grossesses_anterieures', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="nombre_accouchements">
                                    Accouchements
                                </Label>
                                <Input
                                    id="nombre_accouchements"
                                    type="number"
                                    min="0"
                                    value={data.nombre_accouchements}
                                    onChange={(e) => setData('nombre_accouchements', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="nombre_avortements">
                                    Avortements
                                </Label>
                                <Input
                                    id="nombre_avortements"
                                    type="number"
                                    min="0"
                                    value={data.nombre_avortements}
                                    onChange={(e) => setData('nombre_avortements', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-pink-800" htmlFor="nombre_enfants_vivants">
                                    Enfants vivants
                                </Label>
                                <Input
                                    id="nombre_enfants_vivants"
                                    type="number"
                                    min="0"
                                    value={data.nombre_enfants_vivants}
                                    onChange={(e) => setData('nombre_enfants_vivants', e.target.value)}
                                    className="rounded-xl border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-pink-800" htmlFor="antecedents_obstetricaux">
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
                            <Label className="text-pink-800" htmlFor="antecedents_gynecologiques">
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
                                <Checkbox id="tabac" checked={data.tabac} onCheckedChange={(checked) => setData('tabac', checked as boolean)} />
                                <Label htmlFor="tabac" className="text-pink-800">
                                    Consommation de tabac
                                </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="alcool" checked={data.alcool} onCheckedChange={(checked) => setData('alcool', checked as boolean)} />
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
                                Sage-femme assignée
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
            <DialogContent className="max-h-[95vh] max-w-5xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-pink-600">Ajouter une nouvelle patiente</DialogTitle>
                </DialogHeader>

                {/* Messages d'erreur globaux */}
                {Object.keys(errors).length > 0 && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>Veuillez corriger les erreurs dans le formulaire.</AlertDescription>
                    </Alert>
                )}

                <div className="space-y-6">
                    {/* Barre de progression simple */}
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-pink-100 shadow-inner">
                        <div className="absolute h-full bg-pink-500 transition-all duration-300 ease-in-out" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex justify-between text-sm text-pink-700">
                        <span>
                            Étape {step} sur {totalSteps}
                        </span>
                        <span>{Math.round(progress)}% complété</span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Card className="rounded-2xl border-0 bg-white p-6 shadow-xl">
                            {renderStep()}

                            <div className="mt-6 flex justify-between">
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
                        </Card>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
