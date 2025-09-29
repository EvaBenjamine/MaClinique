import { Head, Link } from "@inertiajs/react";

export default function Welcome() {
    return (
        <>
            <Head title="Bienvenue - École des Mamans" />
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50">
                {/* Formes géométriques décoratives en arrière-plan */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-pink-200 opacity-70 mix-blend-multiply blur-xl filter"></div>
                    <div
                        className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-rose-200 opacity-70 mix-blend-multiply blur-xl filter"
                        style={{ animationDelay: '2s' }}
                    ></div>
                    <div
                        className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-pink-100 opacity-50 mix-blend-multiply blur-xl filter"
                        style={{ animationDelay: '4s' }}
                    ></div>
                </div>

                {/* Navigation */}
                <nav className="relative z-20 bg-white/80 backdrop-blur-md shadow-sm">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex h-20 items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <img src="/logo.jpg" alt="Logo École des Mamans" className="h-12 w-auto rounded-lg shadow-md" />
                                <span className="hidden sm:block bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-xl font-bold text-transparent">
                                    École des Mamans
                                </span>
                            </div>

                            {/* Menu de navigation */}
                            <div className="hidden md:flex items-center space-x-8">
                                <a href="#accueil" className="text-gray-700 hover:text-pink-600 transition-colors">Accueil</a>
                                <a href="#services" className="text-gray-700 hover:text-pink-600 transition-colors">Services</a>
                                <a href="#apropos" className="text-gray-700 hover:text-pink-600 transition-colors">À Propos</a>
                                <a href="#contact" className="text-gray-700 hover:text-pink-600 transition-colors">Contact</a>
                            </div>

                            {/* Boutons d'authentification */}
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-pink-600 hover:text-pink-700 font-medium transition-colors"
                                >
                                    Se connecter
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    S'inscrire
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Section Héro */}
                <section id="accueil" className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="grid min-h-[80vh] items-center gap-12 lg:grid-cols-2">
                        {/* Contenu textuel */}
                        <div className="space-y-8 text-center lg:text-left">
                            <div className="space-y-6">
                                <div className="inline-flex items-center px-4 py-2 bg-pink-100 rounded-full text-pink-700 text-sm font-medium mb-4">
                                    <span className="mr-2">🌟</span>
                                    Soins de qualité premium depuis 15 ans
                                </div>

                                <h1 className="text-4xl leading-tight font-bold text-gray-900 lg:text-6xl">
                                    Votre partenaire de confiance pour{' '}
                                    <span className="block bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent">
                                        une maternité épanouie
                                    </span>
                                </h1>

                                <p className="max-w-2xl text-xl text-gray-600 leading-relaxed">
                                    L'École des Mamans vous accompagne dans votre parcours de maternité avec des soins personnalisés,
                                    une équipe médicale experte et un environnement chaleureux et sécurisé.
                                </p>
                            </div>

                            {/* Boutons d'action */}
                            <div className="flex flex-col gap-4 sm:flex-row lg:justify-start">
                                <Link
                                    href="/register"
                                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
                                >
                                    <span className="mr-2">✨</span>
                                    Prendre rendez-vous
                                </Link>

                                <Link
                                    href="/login"
                                    className="group inline-flex transform items-center justify-center rounded-xl border-2 border-pink-300 bg-white px-8 py-4 font-semibold text-pink-600 shadow-lg transition-all duration-300 hover:scale-105 hover:border-pink-400 hover:bg-pink-50 hover:shadow-xl"
                                >
                                    <span className="mr-2">�‍⚕️</span>
                                    Espace professionnel
                                </Link>
                            </div>

                            {/* Statistiques améliorées */}
                            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-pink-100">
                                <div className="text-center group">
                                    <div className="text-3xl font-bold text-pink-600 group-hover:scale-110 transition-transform duration-300">2000+</div>
                                    <div className="text-sm text-gray-600 font-medium">Naissances accompagnées</div>
                                </div>
                                <div className="text-center group">
                                    <div className="text-3xl font-bold text-rose-600 group-hover:scale-110 transition-transform duration-300">15+</div>
                                    <div className="text-sm text-gray-600 font-medium">Années d'expertise</div>
                                </div>
                                <div className="text-center group">
                                    <div className="text-3xl font-bold text-pink-600 group-hover:scale-110 transition-transform duration-300">24/7</div>
                                    <div className="text-sm text-gray-600 font-medium">Disponibilité urgences</div>
                                </div>
                            </div>
                        </div>

                        {/* Image/illustration améliorée */}
                        <div className="relative">
                            <div className="bg-opacity-80 relative z-10 rounded-3xl bg-white p-8 shadow-2xl backdrop-blur-sm">
                                <img
                                    src="https://i.pinimg.com/736x/eb/c8/25/ebc8259fca6ba32682286f359acb96f0.jpg"
                                    alt="École des Mamans - Clinique d'accouchement moderne"
                                    className="h-96 w-full rounded-2xl object-cover"
                                />
                                <div className="absolute -top-4 -right-4 animate-bounce rounded-full bg-pink-500 p-3 text-white shadow-lg">💕</div>
                                <div className="absolute -bottom-4 -left-4 animate-pulse rounded-full bg-rose-500 p-3 text-white shadow-lg">👶</div>
                            </div>

                            {/* Carte flottante améliorée */}
                            <div className="absolute -right-6 -bottom-6 rotate-3 transform rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white shadow-xl transition-transform duration-300 hover:rotate-0 hover:scale-105">
                                <div className="mb-2 text-2xl">🌸</div>
                                <div className="font-semibold">École des Mamans</div>
                                <div className="text-sm opacity-90">Votre partenaire maternité</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section Services */}
                <section id="services" className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">Nos Services</h2>
                        <p className="mx-auto max-w-2xl text-xl text-gray-600">
                            Un accompagnement complet et personnalisé pour chaque étape de votre parcours
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="group rounded-3xl border border-pink-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-3xl">🏥</div>
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Suivi Prénatal</h3>
                            <p className="text-gray-600 mb-4">
                                Consultations régulières, échographies 3D/4D, et surveillance personnalisée pour une grossesse sereine.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Échographies haute définition</li>
                                <li>• Consultations spécialisées</li>
                                <li>• Dépistage prénatal</li>
                            </ul>
                        </div>

                        <div className="group rounded-3xl border border-rose-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-3xl">👶</div>
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Accouchement</h3>
                            <p className="text-gray-600 mb-4">
                                Bloc obstétrical moderne avec équipe médicale 24h/24 pour un accouchement en toute sécurité.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Salles de naissance modernes</li>
                                <li>• Péridurale sur demande</li>
                                <li>• Équipe spécialisée permanente</li>
                            </ul>
                        </div>

                        <div className="group rounded-3xl border border-pink-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-3xl">👩‍🏫</div>
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">École des Mamans</h3>
                            <p className="text-gray-600 mb-4">
                                Cours de préparation à l'accouchement et ateliers de parentalité pour vous préparer sereinement.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Préparation à l'accouchement</li>
                                <li>• Ateliers allaitement</li>
                                <li>• Yoga prénatal</li>
                            </ul>
                        </div>

                        <div className="group rounded-3xl border border-rose-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-3xl">🤱</div>
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Suites de Couches</h3>
                            <p className="text-gray-600 mb-4">
                                Chambres individuelles confortables avec accompagnement post-natal personnalisé.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Chambres tout confort</li>
                                <li>• Soutien à l'allaitement</li>
                                <li>• Suivi médical quotidien</li>
                            </ul>
                        </div>

                        <div className="group rounded-3xl border border-pink-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-3xl">💻</div>
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Plateforme Digitale</h3>
                            <p className="text-gray-600 mb-4">
                                Gestion moderne des rendez-vous, suivi personnalisé et accès à votre dossier médical.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Prise de RDV en ligne</li>
                                <li>• Dossier médical digital</li>
                                <li>• Communications sécurisées</li>
                            </ul>
                        </div>

                        <div className="group rounded-3xl border border-rose-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-3xl">🚨</div>
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Urgences 24/7</h3>
                            <p className="text-gray-600 mb-4">
                                Service d'urgences obstétricales disponible 24h/24 pour votre tranquillité d'esprit.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Équipe d'urgence permanente</li>
                                <li>• Bloc opératoire immédiat</li>
                                <li>• Réanimation néonatale</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Section À Propos */}
                <section id="apropos" className="relative z-10 bg-gradient-to-r from-pink-50 to-rose-50 py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid gap-16 lg:grid-cols-2 items-center">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="mb-6 text-4xl font-bold text-gray-900">
                                        Notre Mission
                                    </h2>
                                    <p className="text-xl text-gray-600 leading-relaxed mb-6">
                                        Depuis plus de 15 ans, l'École des Mamans accompagne les femmes dans leur parcours
                                        de maternité avec professionnalisme, bienveillance et modernité.
                                    </p>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        Notre équipe pluridisciplinaire de sages-femmes, gynécologues et pédiatres
                                        vous offre un suivi personnalisé dans un cadre chaleureux et sécurisé.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                                        <div className="text-2xl font-bold text-pink-600">98%</div>
                                        <div className="text-sm text-gray-600">Satisfaction patientes</div>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                                        <div className="text-2xl font-bold text-rose-600">45</div>
                                        <div className="text-sm text-gray-600">Professionnels experts</div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="Équipe médicale de l'École des Mamans"
                                    className="rounded-3xl shadow-2xl w-full h-96 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent rounded-3xl"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section Témoignages */}
                <section className="relative z-10 py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-gray-900">Témoignages</h2>
                            <p className="mx-auto max-w-2xl text-xl text-gray-600">
                                L'avis de nos mamans nous tient à cœur
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="rounded-3xl bg-white p-8 shadow-lg border border-pink-100">
                                <div className="mb-4 flex text-yellow-400">
                                    ⭐⭐⭐⭐⭐
                                </div>
                                <p className="mb-6 text-gray-600 italic">
                                    "Une équipe exceptionnelle qui m'a accompagnée avec tant de professionnalisme
                                    et de douceur. Mon accouchement s'est merveilleusement bien passé."
                                </p>
                                <div className="flex items-center">
                                    <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-lg mr-4">
                                        S
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Sarah M.</div>
                                        <div className="text-sm text-gray-500">Maman de Léa</div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl bg-white p-8 shadow-lg border border-rose-100">
                                <div className="mb-4 flex text-yellow-400">
                                    ⭐⭐⭐⭐⭐
                                </div>
                                <p className="mb-6 text-gray-600 italic">
                                    "L'École des Mamans, c'est bien plus qu'une clinique. C'est une famille qui
                                    vous accompagne dans les plus beaux moments de votre vie."
                                </p>
                                <div className="flex items-center">
                                    <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-lg mr-4">
                                        M
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Marie L.</div>
                                        <div className="text-sm text-gray-500">Maman de jumeaux</div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl bg-white p-8 shadow-lg border border-pink-100">
                                <div className="mb-4 flex text-yellow-400">
                                    ⭐⭐⭐⭐⭐
                                </div>
                                <p className="mb-6 text-gray-600 italic">
                                    "Installations modernes, équipe bienveillante et suivi personnalisé.
                                    Je recommande vivement cette clinique à toutes les futures mamans."
                                </p>
                                <div className="flex items-center">
                                    <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-lg mr-4">
                                        A
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Amélie R.</div>
                                        <div className="text-sm text-gray-500">Maman de Tom</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>




                {/* Footer */}
                <footer className="relative z-10 bg-gradient-to-b from-white to-pink-50 py-16">
                    {/* Fond décoratif subtil */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-pink-200/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-rose-200/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid gap-12 md:grid-cols-4">
                            <div className="md:col-span-2">
                                <div className="flex items-center space-x-3 mb-6">
                                    <img src="/logo.jpg" alt="Logo École des Mamans" className="h-14 w-auto rounded-xl shadow-md" />
                                    <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">École des Mamans</span>
                                </div>
                                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                    Votre partenaire de confiance pour une maternité épanouie depuis plus de 15 ans.
                                    Nous accompagnons chaque famille avec expertise, bienveillance et modernité.
                                </p>
                                {/* <div className="flex space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center cursor-pointer hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-110 shadow-lg text-white">
                                        📘
                                    </div>
                                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center cursor-pointer hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-110 shadow-lg text-white">
                                        📷
                                    </div>
                                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center cursor-pointer hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-110 shadow-lg text-white">
                                        🐦
                                    </div>
                                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center cursor-pointer hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-110 shadow-lg text-white">
                                        �
                                    </div>
                                </div> */}
                            </div>

                            <div>
                                <h4 className="mb-6 font-bold text-xl text-gray-900">Nos Services</h4>
                                <ul className="space-y-3">
                                    <li><a href="#services" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center group">
                                        <span className="mr-2 group-hover:scale-110 transition-transform">🤱</span> Suivi Prénatal
                                    </a></li>
                                    <li><a href="#services" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center group">
                                        <span className="mr-2 group-hover:scale-110 transition-transform">👶</span> Accouchement
                                    </a></li>
                                    <li><a href="#services" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center group">
                                        <span className="mr-2 group-hover:scale-110 transition-transform">👩‍🏫</span> École des Mamans
                                    </a></li>
                                    <li><a href="#services" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center group">
                                        <span className="mr-2 group-hover:scale-110 transition-transform">🚨</span> Urgences 24/7
                                    </a></li>
                                    <li><a href="#services" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center group">
                                        <span className="mr-2 group-hover:scale-110 transition-transform">🤝</span> Suites de Couches
                                    </a></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="mb-6 font-bold text-xl text-gray-900">Contact</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start space-x-3">
                                        <span className="text-pink-500 mt-1">📞</span>
                                        <div>
                                            <div className="text-gray-800 font-medium">+33 1 23 45 67 89</div>
                                            <div className="text-sm text-gray-500">24h/24 pour urgences</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className="text-pink-500 mt-1">✉️</span>
                                        <div>
                                            <div className="text-gray-800 font-medium">contact@ecole-des-mamans.fr</div>
                                            <div className="text-sm text-gray-500">Réponse sous 24h</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className="text-pink-500 mt-1">📍</span>
                                        <div>
                                            <div className="text-gray-800 font-medium">123 Avenue de la Maternité</div>
                                            <div className="text-sm text-gray-500">75000 Paris</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <span className="text-pink-500 mt-1">🕒</span>
                                        <div>
                                            <div className="text-gray-800 font-medium">Lun-Ven: 8h-19h</div>
                                            <div className="text-sm text-gray-500">Sam: 9h-17h</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Séparateur décoratif */}
                        <div className="mt-16 pt-8 border-t border-pink-200">
                            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                                <div className="text-gray-600 text-center md:text-left">
                                    <p>&copy; 2025 École des Mamans. Tous droits réservés.</p>
                                    <p className="text-sm text-gray-500 mt-1">Établissement de santé privé</p>
                                </div>

                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                    <a href="#" className="hover:text-pink-600 transition-colors">Mentions légales</a>
                                    <a href="#" className="hover:text-pink-600 transition-colors">Confidentialité</a>
                                    <a href="#" className="hover:text-pink-600 transition-colors">CGU</a>
                                </div>
                            </div>

                            {/* Message de fin chaleureux */}
                            <div className="mt-8 text-center p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-3xl border border-pink-100">
                                <p className="text-gray-700 italic">
                                    <span className="text-pink-500 text-xl mr-2">💕</span>
                                    "Chaque naissance est un miracle que nous avons l'honneur d'accompagner"
                                    <span className="text-pink-500 text-xl ml-2">💕</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
                {/* Styles CSS améliorés */}
                <style>{`
                    @keyframes float {
                        0%, 100% {
                            transform: translateY(0px) rotate(0deg);
                        }
                        50% {
                            transform: translateY(-20px) rotate(5deg);
                        }
                    }

                    @keyframes float-reverse {
                        0%, 100% {
                            transform: translateY(0px) rotate(0deg);
                        }
                        50% {
                            transform: translateY(-15px) rotate(-5deg);
                        }
                    }

                    .animate-float {
                        animation: float 6s ease-in-out infinite;
                    }

                    .animate-float-reverse {
                        animation: float-reverse 8s ease-in-out infinite;
                    }

                    /* Smooth scroll pour les ancres */
                    html {
                        scroll-behavior: smooth;
                    }

                    /* Animations d'entrée */
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .animate-fade-in-up {
                        animation: fadeInUp 0.6s ease-out;
                    }
                `}</style>
            </div>
        </>
    );
}
