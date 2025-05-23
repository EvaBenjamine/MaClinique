import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
<<<<<<< HEAD
=======
import AuthLayout from '@/layouts/auth-layout';
>>>>>>> d9e71852033695463b9b433b79ff468dd4e4a1ca

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
<<<<<<< HEAD
        <>
            <Head title="Connexion" />

            <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
                <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">

                    {/* Formulaire à gauche */}
                    <div className="w-full md:w-1/2 p-8 space-y-6">
                        {/* Logo */}
                        <div className="flex justify-center">
                            <img src="/logo.jpg" alt="Logo" className="h-16 w-auto mb-2" />
                        </div>

                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-pink-700">Se connecter</h2>
                            <p className="text-sm text-pink-500">Entrez vos identifiants ci-dessous</p>
                        </div>

                        {status && (
                            <div className="text-center text-sm font-medium text-green-600">{status}</div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="email" className="text-pink-600">Adresse email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="votre@email.com"
                                    className="border-pink-300 focus:ring-pink-500 focus:border-pink-500"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password" className="text-pink-600">Mot de passe</Label>
                                    {canResetPassword && (
                                        <TextLink href={route('password.request')} className="text-sm text-pink-600 hover:text-pink-500">
                                            Mot de passe oublié ?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="border-pink-300 focus:ring-pink-500 focus:border-pink-500"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onClick={() => setData('remember', !data.remember)}
                                    className="accent-pink-500"
                                />
                                <Label htmlFor="remember" className="text-pink-600">Se souvenir de moi</Label>
                            </div>

                            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-500" disabled={processing}>
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Se connecter
                            </Button>
                        </form>

                        <div className="text-center text-sm text-pink-500">
                            Pas encore de compte ?{' '}
                            <TextLink href={route('register')} className="text-pink-600 hover:underline">
                                S'inscrire
                            </TextLink>
                        </div>
                    </div>

                    {/* Image décorative à droite */}
                    <div className="hidden md:block w-1/2">
                        <img
                            src="https://i.pinimg.com/736x/45/59/05/455905b2771720daae2a46fb5259453a.jpg"
                            alt="Connexion visuelle"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </>
=======
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Log in" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Log in
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Don't have an account?{' '}
                    <TextLink href={route('register')} tabIndex={5}>
                        Sign up
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
>>>>>>> d9e71852033695463b9b433b79ff468dd4e4a1ca
    );
}
