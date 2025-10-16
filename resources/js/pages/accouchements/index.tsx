import { Head, router, usePage } from '@inertiajs/react';
import { ChevronDown, Download, Eye, FileText, Heart, Search, SlidersHorizontal, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import Sidebar from '@/components/Sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Accouchement = {
    id: number;
    dossier_patient_id: number;
    sage_femme_id: number;
    date_accouchement: string;
    heure_accouchement: string;
    age_gestationnel: number | null;
    travail: string | null;
    presentation: string | null;
    mode_accouchement: string | null;
    episiotomie: boolean;
    dechirure: boolean;
    delivrance: string | null;
    mode_delivrance: string | null;
    poids_placenta: number | null;
    peau_a_peau: boolean;
    poids_bebe: number | null;
    taille_bebe: number | null;
    perimetre_cranien_bebe: number | null;
    perimetre_thoracique_bebe: number | null;
    sexe: string | null;
    mise_au_sein: boolean;
    vitamine_k: boolean;
    observations: string | null;
    complications: string | null;
    // Relations
    dossier_patient: {
        id: number;
        patiente: {
            user: {
                nom: string;
                prenom: string;
            };
        };
    };
    sage_femme: {
        user: {
            nom: string;
            prenom: string;
        };
    };
};

type PageProps = {
    auth: {
        user: {
            id: number;
            role: string;
        };
    };
    accouchements: Accouchement[];
};

