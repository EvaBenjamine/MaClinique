import { Head, usePage, router } from '@inertiajs/react';
import { ChevronDown, Download, Eye, FileText, Search, SlidersHorizontal, Stethoscope, Trash2, X } from 'lucide-react';
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

type Consultation = {
    id: number;
    dossier_patient_id: number;
    sage_femme_id: number;
    date: string;
    type_consultation: string;
    poids: number | null;
    tension_arterielle_systolique: number | null;
    tension_arterielle_diastolique: number | null;
    hauteur_uterine: number | null;
    position_foetus: string | null;
    rythme_cardiaque_foetal: number | null;
    observations: string | null;
    prescriptions: string | null;
    examens_prescrits: string | null;
    recommandations: string | null;
    sage_femme_nom: string;
    sage_femme_prenom: string;
    // Relations
    patient: {
        id: number;
        nom: string;
        prenom: string;
        age: number;
        numero_telephone: string;
        email: string;
    };
    dossier_patient: {
        id: number;
    };
};

type PageProps = {
    auth: {
        user: {
            id: number;
            role: string;
        };
    };
    consultations: Consultation[];
};

export default function ConsultationsIndex() {
    const { auth, consultations } = usePage<PageProps>().props;

    const [filteredConsultations, setFilteredConsultations] = useState<Consultation[]>(consultations || []);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

    // Types de consultation basés sur la pratique obstétricale
    const typeFilters = [
        { id: 'consultation_prenatale', label: 'Consultation prénatale' },
        { id: 'consultation_postnatale', label: 'Consultation postnatale' },
        { id: 'consultation_urgence', label: "Consultation d'urgence" },
        { id: 'echographie', label: 'Échographie' },
        { id: 'consultation_suivi', label: 'Consultation de suivi' },
        { id: 'consultation_planification', label: 'Planification familiale' },
        { id: 'consultation_gynecologique', label: 'Consultation gynécologique' },
        { id: 'preparation_accouchement', label: "Préparation à l'accouchement" },
        { id: 'consultation_allaitement', label: 'Consultation allaitement' },
        { id: 'autre', label: 'Autre' },
    ];

    // Effect pour filtrer les consultations
    useEffect(() => {
        let result = consultations || [];

        // Appliquer les filtres de type
        if (activeFilters.length > 0) {
            result = result.filter((consultation) => {
                return activeFilters.includes(consultation.type_consultation.toLowerCase().replace(/\s+/g, '_').replace(/'/g, ''));
            });
        }

        // Appliquer la recherche
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                (consultation) =>
                    consultation.patient.nom.toLowerCase().includes(term) ||
                    consultation.patient.prenom.toLowerCase().includes(term) ||
                    consultation.sage_femme_nom.toLowerCase().includes(term) ||
                    consultation.sage_femme_prenom.toLowerCase().includes(term) ||
                    consultation.type_consultation.toLowerCase().includes(term) ||
                    consultation.observations?.toLowerCase().includes(term),
            );
        }

        // Trier par date décroissante
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setFilteredConsultations(result);
    }, [activeFilters, searchTerm, consultations]);

    const handleViewConsultation = (consultation: Consultation): void => {
        router.visit(`/consultations/${consultation.id}`);
    };

    const handleEditConsultation = (consultation: Consultation): void => {
        router.visit(`/consultations/${consultation.id}/edit`);
    };

    const handleDeleteConsultation = (consultation: Consultation): void => {
        setSelectedConsultation(consultation);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = (): void => {
        if (selectedConsultation) {
            router.delete(`/consultations/${selectedConsultation.id}`, {
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
                'Type de Consultation',
                'Patient (Nom)',
                'Patient (Prénom)',
                'Numéro Dossier',
                'Sage-femme',
                'Poids (kg)',
                'Tension Systolique',
                'Tension Diastolique',
                'Hauteur Utérine (cm)',
                'Position Fœtus',
                'Rythme Cardiaque Fœtal',
                'Observations',
                'Prescriptions',
                'Examens Prescrits',
                'Recommandations',
            ],
            ...filteredConsultations.map((consultation) => [
                consultation.id,
                formatDate(consultation.date),
                consultation.type_consultation,
                consultation.patient.nom,
                consultation.patient.prenom,

                `${consultation.sage_femme_prenom} ${consultation.sage_femme_nom}`,
                consultation.poids || 'N/A',
                consultation.tension_arterielle_systolique || 'N/A',
                consultation.tension_arterielle_diastolique || 'N/A',
                consultation.hauteur_uterine || 'N/A',
                consultation.position_foetus || 'N/A',
                consultation.rythme_cardiaque_foetal || 'N/A',
                consultation.observations || 'N/A',
                consultation.prescriptions || 'N/A',
                consultation.examens_prescrits || 'N/A',
                consultation.recommandations || 'N/A',
            ]),
        ]
            .map((row) => row.map((cell) => `"${cell}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `consultations_${new Date().toISOString().split('T')[0]}.csv`;
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

    const getTypeBadgeStyles = (type: string): string => {
        const typeKey = type.toLowerCase().replace(/\s+/g, '_').replace(/'/g, '');
        switch (typeKey) {
            case 'consultation_prenatale':
                return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
            case 'consultation_postnatale':
                return 'bg-green-100 text-green-800 hover:bg-green-200';
            case 'consultation_urgence':
                return 'bg-red-100 text-red-800 hover:bg-red-200';
            case 'echographie':
                return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
            case 'consultation_suivi':
                return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
            case 'consultation_planification':
                return 'bg-teal-100 text-teal-800 hover:bg-teal-200';
            case 'consultation_gynecologique':
                return 'bg-pink-100 text-pink-800 hover:bg-pink-200';
            case 'preparation_accouchement':
                return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200';
            case 'consultation_allaitement':
                return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
            default:
                return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
        }
    };

    const getTypeIcon = (type: string): JSX.Element => {
        const typeKey = type.toLowerCase().replace(/\s+/g, '_').replace(/'/g, '');
        switch (typeKey) {
            case 'consultation_urgence':
                return <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />;
            case 'echographie':
                return <FileText className="h-3 w-3" />;
            default:
                return <Stethoscope className="h-3 w-3" />;
        }
    };

    const getInitials = (nom: string, prenom: string): string => {
        return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
    };

    const formatDate = (dateString: string): string => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    const formatDateTime = (dateString: string): string => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('fr-FR');
    };

    const getTensionString = (systolique: number | null, diastolique: number | null): string => {
        if (!systolique && !diastolique) return 'N/A';
        return `${systolique || '?'}/${diastolique || '?'} mmHg`;
    };

    return (
        <Sidebar>
            <Head title="Consultations" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl">
                    <Card className="mb-6 border border-gray-100 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-bold text-gray-800">Gestion des Consultations</CardTitle>
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
                                            placeholder="Rechercher une consultation..."
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
                                                    <span>Type de consultation</span>
                                                    {activeFilters.length > 0 && (
                                                        <Badge className="ml-1 bg-pink-500 hover:bg-pink-600">{activeFilters.length}</Badge>
                                                    )}
                                                    <ChevronDown className="ml-2 h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-64">
                                                <DropdownMenuLabel>Type de consultation</DropdownMenuLabel>
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
                                            const filterLabel = typeFilters.find((f) => f.id === filter)?.label || filter;
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
                                            <TableHead>Date</TableHead>
                                            <TableHead>Patiente</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Sagefemme</TableHead>
                                            <TableHead>Données vitales</TableHead>
                                            <TableHead>Observations</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredConsultations.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                                                    Aucune consultation trouvée
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredConsultations.map((consultation) => (
                                                <TableRow key={consultation.id} className="hover:bg-gray-50">
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <div>
                                                                <div className="font-medium">{formatDate(consultation.date)}</div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="border border-white bg-gray-100 text-gray-600 shadow-sm">
                                                                <AvatarFallback>
                                                                    {getInitials(consultation.patient.nom, consultation.patient.prenom)}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <div className="font-medium">
                                                                    {consultation.patient.prenom} {consultation.patient.nom}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            className={`${getTypeBadgeStyles(consultation.type_consultation)} flex items-center gap-1 px-2 py-1`}
                                                        >
                                                            {getTypeIcon(consultation.type_consultation)}
                                                            <span className="text-xs">{consultation.type_consultation}</span>
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm">
                                                                {consultation.sage_femme_prenom} {consultation.sage_femme_nom}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="space-y-1 text-sm">
                                                            {consultation.poids && (
                                                                <div className="text-gray-600">Poids: {consultation.poids} kg</div>
                                                            )}
                                                            {(consultation.tension_arterielle_systolique ||
                                                                consultation.tension_arterielle_diastolique) && (
                                                                <div className="text-gray-600">
                                                                    TA:{' '}
                                                                    {getTensionString(
                                                                        consultation.tension_arterielle_systolique,
                                                                        consultation.tension_arterielle_diastolique,
                                                                    )}
                                                                </div>
                                                            )}
                                                            {consultation.hauteur_uterine && (
                                                                <div className="text-gray-600">HU: {consultation.hauteur_uterine} cm</div>
                                                            )}
                                                            {consultation.rythme_cardiaque_foetal && (
                                                                <div className="text-gray-600">RCF: {consultation.rythme_cardiaque_foetal} bpm</div>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="max-w-xs">
                                                        <div className="truncate text-sm text-gray-600">
                                                            {consultation.observations || 'Aucune observation'}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                //onClick={() => handleViewConsultation(consultation)}
                                                                className="text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                                                title="Voir la consultation"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>

                                                            {(auth.user.role === 'admin' || auth.user.id === consultation.sage_femme_id) && (
                                                                <>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        //onClick={() => handleEditConsultation(consultation)}
                                                                        className="text-gray-600 hover:bg-green-50 hover:text-green-600"
                                                                        title="Modifier la consultation"
                                                                    >
                                                                        <FileText className="h-4 w-4" />
                                                                    </Button>

                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        //onClick={() => handleDeleteConsultation(consultation)}
                                                                        className="text-gray-600 hover:bg-red-50 hover:text-red-600"
                                                                        title="Supprimer la consultation"
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
                                {filteredConsultations.length} consultation{filteredConsultations.length !== 1 ? 's' : ''} au total
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Dialog pour supprimer une consultation */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-red-600">Confirmer la suppression</DialogTitle>
                    </DialogHeader>
                    {selectedConsultation && (
                        <div className="space-y-4">
                            <div className="rounded-lg border border-red-100 bg-red-50 p-4">
                                <p className="font-medium">
                                    Êtes-vous sûr de vouloir supprimer la consultation du{' '}
                                    <span className="font-bold">{formatDate(selectedConsultation.date)}</span> pour{' '}
                                    <span className="font-bold">
                                        {selectedConsultation.patient.prenom} {selectedConsultation.patient.nom}
                                    </span>{' '}
                                    ?
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    Cette action est irréversible et supprimera définitivement toutes les données de cette consultation.
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
