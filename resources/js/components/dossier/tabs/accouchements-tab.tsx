'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { InfoItem } from '@/components/ui/info-item';
import { useDossierPatient } from '@/contexts/dossier-patient-context';
import { useFormHandlers } from '@/hooks/use-form-handlers';
import { formatDateTime } from '@/utils/date-formatters';
import { Edit, Eye, Heart, MoreVertical, Plus, Trash2 } from 'lucide-react';

export function AccouchementsTab() {
    const { dossier, setDialogType, setIsDialogOpen } = useDossierPatient();
    const { handleDelete } = useFormHandlers();

    const openDialog = () => {
        setDialogType('accouchement');
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Accouchements</span>
                </CardTitle>
                <Button onClick={openDialog} className="bg-pink-500 text-white transition-colors hover:bg-pink-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Nouvel accouchement
                </Button>
            </div>

            <div className="space-y-4">
                {dossier.accouchements?.length ? (
                    dossier.accouchements.map((accouchement) => (
                        <Card key={accouchement.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">
                                        {/* @ts-expect-error - accouchement type */}
                                        Accouchement du {formatDateTime(accouchement.date_accouchement)} à {accouchement.heure_accouchement}
                                    </CardTitle>
                                    <div className="flex items-center space-x-2">
                                        {/* @ts-expect-error - accouchement type */}
                                        {accouchement.mode_accouchement && (
                                            /* @ts-expect-error - accouchement type */
                                            <Badge variant="outline">{accouchement.mode_accouchement}</Badge>
                                        )}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Voir les détails
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Modifier
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                {/* @ts-expect-error - accouchement type */}
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete('accouchement', accouchement.id)}
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Informations générales */}
                                <div className="mb-4">
                                    <h4 className="mb-2 text-sm font-semibold text-pink-700">Informations générales</h4>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        <InfoItem
                                            label="Âge gestationnel"
                                            value={accouchement.age_gestationnel ? `${accouchement.age_gestationnel} SA` : '-'}
                                        />
                                        <InfoItem
                                            label="Travail"
                                            value={
                                                accouchement.travail === 'spontane'
                                                    ? 'Spontané'
                                                    : accouchement.travail === 'declenche'
                                                      ? 'Déclenché'
                                                      : '-'
                                            }
                                        />
                                        <InfoItem label="Présentation" value={accouchement.presentation || '-'} />
                                        <InfoItem label="Mode d'accouchement" value={accouchement.mode_accouchement || '-'} />
                                    </div>
                                </div>

                                {/* Périnée */}
                                <div className="mb-4">
                                    <h4 className="mb-2 text-sm font-semibold text-pink-700">Périnée</h4>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        <InfoItem label="Épisiotomie" value={accouchement.episiotomie ? 'Oui' : 'Non'} />
                                        <InfoItem label="Déchirure" value={accouchement.dechirure ? 'Oui' : 'Non'} />
                                    </div>
                                </div>

                                {/* Délivrance */}
                                <div className="mb-4">
                                    <h4 className="mb-2 text-sm font-semibold text-pink-700">Délivrance</h4>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        <InfoItem label="Délivrance" value={accouchement.delivrance || '-'} />
                                        <InfoItem label="Mode délivrance" value={accouchement.mode_delivrance || '-'} />
                                        <InfoItem
                                            label="Poids placenta"
                                            value={accouchement.poids_placenta ? `${accouchement.poids_placenta} g` : '-'}
                                        />
                                    </div>
                                </div>

                                {/* Nouveau-né */}
                                <div className="mb-4">
                                    <h4 className="mb-2 text-sm font-semibold text-pink-700">Nouveau-né</h4>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        <InfoItem
                                            label="Sexe"
                                            value={accouchement.sexe === 'masculin' ? 'Masculin' : accouchement.sexe === 'feminin' ? 'Féminin' : '-'}
                                        />
                                        <InfoItem label="Poids" value={accouchement.poids_bebe ? `${accouchement.poids_bebe} g` : '-'} />
                                        <InfoItem label="Taille" value={accouchement.taille_bebe ? `${accouchement.taille_bebe} cm` : '-'} />
                                        <InfoItem
                                            label="Périmètre crânien"
                                            value={accouchement.perimetre_cranien_bebe ? `${accouchement.perimetre_cranien_bebe} cm` : '-'}
                                        />
                                        <InfoItem
                                            label="Périmètre thoracique"
                                            value={accouchement.perimetre_thoracique_bebe ? `${accouchement.perimetre_thoracique_bebe} cm` : '-'}
                                        />
                                        <InfoItem label="Peau à peau" value={accouchement.peau_a_peau ? 'Oui' : 'Non'} />
                                        <InfoItem label="Mise au sein" value={accouchement.mise_au_sein ? 'Oui' : 'Non'} />
                                        <InfoItem label="Vitamine K" value={accouchement.vitamine_k ? 'Oui' : 'Non'} />
                                    </div>
                                </div>

                                {accouchement.complications && (
                                    <div className="mt-4 rounded-md border border-yellow-200 bg-yellow-50 p-3">
                                        <h4 className="mb-1 text-sm font-semibold text-yellow-800">Complications</h4>
                                        <p className="text-sm text-yellow-700">{accouchement.complications}</p>
                                    </div>
                                )}

                                {accouchement.observations && (
                                    <div className="mt-4">
                                        <h4 className="mb-1 text-sm font-semibold">Observations</h4>
                                        <p className="text-muted-foreground text-sm">{accouchement.observations}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardContent className="text-muted-foreground py-8 text-center">Aucun accouchement enregistré</CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
