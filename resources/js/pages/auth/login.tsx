import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
        <>
            <Head title="Connexion" />

            <div className="flex min-h-screen items-center justify-center bg-pink-100 px-4">
                <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                    {/* Formulaire à gauche */}
                    <div className="w-full space-y-6 p-8 md:w-1/2">
                        {/* Logo */}
                        <div className="flex justify-center">
                            <img src="/logo.jpg" alt="Logo" className="mb-2 h-16 w-auto" />
                        </div>

                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-pink-700">Se connecter</h2>
                            <p className="text-sm text-pink-500">Entrez vos identifiants ci-dessous</p>
                        </div>

                        {status && <div className="text-center text-sm font-medium text-green-600">{status}</div>}

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="email" className="text-pink-600">
                                    Adresse email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="votre@email.com"
                                    className="border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-pink-600">
                                        Mot de passe
                                    </Label>
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
                                    className="border-pink-300 focus:border-pink-500 focus:ring-pink-500"
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
                                <Label htmlFor="remember" className="text-pink-600">
                                    Se souvenir de moi
                                </Label>
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
                    <div className="hidden w-1/2 md:block">
                        <img
                            src="https://i.pinimg.com/736x/45/59/05/455905b2771720daae2a46fb5259453a.jpg"
                            alt="Connexion visuelle"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
