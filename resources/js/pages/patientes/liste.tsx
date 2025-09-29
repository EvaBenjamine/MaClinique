import { Head, usePage, router } from '@inertiajs/react';
import { ChevronDown, Download, Eye, FileText, Plus, Search, SlidersHorizontal, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import AddPatienteModal from '@/components/patientes/add-patiente-modal';
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

type Patiente = {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    age: number;
    groupe_sanguin: string;
    adresse: string;
    numero_telephone: string;
    date_derniere_consultation: string;
    statut_dossier: string;
    date_accouchement_prevue: string;
    sage_femme: string;
};

type SageFemme = {
    id: number;
    nom: string;
};

type PageProps = {
    auth: {
        user: {
            role: string;
        };
    };
    patientes: Patiente[];
    sagesFemmes: SageFemme[];
};

export default function PatientesIndex() {
    const { auth, patientes, sagesFemmes } = usePage<PageProps>().props;

    const [filteredPatientes, setFilteredPatientes] = useState<Patiente[]>(patientes || []);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [selectedPatiente, setSelectedPatiente] = useState<Patiente | null>(null);

    const [isAddPatienteModalOpen, setIsAddPatienteModalOpen] = useState<boolean>(false);

    const statusFilters = [
        { id: 'actif', label: 'Dossier actif' },
        { id: 'suspendu', label: 'Dossier suspendu' },
        { id: 'archive', label: 'Dossier archivé' },
    ];

    // Effect pour filtrer les patientes quand les filtres ou la recherche changent
    useEffect(() => {
        let result = patientes || [];

        // Appliquer les filtres de statut
        if (activeFilters.length > 0) {
            result = result.filter((patiente) => {
                return activeFilters.includes(patiente.statut_dossier.toLowerCase());
            });
        }

        // Appliquer la recherche
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                (patiente) =>
                    patiente.nom.toLowerCase().includes(term) ||
                    patiente.prenom.toLowerCase().includes(term) ||
                    patiente.email.toLowerCase().includes(term) ||
                    patiente.numero_telephone.includes(term) ||
                    patiente.sage_femme?.toLowerCase().includes(term),
            );
        }

        setFilteredPatientes(result);
    }, [activeFilters, searchTerm, patientes]);

    const handleViewDossier = (patiente: Patiente): void => {
        // Navigation vers le dossier de la patiente
        router.visit(`/dossiers/${patiente.id}`);
    };

    const handleCreateDossier = (patiente: Patiente): void => {
        // Navigation vers la création de dossier
        router.visit(`/patiente/${patiente.id}/dossier/nouveau`);
    };

    const handleDeletePatiente = (patiente: Patiente): void => {
        setSelectedPatiente(patiente);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = (): void => {
        if (selectedPatiente) {
            router.delete(`/patiente/${selectedPatiente.id}`, {
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
                'Nom',
                'Prénom',
                'Email',
                'Âge',
                'Groupe Sanguin',
                'Adresse',
                'Téléphone',
                'Dernière Consultation',
                'Statut Dossier',
                'Date Accouchement Prévue',
                'Sage-femme',
            ],
            ...filteredPatientes.map((patiente) => [
                patiente.id,
                patiente.nom,
                patiente.prenom,
                patiente.email,
                patiente.age,
                patiente.groupe_sanguin,
                patiente.adresse,
                patiente.numero_telephone,
                patiente.date_derniere_consultation || 'N/A',
                patiente.statut_dossier,
                patiente.date_accouchement_prevue || 'N/A',
                patiente.sage_femme || 'Non assignée',
            ]),
        ]
            .map((row) => row.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'liste_patientes.csv';
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

    const getStatusBadgeStyles = (statut: string): string => {
        switch (statut.toLowerCase()) {
            case 'actif':
                return 'bg-green-100 text-green-800 hover:bg-green-200';
            case 'suspendu':
                return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
            case 'archive':
                return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
            default:
                return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
        }
    };

    const getAvatarStyles = (statut: string): string => {
        switch (statut.toLowerCase()) {
            case 'actif':
                return 'bg-green-100 text-green-500';
            case 'suspendu':
                return 'bg-orange-100 text-orange-500';
            case 'archive':
                return 'bg-gray-100 text-gray-500';
            default:
                return 'bg-blue-100 text-blue-500';
        }
    };

    // Fonction appelée après la création réussie d'une patiente
    const handlePatienteCreated = (): void => {
        // Rafraîchir la page pour afficher la nouvelle patiente
        //Inertia.reload();
    };

    const getInitials = (nom: string, prenom: string): string => {
        return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
    };

    const formatDate = (dateString: string): string => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    const isDossierCree = (statut: string): boolean => {
        return statut.toLowerCase() !== 'nouveau' && statut.toLowerCase() !== 'en_attente';
    };

    return (
        <Sidebar>
            <Head title="Patientes" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl">
                    <Card className="mb-6 border border-gray-100 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-bold text-gray-800">Gestion des Patientes</CardTitle>
                            <div className="flex items-center gap-2">
                                <Button onClick={handleDownload} variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                                    <Download className="mr-2 h-4 w-4" />
                                    Télécharger
                                </Button>
                                <Button
                                    onClick={() => setIsAddPatienteModalOpen(true)}
                                    className="bg-pink-500 text-white transition-colors hover:bg-pink-600"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Ajouter une patiente
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
                                            placeholder="Rechercher une patiente..."
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
                                            <DropdownMenuContent align="end" className="w-56">
                                                <DropdownMenuLabel>Statut du dossier</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {statusFilters.map((filter) => (
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
                                            const filterLabel = statusFilters.find((f) => f.id === filter)?.label || filter;
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
                                            <TableHead>Patiente</TableHead>
                                            <TableHead>Contact</TableHead>
                                            <TableHead>Dernière consultation</TableHead>
                                            <TableHead>Sage-femme</TableHead>
                                            <TableHead>Statut</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredPatientes.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="py-8 text-center text-gray-500">
                                                    Aucune patiente
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredPatientes.map((patiente) => (
                                                <TableRow key={patiente.id} className="hover:bg-gray-50">
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar
                                                                className={`${getAvatarStyles(patiente.statut_dossier)} border border-white shadow-sm`}
                                                            >
                                                                <AvatarFallback>{getInitials(patiente.nom, patiente.prenom)}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <div className="font-medium">
                                                                    {patiente.prenom} {patiente.nom}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {patiente.age} ans • Groupe {patiente.groupe_sanguin}
                                                                </div>
                                                                {patiente.date_accouchement_prevue && (
                                                                    <div className="text-sm text-pink-600">
                                                                        Accouchement prévu: {formatDate(patiente.date_accouchement_prevue)}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            <div className="text-gray-900">{patiente.numero_telephone}</div>
                                                            <div className="text-gray-500">{patiente.email}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-gray-600">{formatDate(patiente.date_derniere_consultation)}</TableCell>
                                                    <TableCell className="text-gray-600">{patiente.sage_femme || 'Non assignée'}</TableCell>
                                                    <TableCell>
                                                        <Badge className={`${getStatusBadgeStyles(patiente.statut_dossier)} px-2 py-1`}>
                                                            {patiente.statut_dossier}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-1">
                                                            {isDossierCree(patiente.statut_dossier) ? (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => handleViewDossier(patiente)}
                                                                    className="text-gray-600 hover:bg-green-50 hover:text-green-600"
                                                                    title="Voir le dossier"
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </Button>
                                                            ) : (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => handleCreateDossier(patiente)}
                                                                    className="text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                                                    title="Créer le dossier"
                                                                >
                                                                    <FileText className="h-4 w-4" />
                                                                </Button>
                                                            )}

                                                            {(auth.user.role === 'admin' || auth.user.role === 'sage_femme') && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => handleDeletePatiente(patiente)}
                                                                    className="text-gray-600 hover:bg-red-50 hover:text-red-600"
                                                                    title="Supprimer la patiente"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
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
                                {filteredPatientes.length} patiente{filteredPatientes.length !== 1 ? 's' : ''} au total
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Modal d'ajout de patiente */}
            <AddPatienteModal
                isOpen={isAddPatienteModalOpen}
                onClose={() => setIsAddPatienteModalOpen(false)}
                sagesFemmes={sagesFemmes || []}
                onComplete={handlePatienteCreated}
            />

            {/* Dialog pour supprimer une patiente */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-red-600">Confirmer la suppression</DialogTitle>
                    </DialogHeader>
                    {selectedPatiente && (
                        <div className="space-y-4">
                            <div className="rounded-lg border border-red-100 bg-red-50 p-4">
                                <p className="font-medium">
                                    Êtes-vous sûr de vouloir supprimer le dossier de{' '}
                                    <span className="font-bold">
                                        {selectedPatiente.prenom} {selectedPatiente.nom}
                                    </span>{' '}
                                    ?
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    Cette action est irréversible et supprimera définitivement toutes les données associées à cette patiente.
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
