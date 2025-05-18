import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building, Calendar, Download, FileText, User } from 'lucide-react';
import { useState } from 'react';

export default function Examens() {
    const [selectedExamen, setSelectedExamen] = useState<Examen | null>(null);

    // Données fictives des examens
    const examens: Examen[] = [
        {
            id: 'E-001',
            date: '15/05/2023',
            type: 'Analyse de sang',
            laboratoire: 'Laboratoire Central',
            prescripteur: 'Dr. Laurent Martin',
            resultats: {
                Hémoglobine: '13.5 g/dL (Normale: 12-16)',
                'Globules blancs': '7.2 x10^9/L (Normale: 4-10)',
                Plaquettes: '250 x10^9/L (Normale: 150-400)',
                'Glycémie à jeun': '5.2 mmol/L (Normale: 3.9-5.5)',
                'Cholestérol total': '5.1 mmol/L (Normale: <5.2)',
                HDL: '1.4 mmol/L (Normale: >1.0)',
                LDL: '3.1 mmol/L (Normale: <3.4)',
            },
            conclusion: 'Résultats dans les limites de la normale. Bilan lipidique satisfaisant.',
            statut: 'terminé',
        },
        {
            id: 'E-002',
            date: '20/06/2023',
            type: 'Radiographie thoracique',
            laboratoire: "Centre d'Imagerie Médicale",
            prescripteur: 'Dr. Laurent Martin',
            resultats: {},
            conclusion:
                "Absence d'anomalie parenchymateuse ou pleurale. Silhouette cardiaque de taille normale. Coupoles diaphragmatiques bien positionnées.",
            statut: 'terminé',
        },
        {
            id: 'E-003',
            date: '05/09/2023',
            type: 'Électrocardiogramme',
            laboratoire: 'Centre Cardiologique',
            prescripteur: 'Dr. Laurent Martin',
            resultats: {
                Rythme: 'Sinusal',
                Fréquence: '72 bpm',
                'Intervalle PR': '160 ms',
                QRS: '90 ms',
                'QT/QTc': '380/410 ms',
            },
            conclusion: "ECG normal. Pas de signe d'ischémie myocardique ou de trouble du rythme.",
            statut: 'terminé',
        },
        {
            id: 'E-004',
            date: '10/11/2023',
            type: 'Échographie abdominale',
            laboratoire: "Centre d'Imagerie Médicale",
            prescripteur: 'Dr. Laurent Martin',
            resultats: {},
            conclusion:
                'Foie de taille normale, à échostructure homogène. Voies biliaires non dilatées. Vésicule biliaire alithiasique. Rate, pancréas et reins sans anomalie décelable.',
            statut: 'terminé',
        },
        {
            id: 'E-005',
            date: '15/02/2024',
            type: 'Analyse de sang',
            laboratoire: 'Laboratoire Central',
            prescripteur: 'Dr. Laurent Martin',
            resultats: {
                Hémoglobine: '13.8 g/dL (Normale: 12-16)',
                'Globules blancs': '6.8 x10^9/L (Normale: 4-10)',
                Plaquettes: '270 x10^9/L (Normale: 150-400)',
                'Glycémie à jeun': '5.0 mmol/L (Normale: 3.9-5.5)',
                'Cholestérol total': '4.9 mmol/L (Normale: <5.2)',
                HDL: '1.5 mmol/L (Normale: >1.0)',
                LDL: '2.9 mmol/L (Normale: <3.4)',
            },
            conclusion: 'Résultats dans les limites de la normale. Amélioration du bilan lipidique par rapport au précédent.',
            statut: 'terminé',
        },
        {
            id: 'E-006',
            date: '20/05/2024',
            type: 'Densitométrie osseuse',
            laboratoire: "Centre d'Imagerie Médicale",
            prescripteur: 'Dr. Laurent Martin',
            resultats: {},
            conclusion: '',
            statut: 'planifié',
        },
    ];

    const getStatusBadge = (statut: string) => {
        switch (statut) {
            case 'terminé':
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Terminé</Badge>;
            case 'planifié':
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Planifié</Badge>;
            case 'en cours':
                return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">En cours</Badge>;
            case 'annulé':
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Annulé</Badge>;
            default:
                return <Badge variant="outline">{statut}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="mb-4 text-xl font-semibold">Examens Médicaux</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Laboratoire</TableHead>
                        <TableHead>Prescripteur</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {examens.map((examen) => (
                        <TableRow key={examen.id}>
                            <TableCell>{examen.date}</TableCell>
                            <TableCell>{examen.type}</TableCell>
                            <TableCell>{examen.laboratoire}</TableCell>
                            <TableCell>{examen.prescripteur}</TableCell>
                            <TableCell>{getStatusBadge(examen.statut)}</TableCell>
                            <TableCell className="text-right">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setSelectedExamen(examen)}
                                            disabled={examen.statut !== 'terminé'}
                                        >
                                            Résultats
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                        <DialogHeader>
                                            <DialogTitle>Résultats d'Examen</DialogTitle>
                                        </DialogHeader>
                                        {selectedExamen && (
                                            <div className="mt-4 space-y-6">
                                                <div className="flex flex-col gap-4 md:flex-row">
                                                    <Card className="flex-1">
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="text-base font-medium">Informations</CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="space-y-3">
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="text-muted-foreground h-4 w-4" />
                                                                <span>{selectedExamen.date}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <FileText className="text-muted-foreground h-4 w-4" />
                                                                <span>{selectedExamen.type}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Building className="text-muted-foreground h-4 w-4" />
                                                                <span>{selectedExamen.laboratoire}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <User className="text-muted-foreground h-4 w-4" />
                                                                <span>{selectedExamen.prescripteur}</span>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>

                                                {Object.keys(selectedExamen.resultats).length > 0 && (
                                                    <Card>
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="text-base font-medium">Résultats Détaillés</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <Table>
                                                                <TableHeader>
                                                                    <TableRow>
                                                                        <TableHead>Paramètre</TableHead>
                                                                        <TableHead>Valeur</TableHead>
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {Object.entries(selectedExamen.resultats).map(([key, value]) => (
                                                                        <TableRow key={key}>
                                                                            <TableCell className="font-medium">{key}</TableCell>
                                                                            <TableCell>{value}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </CardContent>
                                                    </Card>
                                                )}

                                                <Card>
                                                    <CardHeader className="pb-2">
                                                        <CardTitle className="text-base font-medium">Conclusion</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p>{selectedExamen.conclusion}</p>
                                                    </CardContent>
                                                </Card>

                                                <div className="flex justify-end">
                                                    <Button variant="outline" className="gap-2">
                                                        <Download className="h-4 w-4" />
                                                        Télécharger le rapport
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

interface Examen {
    id: string;
    date: string;
    type: string;
    laboratoire: string;
    prescripteur: string;
    resultats: Record<string, string>;
    conclusion: string;
    statut: string;
}
