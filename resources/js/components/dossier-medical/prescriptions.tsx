import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Calendar, Download, FileText, Pill, User } from 'lucide-react';
import { useState } from 'react';

export default function Prescriptions() {
    const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

    // Données fictives des prescriptions
    const prescriptions: Prescription[] = [
        {
            id: 'P-001',
            date: '12/05/2023',
            medecin: 'Dr. Laurent Martin',
            specialite: 'Médecin généraliste',
            medicaments: [
                {
                    nom: 'Amlodipine',
                    dosage: '5mg',
                    posologie: '1 comprimé par jour',
                    duree: '30 jours',
                    instructions: "À prendre le matin avec un verre d'eau",
                },
            ],
            renouvellements: 0,
            statut: 'active',
        },
        {
            id: 'P-002',
            date: '10/08/2023',
            medecin: 'Dr. Laurent Martin',
            specialite: 'Médecin généraliste',
            medicaments: [
                {
                    nom: 'Paracétamol',
                    dosage: '1000mg',
                    posologie: '1 comprimé toutes les 6 heures si nécessaire',
                    duree: '5 jours',
                    instructions: 'Ne pas dépasser 4 comprimés par jour',
                },
                {
                    nom: "Spray nasal à l'eau de mer",
                    dosage: '',
                    posologie: '2-3 pulvérisations par narine 3 fois par jour',
                    duree: '7 jours',
                    instructions: 'Se moucher avant utilisation',
                },
            ],
            renouvellements: 0,
            statut: 'terminée',
        },
        {
            id: 'P-003',
            date: '05/10/2023',
            medecin: 'Dr. Laurent Martin',
            specialite: 'Médecin généraliste',
            medicaments: [
                {
                    nom: 'Amlodipine',
                    dosage: '5mg',
                    posologie: '1 comprimé par jour',
                    duree: '90 jours',
                    instructions: "À prendre le matin avec un verre d'eau",
                },
            ],
            renouvellements: 2,
            statut: 'active',
        },
        {
            id: 'P-004',
            date: '20/01/2024',
            medecin: 'Dr. Laurent Martin',
            specialite: 'Médecin généraliste',
            medicaments: [
                {
                    nom: 'Ibuprofène',
                    dosage: '400mg',
                    posologie: '1 comprimé 3 fois par jour',
                    duree: '5 jours',
                    instructions: 'À prendre pendant les repas',
                },
                {
                    nom: 'Myorelaxant',
                    dosage: '50mg',
                    posologie: '1 comprimé au coucher',
                    duree: '5 jours',
                    instructions: 'Peut provoquer une somnolence, ne pas conduire après la prise',
                },
            ],
            renouvellements: 0,
            statut: 'terminée',
        },
    ];

    const getStatusBadge = (statut: string) => {
        switch (statut) {
            case 'active':
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
            case 'terminée':
                return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Terminée</Badge>;
            case 'renouvelée':
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Renouvelée</Badge>;
            default:
                return <Badge variant="outline">{statut}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="mb-4 text-xl font-semibold">Prescriptions Médicales</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Médecin</TableHead>
                        <TableHead>Médicaments</TableHead>
                        <TableHead>Renouvellements</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {prescriptions.map((prescription) => (
                        <TableRow key={prescription.id}>
                            <TableCell>{prescription.date}</TableCell>
                            <TableCell>{prescription.medecin}</TableCell>
                            <TableCell>{prescription.medicaments.length} médicament(s)</TableCell>
                            <TableCell>{prescription.renouvellements}</TableCell>
                            <TableCell>{getStatusBadge(prescription.statut)}</TableCell>
                            <TableCell className="text-right">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={() => setSelectedPrescription(prescription)}>
                                            Détails
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                        <DialogHeader>
                                            <DialogTitle>Détails de la Prescription</DialogTitle>
                                        </DialogHeader>
                                        {selectedPrescription && (
                                            <div className="mt-4 space-y-6">
                                                <div className="flex flex-col gap-4 md:flex-row">
                                                    <Card className="flex-1">
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="text-base font-medium">Informations</CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="space-y-3">
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="text-muted-foreground h-4 w-4" />
                                                                <span>{selectedPrescription.date}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <User className="text-muted-foreground h-4 w-4" />
                                                                <span>{selectedPrescription.medecin}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <FileText className="text-muted-foreground h-4 w-4" />
                                                                <span>{selectedPrescription.specialite}</span>
                                                            </div>
                                                            <div>
                                                                <p className="mb-1 text-sm font-medium">Statut</p>
                                                                {getStatusBadge(selectedPrescription.statut)}
                                                            </div>
                                                            {selectedPrescription.renouvellements > 0 && (
                                                                <div>
                                                                    <p className="mb-1 text-sm font-medium">Renouvellements</p>
                                                                    <span>{selectedPrescription.renouvellements}</span>
                                                                </div>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                </div>

                                                <Card>
                                                    <CardHeader className="pb-2">
                                                        <CardTitle className="text-base font-medium">Médicaments Prescrits</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="space-y-6">
                                                            {selectedPrescription.medicaments.map((medicament, index) => (
                                                                <div key={index} className="rounded-lg border p-4">
                                                                    <div className="mb-3 flex items-start gap-3">
                                                                        <Pill className="text-primary mt-0.5 h-5 w-5" />
                                                                        <div>
                                                                            <h4 className="font-medium">{medicament.nom}</h4>
                                                                            {medicament.dosage && (
                                                                                <p className="text-muted-foreground text-sm">{medicament.dosage}</p>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                                                                        <div>
                                                                            <p className="mb-1 text-sm font-medium">Posologie</p>
                                                                            <p className="text-sm">{medicament.posologie}</p>
                                                                        </div>
                                                                        <div>
                                                                            <p className="mb-1 text-sm font-medium">Durée</p>
                                                                            <p className="text-sm">{medicament.duree}</p>
                                                                        </div>
                                                                    </div>

                                                                    {medicament.instructions && (
                                                                        <div className="mt-3 border-t pt-3">
                                                                            <div className="flex items-start gap-2">
                                                                                <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
                                                                                <p className="text-sm">{medicament.instructions}</p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                <div className="flex justify-end">
                                                    <Button variant="outline" className="gap-2">
                                                        <Download className="h-4 w-4" />
                                                        Télécharger l'ordonnance
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

interface Medicament {
    nom: string;
    dosage: string;
    posologie: string;
    duree: string;
    instructions: string;
}

interface Prescription {
    id: string;
    date: string;
    medecin: string;
    specialite: string;
    medicaments: Medicament[];
    renouvellements: number;
    statut: string;
}
