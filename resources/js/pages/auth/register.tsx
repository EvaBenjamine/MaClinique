import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

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
    );
}
