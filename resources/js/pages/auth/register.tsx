import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
<<<<<<< HEAD
=======
import AuthLayout from '@/layouts/auth-layout';
>>>>>>> d9e71852033695463b9b433b79ff468dd4e4a1ca

type RegisterForm = {
    nom: string;
    prenom: string;
    telephone: string;
    adresse: string;
    role: string;
    matricule: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        nom: '',
        prenom: '',
        telephone: '',
        adresse: '',
        role: '',
        matricule: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRole = e.target.value;
        setData('role', selectedRole);
        if (selectedRole === 'patiente') {
            setData('matricule', '');
            document.getElementById('matricule')?.setAttribute('disabled', 'true');
        } else {
            document.getElementById('matricule')?.removeAttribute('disabled');
        }
    };

    return (
<<<<<<< HEAD
        <>
            <Head title="Créer un compte" />
            <div className="flex min-h-screen w-full bg-gray-50 items-center justify-center py-12 px-4">
                <div className="flex w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">

                    {/* Image à gauche */}
                    <div className="hidden lg:flex w-1/2 relative">
                        <img
                            src="https://i.pinimg.com/736x/eb/c8/25/ebc8259fca6ba32682286f359acb96f0.jpg"
                            alt="Inscription"
                            className="object-cover w-full h-full object-top"
                            style={{ objectPosition: 'center 25%' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-600/30 to-pink-600/10"></div>
                    </div>

                    {/* Formulaire à droite */}
                    <div className="flex flex-col w-full lg:w-1/2 p-8 sm:p-10 md:p-12 justify-center">
                        <div className="flex flex-col items-center mb-8">
                            <img src="/logo.jpg" alt="Logo" className="h-14 mb-4" />
                            <h1 className="text-2xl font-bold text-pink-600 mb-1">Créer un compte</h1>
                            <p className="text-sm text-gray-500">Remplissez les informations ci-dessous</p>
                        </div>

                        <form onSubmit={submit} className="grid gap-3 text-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {['nom', 'prenom'].map((field) => (
                                    <div key={field}>
                                        <Label htmlFor={field} className="text-pink-600 capitalize">{field}</Label>
                                        <Input
                                            id={field}
                                            type="text"
                                            required
                                            value={data[field as keyof RegisterForm]}
                                            onChange={(e) => setData(field as keyof RegisterForm, e.target.value)}
                                            className="h-9"
                                        />
                                        <InputError message={errors[field as keyof RegisterForm]} />
                                    </div>
                                ))}
                            </div>

                            {['telephone', 'adresse'].map((field) => (
                                <div key={field}>
                                    <Label htmlFor={field} className="text-pink-600 capitalize">{field}</Label>
                                    <Input
                                        id={field}
                                        type="text"
                                        required
                                        value={data[field as keyof RegisterForm]}
                                        onChange={(e) => setData(field as keyof RegisterForm, e.target.value)}
                                        className="h-9"
                                    />
                                    <InputError message={errors[field as keyof RegisterForm]} />
                                </div>
                            ))}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="role" className="text-pink-600">Rôle</Label>
                                    <select
                                        id="role"
                                        required
                                        value={data.role}
                                        onChange={handleRoleChange}
                                        disabled={processing}
                                        className="block w-full h-9 px-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                                    >
                                        <option value="">Sélectionnez un rôle</option>
                                        <option value="admin">Admin</option>
                                        <option value="sage femme">Sage femme</option>
                                        <option value="secretaire">Secrétaire</option>
                                        <option value="patiente">Patiente</option>
                                    </select>
                                    <InputError message={errors.role} />
                                </div>

                                <div>
                                    <Label htmlFor="matricule" className="text-pink-600">Matricule</Label>
                                    <Input
                                        id="matricule"
                                        type="text"
                                        value={data.matricule}
                                        onChange={(e) => setData('matricule', e.target.value)}
                                        disabled={data.role === 'patiente' || processing}
                                        className="h-9"
                                    />
                                    <InputError message={errors.matricule} />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="email" className="text-pink-600">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    autoComplete="email"
                                    className="h-9"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="password" className="text-pink-600">Mot de passe</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="h-9"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div>
                                    <Label htmlFor="password_confirmation" className="text-pink-600">Confirmation</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="h-9"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 bg-pink-600 hover:bg-pink-700 text-white h-10 w-full transition-colors"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2 inline-block" />}
                                Créer le compte
                            </Button>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-500">
                            Vous avez déjà un compte ?{' '}
                            <TextLink href={route('login')} className="text-pink-600 hover:text-pink-700 font-medium">
                                Connectez-vous
                            </TextLink>
                        </p>
                    </div>
                </div>
            </div>
        </>
=======
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="nom">Nom</Label>
                        <Input
                            id="nom"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="given-name"
                            value={data.nom}
                            onChange={(e) => setData('nom', e.target.value)}
                            disabled={processing}
                            placeholder="Nom"
                        />
                        <InputError message={errors.nom} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="prenom">Prénom</Label>
                        <Input
                            id="prenom"
                            type="text"
                            required
                            tabIndex={2}
                            autoComplete="family-name"
                            value={data.prenom}
                            onChange={(e) => setData('prenom', e.target.value)}
                            disabled={processing}
                            placeholder="Prénom"
                        />
                        <InputError message={errors.prenom} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="telephone">Téléphone</Label>
                        <Input
                            id="telephone"
                            type="text"
                            required
                            tabIndex={3}
                            autoComplete="tel"
                            value={data.telephone}
                            onChange={(e) => setData('telephone', e.target.value)}
                            disabled={processing}
                            placeholder="Numéro de téléphone"
                        />
                        <InputError message={errors.telephone} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="adresse">Adresse</Label>
                        <Input
                            id="adresse"
                            type="text"
                            required
                            tabIndex={4}
                            autoComplete="address-line1"
                            value={data.adresse}
                            onChange={(e) => setData('adresse', e.target.value)}
                            disabled={processing}
                            placeholder="Adresse"
                        />
                        <InputError message={errors.adresse} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="role">Rôle</Label>
                        <select id="role" required tabIndex={5} value={data.role} onChange={handleRoleChange} disabled={processing}>
                            <option value="">Sélectionnez un rôle</option>
                            <option value="admin">Admin</option>
                            <option value="sage femme">Sage femme</option>
                            <option value="secretaire">Secrétaire</option>
                            <option value="patiente">Patiente</option>
                        </select>
                        <InputError message={errors.role} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="matricule">Matricule</Label>
                        <Input
                            id="matricule"
                            type="text"
                            required
                            tabIndex={6}
                            autoComplete="off"
                            value={data.matricule}
                            onChange={(e) => setData('matricule', e.target.value)}
                            disabled={data.role === 'patiente' || processing}
                            placeholder="Matricule"
                        />
                        <InputError message={errors.matricule} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={7}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={8}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={9}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={10} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create account
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={11}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
>>>>>>> d9e71852033695463b9b433b79ff468dd4e4a1ca
    );
}
