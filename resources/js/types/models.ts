// Types pour les modèles Laravel
export interface User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    role: 'admin' | 'sage_femme' | 'secretaire' | 'patiente';
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Patiente {
    id: number;
    user_id: number;
    age: number;
    profession: string | null;
    situation_matrimoniale: string;
    groupe_sanguin: string | null;
    numero_telephone: string;
    numero_urgence: string | null;
    adresse: string;
    created_at?: string;
    updated_at?: string;
}

export interface SageFemme {
    id: number;
    user_id: number;
    matricule: string;
    grade: string;
    specialite: string | null;
    numero_telephone: string;
    adresse: string;
    created_at?: string;
    updated_at?: string;
}

export interface Secretaire {
    id: number;
    user_id: number;
    matricule: string;
    grade: string;
    numero_telephone: string;
    adresse: string;
    created_at?: string;
    updated_at?: string;
}

// Type pour les détails d'un utilisateur (union des différents types possibles)
export type UserDetails = Partial<Patiente & SageFemme & Secretaire>;

// Type pour les filtres
export interface Filters {
    search?: string;
    role?: string;
    page?: number;
}

// Type pour la pagination
export interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface Paginated<T> {
    data: T[];
    links: PaginationLinks;
    meta: PaginationMeta;
}