export default function AccouchementsIndex() {
    const { auth, accouchements } = usePage<PageProps>().props;

    const [filteredAccouchements, setFilteredAccouchements] = useState<Accouchement[]>(accouchements || []);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [selectedAccouchement, setSelectedAccouchement] = useState<Accouchement | null>(null);

    // Filtres pour les accouchements
    const typeFilters = [
        { id: 'voie_basse', label: 'Voie basse' },
        { id: 'cesarienne', label: 'Césarienne' },
        { id: 'ventouse', label: 'Ventouse' },
        { id: 'forceps', label: 'Forceps' },
    ];

    const travailFilters = [
        { id: 'spontane', label: 'Spontané' },
        { id: 'declenche', label: 'Déclenché' },
    ];

    // Effect pour filtrer les accouchements
    useEffect(() => {
        let result = accouchements || [];

        // Appliquer les filtres de type
        if (activeFilters.length > 0) {
            result = result.filter((accouchement) => {
                const modeMatch =
                    accouchement.mode_accouchement && activeFilters.includes(accouchement.mode_accouchement.toLowerCase().replace(/\s+/g, '_'));
                const travailMatch = accouchement.travail && activeFilters.includes(accouchement.travail);
                return modeMatch || travailMatch;
            });
        }

        // Appliquer la recherche
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                (accouchement) =>
                    accouchement.dossier_patient.patiente.user.nom.toLowerCase().includes(term) ||
                    accouchement.dossier_patient.patiente.user.prenom.toLowerCase().includes(term) ||
                    accouchement.sage_femme.user.nom.toLowerCase().includes(term) ||
                    accouchement.sage_femme.user.prenom.toLowerCase().includes(term) ||
                    accouchement.mode_accouchement?.toLowerCase().includes(term) ||
                    accouchement.observations?.toLowerCase().includes(term),
            );
        }

        // Trier par date décroissante
        result.sort((a, b) => new Date(b.date_accouchement).getTime() - new Date(a.date_accouchement).getTime());

        setFilteredAccouchements(result);
    }, [activeFilters, searchTerm, accouchements]);

    const handleViewAccouchement = (accouchement: Accouchement): void => {
        router.visit(`/accouchements/${accouchement.id}`);
    };

    const handleEditAccouchement = (accouchement: Accouchement): void => {
        router.visit(`/accouchements/${accouchement.id}/edit`);
    };

    const handleDeleteAccouchement = (accouchement: Accouchement): void => {
        setSelectedAccouchement(accouchement);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = (): void => {
        if (selectedAccouchement) {
            router.delete(`/accouchements/${selectedAccouchement.id}`, {
                onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                },
            });
        }
    };

    const handleDownload = (): void => {
        const csvContent = [
            [
                'ID',
                'Date',
                'Heure',
                'Patiente (Nom)',
                'Patiente (Prénom)',
                'Sage-femme',
                'Âge gestationnel',
                'Travail',
                'Présentation',
                'Mode accouchement',
                'Épisiotomie',
                'Déchirure',
                'Sexe bébé',
                'Poids bébé (g)',
                'Taille bébé (cm)',
                'Périmètre crânien (cm)',
                'Complications',
            ],
            ...filteredAccouchements.map((accouchement) => [
                accouchement.id,
                formatDate(accouchement.date_accouchement),
                accouchement.heure_accouchement,
                accouchement.dossier_patient.patiente.user.nom,
                accouchement.dossier_patient.patiente.user.prenom,
                `${accouchement.sage_femme.user.prenom} ${accouchement.sage_femme.user.nom}`,
                accouchement.age_gestationnel ? `${accouchement.age_gestationnel} SA` : 'N/A',
                accouchement.travail || 'N/A',
                accouchement.presentation || 'N/A',
                accouchement.mode_accouchement || 'N/A',
                accouchement.episiotomie ? 'Oui' : 'Non',
                accouchement.dechirure ? 'Oui' : 'Non',
                accouchement.sexe || 'N/A',
                accouchement.poids_bebe || 'N/A',
                accouchement.taille_bebe || 'N/A',
                accouchement.perimetre_cranien_bebe || 'N/A',
                accouchement.complications || 'Aucune',
            ]),
        ]
            .map((row) => row.map((cell) => `"${cell}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `accouchements_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const toggleFilter = (filterId: string): void => {
        setActiveFilters((prev) => {
            if (prev.includes(filterId)) {
                return prev.filter((id) => id !== filterId);
            } else {
                return [...prev, filterId];
            }
        });
    };

    const clearFilters = (): void => {
        setActiveFilters([]);
        setSearchTerm('');
    };

    const getModeBadgeStyles = (mode: string): string => {
        const modeKey = mode.toLowerCase().replace(/\s+/g, '_');
        switch (modeKey) {
            case 'voie_basse':
                return 'bg-green-100 text-green-800 hover:bg-green-200';
            case 'cesarienne':
                return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
            case 'ventouse':
                return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
            case 'forceps':
                return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
        }
    };

    const getInitials = (nom: string, prenom: string): string => {
        return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
    };

    const formatDate = (dateString: string): string => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    const formatDateTime = (dateString: string, timeString: string): string => {
        if (!dateString) return 'N/A';
        const date = formatDate(dateString);
        return timeString ? `${date} à ${timeString}` : date;
    };

    return (
        <Sidebar>
            <Head title="Accouchements" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl">
                    <Card className="mb-6 border border-gray-100 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
                                <Heart className="h-6 w-6 text-pink-600" />
                                Gestion des Accouchements
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                <Button onClick={handleDownload} variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                                    <Download className="mr-2 h-4 w-4" />
                                    Télécharger
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>

                    <Card className="border border-gray-100 shadow-sm">
                        <CardContent className="p-0">
                            <div className="border-b border-gray-100 p-4">
                                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                                    <div className="relative w-full md:w-96">
                                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                        <Input
                                            placeholder="Rechercher un accouchement..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full py-2 pr-4 pl-10"
                                        />
                                        {searchTerm && (
                                            <button onClick={() => setSearchTerm('')} className="absolute top-1/2 right-3 -translate-y-1/2 transform">
                                                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex w-full items-center gap-2 md:w-auto">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="flex items-center gap-2">
                                                    <SlidersHorizontal className="h-4 w-4" />
                                                    <span>Filtrer</span>
                                                    {activeFilters.length > 0 && (
                                                        <Badge className="ml-1 bg-pink-500 hover:bg-pink-600">{activeFilters.length}</Badge>
                                                    )}
                                                    <ChevronDown className="ml-2 h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-64">
                                                <DropdownMenuLabel>Mode d'accouchement</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {typeFilters.map((filter) => (
                                                    <DropdownMenuCheckboxItem
                                                        key={filter.id}
                                                        checked={activeFilters.includes(filter.id)}
                                                        onCheckedChange={() => toggleFilter(filter.id)}
                                                        className="cursor-pointer"
                                                    >
                                                        {filter.label}
                                                    </DropdownMenuCheckboxItem>
                                                ))}
                                                <DropdownMenuSeparator />
                                                <DropdownMenuLabel>Type de travail</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {travailFilters.map((filter) => (
                                                    <DropdownMenuCheckboxItem
                                                        key={filter.id}
                                                        checked={activeFilters.includes(filter.id)}
                                                        onCheckedChange={() => toggleFilter(filter.id)}
                                                        className="cursor-pointer"
                                                    >
                                                        {filter.label}
                                                    </DropdownMenuCheckboxItem>
                                                ))}
                                                {(activeFilters.length > 0 || searchTerm) && (
                                                    <>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={clearFilters}
                                                            className="cursor-pointer text-red-500 hover:text-red-700 focus:text-red-700"
                                                        >
                                                            Effacer les filtres
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                {activeFilters.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {activeFilters.map((filter) => {
                                            const filterLabel =
                                                typeFilters.find((f) => f.id === filter)?.label ||
                                                travailFilters.find((f) => f.id === filter)?.label ||
                                                filter;
                                            return (
                                                <Badge
                                                    key={filter}
                                                    className="flex items-center gap-1 bg-gray-100 px-3 py-1 text-gray-800 hover:bg-gray-200"
                                                >
                                                    {filterLabel}
                                                    <button onClick={() => toggleFilter(filter)}>
                                                        <X className="ml-1 h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            );
                                        })}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={clearFilters}
                                            className="h-6 text-xs text-gray-500 hover:text-gray-700"
                                        >
                                            Effacer tout
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date & Heure</TableHead>
                                            <TableHead>Patiente</TableHead>
                                            <TableHead>Mode</TableHead>
                                            <TableHead>Sage-femme</TableHead>
                                            <TableHead>Nouveau-né</TableHead>
                                            <TableHead>Complications</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredAccouchements.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                                                    Aucun accouchement trouvé
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredAccouchements.map((accouchement) => (
                                                <TableRow key={accouchement.id} className="hover:bg-gray-50">
                                                    <TableCell>
                                                        <div>
                                                            <div className="font-medium">{formatDate(accouchement.date_accouchement)}</div>
                                                            <div className="text-sm text-gray-500">{accouchement.heure_accouchement}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="border border-white bg-pink-100 text-pink-600 shadow-sm">
                                                                <AvatarFallback>
                                                                    {getInitials(
                                                                        accouchement.dossier_patient.patiente.user.nom,
                                                                        accouchement.dossier_patient.patiente.user.prenom,
                                                                    )}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <div className="font-medium">
                                                                    {accouchement.dossier_patient.patiente.user.prenom}{' '}
                                                                    {accouchement.dossier_patient.patiente.user.nom}
                                                                </div>
                                                                {accouchement.age_gestationnel && (
                                                                    <div className="text-sm text-gray-500">{accouchement.age_gestationnel} SA</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="space-y-1">
                                                            {accouchement.mode_accouchement && (
                                                                <Badge className={`${getModeBadgeStyles(accouchement.mode_accouchement)} text-xs`}>
                                                                    {accouchement.mode_accouchement}
                                                                </Badge>
                                                            )}
                                                            {accouchement.travail && (
                                                                <div className="text-xs text-gray-500">
                                                                    {accouchement.travail === 'spontane' ? 'Spontané' : 'Déclenché'}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            {accouchement.sage_femme.user.prenom} {accouchement.sage_femme.user.nom}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="space-y-1 text-sm">
                                                            {accouchement.sexe && (
                                                                <div className="font-medium">
                                                                    {accouchement.sexe === 'masculin' ? '👶 Garçon' : '👶 Fille'}
                                                                </div>
                                                            )}
                                                            {accouchement.poids_bebe && (
                                                                <div className="text-gray-600">{accouchement.poids_bebe} g</div>
                                                            )}
                                                            {accouchement.taille_bebe && (
                                                                <div className="text-gray-600">{accouchement.taille_bebe} cm</div>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {accouchement.complications ? (
                                                            <Badge variant="destructive" className="text-xs">
                                                                Complications
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="outline" className="bg-green-50 text-xs text-green-700">
                                                                Aucune
                                                            </Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleViewAccouchement(accouchement)}
                                                                className="text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                                                title="Voir l'accouchement"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>

                                                            {(auth.user.role === 'admin' || auth.user.id === accouchement.sage_femme_id) && (
                                                                <>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => handleEditAccouchement(accouchement)}
                                                                        className="text-gray-600 hover:bg-green-50 hover:text-green-600"
                                                                        title="Modifier l'accouchement"
                                                                    >
                                                                        <FileText className="h-4 w-4" />
                                                                    </Button>

                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => handleDeleteAccouchement(accouchement)}
                                                                        className="text-gray-600 hover:bg-red-50 hover:text-red-600"
                                                                        title="Supprimer l'accouchement"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="border-t border-gray-100 p-4 text-sm text-gray-500">
                                {filteredAccouchements.length} accouchement{filteredAccouchements.length !== 1 ? 's' : ''} au total
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Dialog pour supprimer un accouchement */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-red-600">Confirmer la suppression</DialogTitle>
                    </DialogHeader>
                    {selectedAccouchement && (
                        <div className="space-y-4">
                            <div className="rounded-lg border border-red-100 bg-red-50 p-4">
                                <p className="font-medium">
                                    Êtes-vous sûr de vouloir supprimer l'accouchement du{' '}
                                    <span className="font-bold">{formatDate(selectedAccouchement.date_accouchement)}</span> de{' '}
                                    <span className="font-bold">
                                        {selectedAccouchement.dossier_patient.patiente.user.prenom}{' '}
                                        {selectedAccouchement.dossier_patient.patiente.user.nom}
                                    </span>{' '}
                                    ?
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    Cette action est irréversible et supprimera définitivement toutes les données de cet accouchement.
                                </p>
                            </div>
                            <div className="flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                    Annuler
                                </Button>
                                <Button variant="destructive" onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                                    Supprimer définitivement
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </Sidebar>
    );
}
