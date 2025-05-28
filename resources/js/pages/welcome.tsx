export default function Welcome() {
    return (
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
            {/* Éléments flottants avec animation */}
            <div className="pointer-events-none absolute inset-0 z-5">
                {/* Cœurs flottants */}
                <div className="animate-float absolute top-20 left-1/4 text-2xl text-pink-300" style={{ animationDelay: '0s' }}>
                    💖
                </div>
                <div className="animate-float-reverse absolute top-40 right-1/3 text-xl text-rose-300" style={{ animationDelay: '1s' }}>
                    💕
                </div>
                <div className="animate-float absolute bottom-1/3 left-16 text-3xl text-pink-400" style={{ animationDelay: '2s' }}>
                    💗
                </div>
                <div className="animate-float-reverse absolute top-1/3 right-20 text-xl text-rose-300" style={{ animationDelay: '0.5s' }}>
                    💖
                </div>

                {/* Bébés et accessoires */}
                <div className="animate-float absolute top-60 left-1/3 text-2xl text-pink-300" style={{ animationDelay: '1.5s' }}>
                    👶
                </div>
                <div className="animate-float-reverse absolute right-1/4 bottom-40 text-xl text-rose-300" style={{ animationDelay: '3s' }}>
                    🍼
                </div>
                <div className="animate-float absolute top-1/4 left-12 text-xl text-pink-400" style={{ animationDelay: '0.8s' }}>
                    👶
                </div>
                <div className="animate-float-reverse absolute bottom-20 left-1/2 text-2xl text-rose-300" style={{ animationDelay: '2.5s' }}>
                    🌸
                </div>
            </div>
            {/* Navigation */}
            <nav className="relative z-20 p-6">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img src="/logo.jpg" alt="Logo" className="h-12 w-auto rounded-lg shadow-md" />
                        <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-xl font-bold text-transparent">
                            Ecole des mamans
                        </span>
                    </div>
                    <div className="hidden items-center space-x-6 md:flex">
                        <a href="#services" className="font-medium text-gray-700 transition-colors hover:text-pink-600">
                            Services
                        </a>
                        <a href="#about" className="font-medium text-gray-700 transition-colors hover:text-pink-600">
                            À propos
                        </a>
                        <a href="#contact" className="font-medium text-gray-700 transition-colors hover:text-pink-600">
                            Contact
                        </a>
                    </div>
                </div>
            </nav>

            {/* Contenu principal */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="grid min-h-[80vh] items-center gap-12 lg:grid-cols-2">
                    {/* Contenu textuel */}
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="space-y-4">
                            {/* <div className="inline-flex items-center px-4 py-2 bg-pink-100 rounded-full text-pink-700 text-sm font-medium mb-4">
                                <span className="mr-2">🌟</span>
                                Soins de qualité premium
                            </div> */}
                            <h1 className="text-4xl leading-tight font-bold text-gray-900 lg:text-6xl">
                                Bienvenue dans votre
                                <span className="block bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent">
                                    Ecole des mamans
                                </span>
                            </h1>
                            <p className="max-w-2xl text-xl text-gray-600">
                                Une plateforme moderne et sécurisée pour la gestion de vos patientes. Nous accompagnons les futures mamans avec
                                expertise et bienveillance. 💖
                            </p>
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                            {/* <a
                                href="/register"
                                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
                            >
                                <span className="mr-2">✨</span>
                                S'inscrire maintenant
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                            </a> */}
                            <a
                                href="/login"
                                className="group inline-flex transform items-center justify-center rounded-xl border-2 border-pink-300 bg-white px-8 py-4 font-semibold text-pink-600 shadow-lg transition-all duration-300 hover:scale-105 hover:border-pink-400 hover:bg-pink-50 hover:shadow-xl"
                            >
                                <span className="mr-2">👶</span>
                                Se connecter
                            </a>
                        </div>

                        {/* Statistiques */}
                        <div className="grid grid-cols-3 gap-8 pt-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-pink-600">1000+</div>
                                <div className="text-sm text-gray-600">Naissances</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-rose-600">15+</div>
                                <div className="text-sm text-gray-600">Années d'expérience</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-pink-600">24/7</div>
                                <div className="text-sm text-gray-600">Disponibilité</div>
                            </div>
                        </div>
                    </div>
                    {/* Image/illustration */}
                    <div className="relative">
                        <div className="bg-opacity-80 relative z-10 rounded-3xl bg-white p-8 shadow-2xl backdrop-blur-sm">
                            <img
                                src="https://i.pinimg.com/736x/eb/c8/25/ebc8259fca6ba32682286f359acb96f0.jpg"
                                alt="Clinique d'accouchement"
                                className="h-96 w-full rounded-2xl object-cover"
                            />
                            <div className="absolute -top-4 -right-4 animate-bounce rounded-full bg-pink-500 p-3 text-white shadow-lg">💕</div>
                            <div className="absolute -bottom-4 -left-4 animate-pulse rounded-full bg-rose-500 p-3 text-white shadow-lg">👶</div>
                        </div>

                        {/* Carte flottante */}
                        <div className="absolute -right-6 -bottom-6 rotate-3 transform rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white shadow-xl transition-transform duration-300 hover:rotate-0">
                            <div className="mb-2 text-2xl">🌸</div>
                            <div className="font-semibold">École des mamans</div>
                            <div className="text-sm opacity-90">Formation et accompagnement</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Section services en aperçu
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900">Nos services</h2>
                    <p className="mx-auto max-w-2xl text-gray-600">Un accompagnement complet pour vous et votre bébé</p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="rounded-2xl border border-pink-100 bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                        <div className="mb-4 text-4xl">🏥</div>
                        <h3 className="mb-3 text-xl font-semibold text-gray-900">Clinique d'accouchement</h3>
                        <p className="text-gray-600">Équipements modernes et équipe médicale experte pour un accouchement en toute sécurité.</p>
                    </div>

                    <div className="rounded-2xl border border-rose-100 bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                        <div className="mb-4 text-4xl">👩‍🏫</div>
                        <h3 className="mb-3 text-xl font-semibold text-gray-900">École des mamans</h3>
                        <p className="text-gray-600">Formation et préparation à la parentalité avec des cours adaptés à vos besoins.</p>
                    </div>

                    <div className="rounded-2xl border border-pink-100 bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                        <div className="mb-4 text-4xl">💻</div>
                        <h3 className="mb-3 text-xl font-semibold text-gray-900">Gestion digitale</h3>
                        <p className="text-gray-600">Plateforme intuitive pour le suivi de vos patientes et la gestion des rendez-vous.</p>
                    </div>
                </div>
            </div> */}
            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(5deg);
                    }
                }

                @keyframes float-reverse {
                    0%,
                    100% {
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
            `}</style>
        </div>
    );
}
