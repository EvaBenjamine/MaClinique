import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Clock, Stethoscope, User } from 'lucide-react';
import { useState } from 'react';

export default function Consultations() {
    const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

    // Données fictives des consultations
    const consultations: Consultation[] = [
        {
            id: 'C-001',
            date: '12/05/2023',
            heure: '09:30',
            medecin: 'Dr. Laurent Martin',
            specialite: 'Médecin généraliste',
            motif: 'Consultation de routine',
            notes: 'La patiente se porte bien. Tension artérielle légèrement élevée (140/90). Recommandation de réduire la consommation de sel et de pratiquer une activité physique régulière.',
            prescriptions: ['Amlodipine 5mg, 1 comprimé par jour pendant 30 jours'],
            statut: 'terminée',
        },
        {
            id: 'C-002',
            date: '28/06/2023',
            heure: '14:15',
            medecin: 'Dr. Sophie Dubois',
            specialite: 'Dermatologue',
            motif: 'Examen dermatologique',
            notes: 'Examen de routine des grains de beauté. Aucune anomalie détectée. Recommandation de protection solaire renforcée.',
            prescriptions: [],
            statut: 'terminée',
        },
        {
            id: 'C-003',
            date: '10/08/2023',
            heure: '11:00',
            medecin: 'Dr. Laurent Martin',
            specialite: 'Médecin généraliste',
            motif: 'Syndrome grippal',
            notes: 'Symptômes: fièvre (38.5°C), maux de gorge, congestion nasale. Diagnostic: infection virale de type grippal. Repos recommandé pendant 3-4 jours.',
            prescriptions: [
                'Paracétamol 1000mg, 1 comprimé toutes les 6 heures si nécessaire',
                "Spray nasal à l'eau de mer, 2-3 pulvérisations par narine 3 fois par jour",
            ],
            statut: 'terminée',
        },
        {
            id: 'C-004',
            date: '05/10/2023',
            heure: '16:30',
            medecin: 'Dr. Laurent Martin',
            specialite: 'Médecin généraliste',
            motif: 'Suivi tension artérielle',
            notes: "Tension artérielle normalisée (130/85). Poursuite du traitement actuel. Encouragement à maintenir l'activité physique régulière.",
            prescriptions: ['Amlodipine 5mg, 1 comprimé par jour pendant 90 jours'],
            statut: 'terminée',
        },
        {
            id: 'C-005',
            date: '20/01/2024',
            heure: '10:00',
            medecin: 'Dr. Laurent Martin',
            specialite: 'Médecin généraliste',
            motif: 'Douleurs lombaires',
            notes: "Douleurs lombaires suite à un effort physique. Pas de signe de hernie discale. Prescription d'anti-inflammatoires et recommandation de repos relatif.",
            prescriptions: ['Ibuprofène 400mg, 1 comprimé 3 fois par jour pendant 5 jours', 'Myorelaxant, 1 comprimé au coucher pendant 5 jours'],
            statut: 'terminée',
        },
        {
            id: 'C-006',
            date: '15/05/2024',
            heure: '09:00',
            medecin: 'Dr. Laurent Martin',
            specialite: 'Médecin généraliste',
            motif: 'Consultation de routine',
            notes: '',
            prescriptions: [],
            statut: 'planifiée',
        },
    ];

    const getStatusBadge = (statut: string) => {
        switch (statut) {
            case 'terminée':
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Terminée</Badge>;
            case 'planifiée':
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Planifiée</Badge>;
            case 'annulée':
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Annulée</Badge>;
            default:
                return <Badge variant="outline">{statut}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="mb-4 text-xl font-semibold">Historique des Consultations</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Heure</TableHead>
                        <TableHead>Médecin</TableHead>
                        <TableHead>Motif</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {consultations.map((consultation) => (
                        <TableRow key={consultation.id}>
                            <TableCell>{consultation.date}</TableCell>
                            <TableCell>{consultation.heure}</TableCell>
                            <TableCell>{consultation.medecin}</TableCell>
                            <TableCell>{consultation.motif}</TableCell>
                            <TableCell>{getStatusBadge(consultation.statut)}</TableCell>
                            <TableCell className="text-right">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={() => setSelectedConsultation(consultation)}>
                                            Détails
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                        <DialogHeader>
                                            <DialogTitle>Détails de la Consultation</DialogTitle>
                                        </DialogHeader>
                                        {selectedConsultation && (
                                            <div className="mt-4 space-y-6">
                                                <div className="flex flex-col gap-4 md:flex-row">
                                                    <Card className="flex-1">
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="text-base font-medium">Informations</CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="space-y-3">
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="text-muted-foreground h-4 w-4" />
                                                                <span>{selectedConsultation.date}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="text-muted-foreground h-4 w-4" />
                                                                <span>{selectedConsultation.heure}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <User className="text-muted-foreground h-4 w-4" />
                                                                <span>{selectedConsultation.medecin}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Stethoscope className="text-muted-foreground h-4 w-4" />
                                                                <span>{selectedConsultation.specialite}</span>
                                                            </div>
                                                            <div>
                                                                <p className="mb-1 text-sm font-medium">Statut</p>
                                                                {getStatusBadge(selectedConsultation.statut)}
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    <Card className="flex-1">
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="text-base font-medium">Motif</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <p>{selectedConsultation.motif}</p>
                                                        </CardContent>
                                                    </Card>
                                                </div>

                                                <Card>
                                                    <CardHeader className="pb-2">
                                                        <CardTitle className="text-base font-medium">Notes du Médecin</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        {selectedConsultation.notes ? (
                                                            <p>{selectedConsultation.notes}</p>
                                                        ) : (
                                                            <p className="text-muted-foreground italic">Aucune note disponible</p>
                                                        )}
                                                    </CardContent>
                                                </Card>

                                                <Card>
                                                    <CardHeader className="pb-2">
                                                        <CardTitle className="text-base font-medium">Prescriptions</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        {selectedConsultation.prescriptions.length > 0 ? (
                                                            <ul className="list-disc space-y-1 pl-5">
                                                                {selectedConsultation.prescriptions.map((prescription, index) => (
                                                                    <li key={index}>{prescription}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="text-muted-foreground italic">Aucune prescription</p>
                                                        )}
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
        </div>
    );
}

interface Consultation {
    id: string;
    date: string;
    heure: string;
    medecin: string;
    specialite: string;
    motif: string;
    notes: string;
    prescriptions: string[];
    statut: string;
}
