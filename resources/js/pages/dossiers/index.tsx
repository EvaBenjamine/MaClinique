import { Head, router, usePage } from '@inertiajs/react';
import { ChevronDown, Download, Eye, FileText, Plus, Search, SlidersHorizontal, UserCheck, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import Sidebar from '@/components/Sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

type DossierMedical = {
    id: number;
    patiente: {
        id: number;
        nom: string;
        prenom: string;
        age: number;
        numero_telephone: string;
        groupe_sanguin: string;
    };
    sage_femme: {
        id: number;
        nom: string;
        prenom: string;
    };
    statut_dossier: string;
    date_creation: string;
    date_derniere_consultation: string | null;
    date_accouchement_prevue: string | null;
    trimestre: string;
    age_grossesse_semaines: number;
    nombre_consultations: number;
    nombre_examens: number;
    grossesse_a_risque: boolean;
    facteurs_risque?: string;
    notes_importantes?: string;
};

type PageProps = {
    dossiers: DossierMedical[];
};

export default function DossiersIndex() {
    const { dossiers } = usePage<PageProps>().props;

    const [filteredDossiers, setFilteredDossiers] = useState<DossierMedical[]>(dossiers || []);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    // Effect pour mettre à jour les dossiers filtrés quand les dossiers changent
    useEffect(() => {
        setFilteredDossiers(dossiers || []);
    }, [dossiers]);

    const statusFilters = [
        { id: 'actif', label: 'Actif', color: 'green' },
        { id: 'suspendu', label: 'Suspendu', color: 'orange' },
        { id: 'terminé', label: 'Terminé', color: 'blue' },
        { id: 'archivé', label: 'Archivé', color: 'gray' },
    ];

    const trimestreFilters = [
        { id: 't1', label: 'Premier trimestre (T1)' },
        { id: 't2', label: 'Deuxième trimestre (T2)' },
        { id: 't3', label: 'Troisième trimestre (T3)' },
        { id: 'post-partum', label: 'Post-partum' },
    ];

    const risqueFilters = [
        { id: 'avec_risque', label: 'Grossesse à risque' },
        { id: 'sans_risque', label: 'Grossesse normale' },
    ];

    // Effect pour filtrer les dossiers
    useEffect(() => {
        let result = dossiers || [];

        // Appliquer les filtres de statut
        if (activeFilters.length > 0) {
            result = result.filter((dossier) => {
                const statusMatch = activeFilters.includes(dossier.statut_dossier.toLowerCase());
                const trimestreMatch = activeFilters.includes(dossier.trimestre.toLowerCase());
                const risqueMatch = activeFilters.includes(dossier.grossesse_a_risque ? 'avec_risque' : 'sans_risque');

                return statusMatch || trimestreMatch || risqueMatch;
            });
        }

        // Appliquer la recherche
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                (dossier) =>
                    dossier.patiente.nom.toLowerCase().includes(term) ||
                    dossier.patiente.prenom.toLowerCase().includes(term) ||
                    dossier.sage_femme.nom.toLowerCase().includes(term) ||
                    dossier.facteurs_risque?.toLowerCase().includes(term) ||
                    dossier.notes_importantes?.toLowerCase().includes(term),
            );
        }

        setFilteredDossiers(result);
    }, [activeFilters, searchTerm, dossiers]);

    const handleViewDossier = (dossier: DossierMedical): void => {
        router.visit(`/dossiers/${dossier.id}`);
    };

    const handleDownload = (): void => {
        const csvContent = [
            [
                'ID',
                'Patiente',
                'Sage-femme',
                'Statut',
                'Trimestre',
                'Âge grossesse (semaines)',
                'Consultations',
                'Examens',
                'Grossesse à risque',
                'Date création',
                'Dernière consultation',
            ],
            ...filteredDossiers.map((dossier) => [
                dossier.id,
                `${dossier.patiente.prenom} ${dossier.patiente.nom}`,
                `${dossier.sage_femme.prenom} ${dossier.sage_femme.nom}`,
                dossier.statut_dossier,
                dossier.trimestre,
                dossier.age_grossesse_semaines,
                dossier.nombre_consultations,
                dossier.nombre_examens,
                dossier.grossesse_a_risque ? 'Oui' : 'Non',
                dossier.date_creation,
                dossier.date_derniere_consultation || 'N/A',
            ]),
        ]
            .map((row) => row.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'dossiers_medicaux.csv';
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
            case 'terminé':
                return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
            case 'archivé':
                return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
        }
    };

    const getTrimestreBadgeStyles = (trimestre: string): string => {
        switch (trimestre.toLowerCase()) {
            case 't1':
                return 'bg-pink-100 text-pink-800';
            case 't2':
                return 'bg-purple-100 text-purple-800';
            case 't3':
                return 'bg-indigo-100 text-indigo-800';
            case 'post-partum':
                return 'bg-teal-100 text-teal-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getAvatarStyles = (statut: string): string => {
        switch (statut.toLowerCase()) {
            case 'actif':
                return 'bg-green-100 text-green-500';
            case 'suspendu':
                return 'bg-orange-100 text-orange-500';
            case 'terminé':
                return 'bg-blue-100 text-blue-500';
            case 'archivé':
                return 'bg-gray-100 text-gray-500';
            default:
                return 'bg-gray-100 text-gray-500';
        }
    };

    const getInitials = (nom: string, prenom: string): string => {
        return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
    };

    const formatDate = (dateString: string | null): string => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    return (
        <Sidebar>
            <Head title="Dossiers Médicaux" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl">
                    <Card className="mb-6 border border-gray-100 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-bold text-gray-800">Dossiers Médicaux</CardTitle>
                            <div className="flex items-center gap-2">
                                <Button onClick={handleDownload} variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                                    <Download className="mr-2 h-4 w-4" />
                                    Télécharger
                                </Button>
                                <Button className="bg-pink-500 text-white transition-colors hover:bg-pink-600">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Nouveau dossier
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
                                            placeholder="Rechercher un dossier..."
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
                                                <DropdownMenuSeparator />
                                                <DropdownMenuLabel>Trimestre</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {trimestreFilters.map((filter) => (
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
                                                <DropdownMenuLabel>Niveau de risque</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {risqueFilters.map((filter) => (
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
                                            const statusFilter = statusFilters.find((f) => f.id === filter);
                                            const trimestreFilter = trimestreFilters.find((f) => f.id === filter);
                                            const risqueFilter = risqueFilters.find((f) => f.id === filter);
                                            const filterLabel = statusFilter?.label || trimestreFilter?.label || risqueFilter?.label || filter;
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
                                            <TableHead>Sage-femme</TableHead>
                                            <TableHead>Statut</TableHead>
                                            <TableHead>Grossesse</TableHead>
                                            <TableHead>Suivi</TableHead>
                                            <TableHead>Dernière consultation</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredDossiers.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                                                    Aucun dossier trouvé
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredDossiers.map((dossier) => (
                                                <TableRow key={dossier.id} className="hover:bg-gray-50">
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar
                                                                className={`${getAvatarStyles(dossier.statut_dossier)} border border-white shadow-sm`}
                                                            >
                                                                <AvatarFallback>
                                                                    {getInitials(dossier.patiente.nom, dossier.patiente.prenom)}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <div className="font-medium">
                                                                    {dossier.patiente.prenom} {dossier.patiente.nom}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {dossier.patiente.age} ans • Groupe {dossier.patiente.groupe_sanguin}
                                                                </div>
                                                                {dossier.date_accouchement_prevue && (
                                                                    <div className="text-sm text-pink-600">
                                                                        Accouchement prévu: {formatDate(dossier.date_accouchement_prevue)}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            {dossier.sage_femme.prenom} {dossier.sage_femme.nom}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge className={`${getStatusBadgeStyles(dossier.statut_dossier)} px-2 py-1`}>
                                                            {dossier.statut_dossier}
                                                        </Badge>
                                                        {dossier.grossesse_a_risque && (
                                                            <Badge className="ml-2 bg-red-100 px-2 py-1 text-red-800">À risque</Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="space-y-1">
                                                            <Badge className={`${getTrimestreBadgeStyles(dossier.trimestre)} px-2 py-1`}>
                                                                {dossier.trimestre}
                                                            </Badge>
                                                            {dossier.age_grossesse_semaines > 0 && (
                                                                <div className="text-sm text-gray-500">{dossier.age_grossesse_semaines} semaines</div>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <UserCheck className="h-3 w-3 text-gray-400" />
                                                                <span>{dossier.nombre_consultations} consultations</span>
                                                            </div>
                                                            <div className="mt-1 flex items-center gap-2">
                                                                <FileText className="h-3 w-3 text-gray-400" />
                                                                <span>{dossier.nombre_examens} examens</span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-gray-600">{formatDate(dossier.date_derniere_consultation)}</TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleViewDossier(dossier)}
                                                                className="text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                                                title="Consulter le dossier"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="border-t border-gray-100 p-4 text-sm text-gray-500">
                                {filteredDossiers.length} dossier{filteredDossiers.length !== 1 ? 's' : ''} au total
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Sidebar>
    );
}
