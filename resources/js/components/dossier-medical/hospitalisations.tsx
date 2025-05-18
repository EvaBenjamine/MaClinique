import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building, Calendar, Clock, FileText, User } from 'lucide-react';
import { useState } from 'react';

export default function Hospitalisations() {
    const [selectedHospitalisation, setSelectedHospitalisation] = useState<Hospitalisation | null>(null);

    // Données fictives des hospitalisations
    const hospitalisations: Hospitalisation[] = [
        {
            id: 'H-001',
            dateAdmission: '05/03/2020',
            dateSortie: '12/03/2020',
            etablissement: 'Hôpital Universitaire',
            service: 'Pneumologie',
            medecinReferent: 'Dr. Philippe Dubois',
            motif: 'Pneumonie',
            diagnostic: 'Pneumonie bactérienne du lobe inférieur droit',
            traitements: ['Antibiothérapie intraveineuse (Amoxicilline/Acide clavulanique)', 'Oxygénothérapie', 'Kinésithérapie respiratoire'],
            resume: 'Admission pour pneumonie avec fièvre et détresse respiratoire modérée. Évolution favorable sous antibiothérapie. Sortie avec traitement antibiotique oral pour 7 jours supplémentaires.',
            statut: 'terminée',
        },
        {
            id: 'H-002',
            dateAdmission: '18/09/2022',
            dateSortie: '19/09/2022',
            etablissement: 'Clinique Chirurgicale',
            service: 'Chirurgie ambulatoire',
            medecinReferent: 'Dr. Marie Leroy',
            motif: 'Arthroscopie du genou',
            diagnostic: 'Lésion méniscale interne du genou droit',
            traitements: ['Arthroscopie avec méniscectomie partielle', 'Analgésiques', 'Anticoagulant préventif'],
            resume: 'Intervention en chirurgie ambulatoire pour lésion méniscale. Procédure sans complication. Sortie le jour même avec consignes de rééducation.',
            statut: 'terminée',
        },
    ];

    const getStatusBadge = (statut: string) => {
        switch (statut) {
            case 'terminée':
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Terminée</Badge>;
            case 'en cours':
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">En cours</Badge>;
            default:
                return <Badge variant="outline">{statut}</Badge>;
        }
    };

    // Calcul de la durée d'hospitalisation
    const calculerDuree = (dateAdmission: string, dateSortie: string) => {
        if (!dateSortie) return 'En cours';

        const [jourAdm, moisAdm, anneeAdm] = dateAdmission.split('/').map(Number);
        const [jourSor, moisSor, anneeSor] = dateSortie.split('/').map(Number);

        const dateAdm = new Date(anneeAdm, moisAdm - 1, jourAdm);
        const dateSor = new Date(anneeSor, moisSor - 1, jourSor);

        const diffTime = Math.abs(dateSor.getTime() - dateAdm.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return `${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    };

    return (
        <div className="space-y-6">
            <h2 className="mb-4 text-xl font-semibold">Hospitalisations</h2>

            {hospitalisations.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date d'admission</TableHead>
                            <TableHead>Date de sortie</TableHead>
                            <TableHead>Durée</TableHead>
                            <TableHead>Établissement</TableHead>
                            <TableHead>Motif</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {hospitalisations.map((hospitalisation) => (
                            <TableRow key={hospitalisation.id}>
                                <TableCell>{hospitalisation.dateAdmission}</TableCell>
                                <TableCell>{hospitalisation.dateSortie || '-'}</TableCell>
                                <TableCell>{calculerDuree(hospitalisation.dateAdmission, hospitalisation.dateSortie)}</TableCell>
                                <TableCell>{hospitalisation.etablissement}</TableCell>
                                <TableCell>{hospitalisation.motif}</TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" onClick={() => setSelectedHospitalisation(hospitalisation)}>
                                                Détails
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl">
                                            <DialogHeader>
                                                <DialogTitle>Détails de l'Hospitalisation</DialogTitle>
                                            </DialogHeader>
                                            {selectedHospitalisation && (
                                                <div className="mt-4 space-y-6">
                                                    <div className="flex flex-col gap-4 md:flex-row">
                                                        <Card className="flex-1">
                                                            <CardHeader className="pb-2">
                                                                <CardTitle className="text-base font-medium">Informations</CardTitle>
                                                            </CardHeader>
                                                            <CardContent className="space-y-3">
                                                                <div className="flex items-center gap-2">
                                                                    <Calendar className="text-muted-foreground h-4 w-4" />
                                                                    <span>
                                                                        Du {selectedHospitalisation.dateAdmission} au{' '}
                                                                        {selectedHospitalisation.dateSortie || 'en cours'}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Clock className="text-muted-foreground h-4 w-4" />
                                                                    <span>
                                                                        Durée:{' '}
                                                                        {calculerDuree(
                                                                            selectedHospitalisation.dateAdmission,
                                                                            selectedHospitalisation.dateSortie,
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Building className="text-muted-foreground h-4 w-4" />
                                                                    <span>{selectedHospitalisation.etablissement}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <FileText className="text-muted-foreground h-4 w-4" />
                                                                    <span>Service: {selectedHospitalisation.service}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <User className="text-muted-foreground h-4 w-4" />
                                                                    <span>Médecin: {selectedHospitalisation.medecinReferent}</span>
                                                                </div>
                                                                <div>
                                                                    <p className="mb-1 text-sm font-medium">Statut</p>
                                                                    {getStatusBadge(selectedHospitalisation.statut)}
                                                                </div>
                                                            </CardContent>
                                                        </Card>

                                                        <Card className="flex-1">
                                                            <CardHeader className="pb-2">
                                                                <CardTitle className="text-base font-medium">Motif et Diagnostic</CardTitle>
                                                            </CardHeader>
                                                            <CardContent className="space-y-3">
                                                                <div>
                                                                    <p className="mb-1 text-sm font-medium">Motif d'admission</p>
                                                                    <p>{selectedHospitalisation.motif}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="mb-1 text-sm font-medium">Diagnostic</p>
                                                                    <p>{selectedHospitalisation.diagnostic}</p>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </div>

                                                    <Card>
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="text-base font-medium">Traitements administrés</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <ul className="list-disc space-y-1 pl-5">
                                                                {selectedHospitalisation.traitements.map((traitement, index) => (
                                                                    <li key={index}>{traitement}</li>
                                                                ))}
                                                            </ul>
                                                        </CardContent>
                                                    </Card>

                                                    <Card>
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="text-base font-medium">Résumé du séjour</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <p>{selectedHospitalisation.resume}</p>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <Card>
                    <CardContent className="py-6 text-center">
                        <p className="text-muted-foreground">Aucune hospitalisation enregistrée</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

interface Hospitalisation {
    id: string;
    dateAdmission: string;
    dateSortie: string;
    etablissement: string;
    service: string;
    medecinReferent: string;
    motif: string;
    diagnostic: string;
    traitements: string[];
    resume: string;
    statut: string;
}
