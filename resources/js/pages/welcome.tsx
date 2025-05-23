export default function Welcome() {
    return (
        <div className="relative h-screen overflow-hidden">
            {/* Image en arrière-plan */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://i.pinimg.com/736x/26/c9/b7/26c9b73ef7fde59f4288112c21a46d00.jpg"
                    alt="Accueil"
                    className="object-cover w-full h-full brightness-40"
                />
            </div>

            {/* Emojis décoratifs flottants */}
            <div className="absolute inset-0 z-5 pointer-events-none">
                {/* Cœurs */}
                <div className="absolute top-20 left-10 text-6xl animate-bounce" style={{animationDelay: '0s'}}>💖</div>
                <div className="absolute top-32 right-16 text-4xl animate-pulse" style={{animationDelay: '1s'}}>💕</div>
                <div className="absolute bottom-40 left-20 text-5xl animate-bounce" style={{animationDelay: '2s'}}>💗</div>
                <div className="absolute top-60 left-1/4 text-3xl animate-pulse" style={{animationDelay: '0.5s'}}>💖</div>
                <div className="absolute bottom-20 right-10 text-4xl animate-bounce" style={{animationDelay: '1.5s'}}>💕</div>

                {/* Bébés */}
                <div className="absolute top-40 right-32 text-5xl animate-pulse" style={{animationDelay: '0.8s'}}>👶</div>
                <div className="absolute bottom-60 right-1/4 text-6xl animate-bounce" style={{animationDelay: '2.5s'}}>🍼</div>
                <div className="absolute top-1/3 left-12 text-4xl animate-pulse" style={{animationDelay: '1.2s'}}>👶</div>
                <div className="absolute bottom-32 left-1/3 text-5xl animate-bounce" style={{animationDelay: '3s'}}>🍼</div>
                <div className="absolute top-16 right-1/3 text-3xl animate-pulse" style={{animationDelay: '0.3s'}}>👶</div>
            </div>

            {/* Contenu à gauche */}
            <div className="relative z-10 flex h-full justify-center items-center px-8 lg:px-20">
                <div className="text-center text-white">
                    {/* Logo avec emojis autour */}
                    <div className="mb-8 relative">
                        <img src="/logo.jpg" alt="Logo" className="h-36 w-auto mx-auto" />
                        <div className="absolute -top-2 -left-2 text-2xl animate-spin">💖</div>
                        <div className="absolute -top-2 -right-2 text-2xl animate-bounce">👶</div>
                        <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse">🍼</div>
                        <div className="absolute -bottom-2 -right-2 text-2xl animate-spin">💕</div>
                    </div>

                    <h1 className="text-4xl font-bold mb-4">
                        Bienvenue sur notre plateforme Clinique d'accouchement , Ecole des mamans 💖
                    </h1>
                    <p className="text-lg mb-8">
                        Nous vous offrons une gestion simplifiée de vos patientes, avec un accès facile à tous nos services depuis une seule plateforme. 👶💕
                    </p>

                    <div className="space-x-4">
                        <a
                            href="/register"
                            className="inline-block bg-pink-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-pink-600 transition"
                        >
                            S'inscrire 💖
                        </a>
                        <a
                            href="/login"
                            className="inline-block border border-pink-500 text-pink-600 font-semibold px-6 py-3 rounded-lg hover:bg-pink-50 transition"
                        >
                            Se connecter 👶
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
