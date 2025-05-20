import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { User, UserDetails } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Label as FormLabel } from './ui/label';

interface UserMultiStepFormProps {
    userType: string | null;
    userData?: User | null;
    userDetails?: UserDetails | null;
    isEditing?: boolean;
    isCreating?: boolean;
    onComplete: () => void;
}

interface FormData {
    [key: string]: string | number;
    id: number | string;
    nom: string;
    prenom: string;
    email: string;
    role: string;
    //password: string;
    //password_confirmation: string;

    // Données spécifiques pour sage-femme et secrétaire
    matricule: string;
    grade: string;
    specialite: string;

    // Données communes
    numero_telephone: string;
    numero_urgence: string;
    adresse: string;
}

export default function UserMultiStepForm({
    userType,
    userData = null,
    userDetails = null,
    isEditing = false,
    isCreating = false,
    onComplete,
}: UserMultiStepFormProps) {
    const [step, setStep] = useState<number>(1);
    const [totalSteps, setTotalSteps] = useState<number>(4);

    // Formulaire Inertia pour la soumission des données
    const { data, setData, post, put, processing, errors } = useForm<FormData>({
        // Données de base de l'utilisateur
        id: userData?.id || '',
        nom: userData?.nom || '',
        prenom: userData?.prenom || '',
        email: userData?.email || '',
        role: userType || '',
        password: '',
        password_confirmation: '',

        // Données spécifiques pour sage-femme et secrétaire
        matricule: userDetails?.matricule || '',
        grade: userDetails?.grade || '',
        specialite: userDetails?.specialite || '',

        // Données communes
        numero_telephone: userDetails?.numero_telephone || '',
        numero_urgence: userDetails?.numero_urgence || '',
        adresse: userDetails?.adresse || '',
    });

    // Déterminer le nombre total d'étapes en fonction du type d'utilisateur et du mode (création/édition)
    useEffect(() => {
        if (isEditing) {
            // En mode édition, pas d'étape mot de passe
            setTotalSteps(data.role === 'patiente' ? 3 : 3);
        } else {
            // En mode création
            setTotalSteps(data.role === 'patiente' ? 4 : 4);
        }
    }, [data.role, isEditing]);

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
            if (isEditing && userData) {
                put(route('users.update', userData.id), {
                    onSuccess: () => {
                        onComplete();
                    },
                });
            } else {
                if (data.role === 'admin') {
                    post(route('admins.store'), {
                        onSuccess: () => {
                            onComplete();
                        },
                    });
                } else if (data.role === 'sage_femme') {
                    post(route('sage-femmes.store'), {
                        onSuccess: () => {
                            onComplete();
                        },
                    });
                } else if (data.role === 'secretaire') {
                    post(route('secretaires.store'), {
                        onSuccess: () => {
                            onComplete();
                        },
                    });
                }
            }
        }
    };

    // Vérifier si l'étape actuelle est valide
    const isStepValid = (): boolean => {
        // Validation personnalisée pour chaque étape
        switch (step) {
            case 1: // Informations de base
                return Boolean(data.nom && data.prenom && data.email && !errors.nom && !errors.prenom && !errors.email);
            case 2: // Informations spécifiques au rôle
                if (data.role === 'patiente') {
                    return Boolean(data.age && data.numero_telephone && !errors.age && !errors.numero_telephone);
                } else if (data.role === 'sage_femme' || data.role === 'secretaire') {
                    return Boolean(data.matricule && data.grade && !errors.matricule && !errors.grade);
                }
                return true;
            case 3: // Adresse et informations supplémentaires
                return Boolean(data.adresse && !errors.adresse);
            case 4: // Mot de passe (uniquement en création)
                if (!isEditing) {
                    return true;
                }
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

    // Calculer le pourcentage de progression
    const progress = Math.min((step / totalSteps) * 100, 100);

    // Rendu de l'étape actuelle
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-pink-700">Informations de base</h2>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <FormLabel className="text-pink-800" htmlFor="prenom">
                                    Prénom
                                </FormLabel>
                                <Input
                                    id="prenom"
                                    value={data.prenom}
                                    onChange={(e) => setData('prenom', e.target.value)}
                                    placeholder="Prénom"
                                    className="rounded-xl border-pink-300 focus:ring-pink-500"
                                />
                                {errors.prenom && <p className="text-sm text-red-500">{errors.prenom}</p>}
                            </div>

                            <div className="space-y-2">
                                <FormLabel className="text-pink-800" htmlFor="nom">
                                    Nom
                                </FormLabel>
                                <Input
                                    id="nom"
                                    value={data.nom}
                                    onChange={(e) => setData('nom', e.target.value)}
                                    placeholder="Nom"
                                    className="rounded-xl border-pink-300 focus:ring-pink-500"
                                />
                                {errors.nom && <p className="text-sm text-red-500">{errors.nom}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <FormLabel className="text-pink-800" htmlFor="email">
                                Email
                            </FormLabel>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                                className="rounded-xl border-pink-300 focus:ring-pink-500"
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>

                        {isCreating && (
                            <div className="space-y-2">
                                <FormLabel className="text-pink-800" htmlFor="role">
                                    Rôle
                                </FormLabel>
                                <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                                    <SelectTrigger id="role" className="rounded-xl border-pink-300 focus:ring-pink-500">
                                        <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Administrateur</SelectItem>
                                        <SelectItem value="sage_femme">Sage-femme</SelectItem>
                                        <SelectItem value="secretaire">Secrétaire</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                            </div>
                        )}
                    </div>
                );

            case 2:
                if (data.role === 'sage_femme') {
                    return (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-pink-700">Informations de la sage-femme</h2>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <FormLabel className="text-pink-800" htmlFor="matricule">
                                        Matricule
                                    </FormLabel>
                                    <Input
                                        id="matricule"
                                        value={data.matricule}
                                        onChange={(e) => setData('matricule', e.target.value)}
                                        placeholder="Matricule"
                                        className="rounded-xl border-pink-300 focus:ring-pink-500"
                                    />
                                    {errors.matricule && <p className="text-sm text-red-500">{errors.matricule}</p>}
                                </div>

                                <div className="space-y-2">
                                    <FormLabel className="text-pink-800" htmlFor="grade">
                                        Grade
                                    </FormLabel>
                                    <Select value={data.grade} onValueChange={(value) => setData('grade', value)}>
                                        <SelectTrigger id="grade" className="rounded-xl border-pink-300 focus:ring-pink-500">
                                            <SelectValue placeholder="Sélectionner" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="chef_de_service">Chef de service</SelectItem>
                                            <SelectItem value="adjointe">Adjointe</SelectItem>
                                            <SelectItem value="consultante">Consultante</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.grade && <p className="text-sm text-red-500">{errors.grade}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <FormLabel className="text-pink-800" htmlFor="specialite">
                                    Spécialité
                                </FormLabel>
                                <Select value={data.specialite} onValueChange={(value) => setData('specialite', value)}>
                                    <SelectTrigger id="specialite" className="rounded-xl border-pink-300 focus:ring-pink-500">
                                        <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="obstétrique">Obstétrique</SelectItem>
                                        <SelectItem value="gynécologie">Gynécologie</SelectItem>
                                        <SelectItem value="néonatalogie">Néonatalogie</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.specialite && <p className="text-sm text-red-500">{errors.specialite}</p>}
                            </div>

                            <div className="space-y-2">
                                <FormLabel className="text-pink-800" htmlFor="numero_telephone">
                                    Numéro de téléphone
                                </FormLabel>
                                <Input
                                    id="numero_telephone"
                                    value={data.numero_telephone}
                                    onChange={(e) => setData('numero_telephone', e.target.value)}
                                    placeholder="Numéro de téléphone"
                                    className="rounded-xl border-pink-300 focus:ring-pink-500"
                                />
                                {errors.numero_telephone && <p className="text-sm text-red-500">{errors.numero_telephone}</p>}
                            </div>
                        </div>
                    );
                } else if (data.role === 'secretaire') {
                    return (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-pink-700">Informations de la secrétaire</h2>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <FormLabel className="text-pink-800" htmlFor="matricule">
                                        Matricule
                                    </FormLabel>
                                    <Input
                                        id="matricule"
                                        value={data.matricule}
                                        onChange={(e) => setData('matricule', e.target.value)}
                                        placeholder="Matricule"
                                        className="rounded-xl border-pink-300 focus:ring-pink-500"
                                    />
                                    {errors.matricule && <p className="text-sm text-red-500">{errors.matricule}</p>}
                                </div>

                                <div className="space-y-2">
                                    <FormLabel className="text-pink-800" htmlFor="grade">
                                        Grade
                                    </FormLabel>
                                    <Select value={data.grade} onValueChange={(value) => setData('grade', value)}>
                                        <SelectTrigger id="grade" className="rounded-xl border-pink-300 focus:ring-pink-500">
                                            <SelectValue placeholder="Sélectionner" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="chef_de_service">Chef de service</SelectItem>
                                            <SelectItem value="assistante">Assistante</SelectItem>
                                            <SelectItem value="principale">Principale</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.grade && <p className="text-sm text-red-500">{errors.grade}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <FormLabel className="text-pink-800" htmlFor="numero_telephone">
                                    Numéro de téléphone
                                </FormLabel>
                                <Input
                                    id="numero_telephone"
                                    value={data.numero_telephone}
                                    onChange={(e) => setData('numero_telephone', e.target.value)}
                                    placeholder="Numéro de téléphone"
                                    className="rounded-xl border-pink-300 focus:ring-pink-500"
                                />
                                {errors.numero_telephone && <p className="text-sm text-red-500">{errors.numero_telephone}</p>}
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-pink-700">Informations de l'administrateur</h2>
                            <p className="text-sm text-gray-600">Aucune information supplémentaire requise pour les administrateurs.</p>
                        </div>
                    );
                }

            case 3:
                return (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-pink-700">Adresse</h2>

                        <div className="space-y-2">
                            <FormLabel className="text-pink-800" htmlFor="adresse">
                                Adresse complète
                            </FormLabel>
                            <Input
                                id="adresse"
                                value={data.adresse}
                                onChange={(e) => setData('adresse', e.target.value)}
                                placeholder="Adresse"
                                className="rounded-xl border-pink-300 focus:ring-pink-500"
                            />
                            {errors.adresse && <p className="text-sm text-red-500">{errors.adresse}</p>}
                        </div>
                    </div>
                );

            case 4:
                if (!isEditing) {
                    return (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-pink-700">Mot de passe</h2>
                            <p className="text-sm text-gray-600">
                                Le mot de passe par defaut est <span className="font-bold">password</span>.Il sera généré automatiquement lors de la
                                création de l'utilisateur et ce sera à l'utilisateur de le modifier lors de sa première connexion.
                            </p>
                        </div>
                    );
                } else {
                    return (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-pink-700">Mot de passe</h2>
                            <p className="text-sm text-gray-600">
                                Le mot de passe par defaut est <span className="font-bold">password</span> sera utilise comme nouveau mot de passe.
                            </p>
                        </div>
                    );
                }

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Barre de progression */}
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
                            {step < totalSteps ? (
                                <>
                                    Suivant <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            ) : isEditing ? (
                                'Mettre à jour'
                            ) : (
                                "Créer l'utilisateur"
                            )}
                        </Button>
                    </div>
                </Card>
            </form>
        </div>
    );
}
