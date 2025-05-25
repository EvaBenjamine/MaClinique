'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
    AlertTriangle,
    Baby,
    Calendar,
    CalendarPlus,
    ClipboardList,
    Download,
    Edit,
    Eye,
    FileText,
    Heart,
    MessageSquare,
    Pill,
    Plus,
    Stethoscope,
    TestTube,
    Trash2,
    Upload,
    User,
} from 'lucide-react';
import { useState } from 'react';

interface DossierPatientProps {
    dossier: {
        id: number;
        patiente_id: number;
        sage_femme_id: number;
        date_derniere_regle: string | null;
        date_accouchement_prevue: string | null;
        grossesse_multiple: boolean;
        nombre_foetus: number | null;
        grossesse_a_risque: boolean;
        facteurs_risque: string | null;
        nombre_grossesses_anterieures: number;
        nombre_accouchements: number;
        nombre_avortements: number;
        nombre_enfants_vivants: number;
        antecedents_medicaux: string | null;
        antecedents_chirurgicaux: string | null;
        antecedents_familiaux: string | null;
        antecedents_gynecologiques: string | null;
        antecedents_obstetricaux: string | null;
        allergies: string | null;
        traitements_en_cours: string | null;
        maladies_chroniques: string | null;
        tabac: boolean;
        alcool: boolean;
        activite_physique: string | null;
        regime_alimentaire: string | null;
        statut_dossier: string;
        date_derniere_consultation: string | null;
        notes_importantes: string | null;
        recommandations_particulieres: string | null;
        patiente?: {
            nom: string;
            prenom: string;
            date_naissance: string;
            telephone: string;
            email: string;
        };
        sage_femme?: {
            nom: string;
            prenom: string;
        };
        age_grossesse_semaines?: number;
        trimestre?: string;
        consultations?: any[];
        examens?: any[];
        prescriptions?: any[];
        rendez_vous?: any[];
        documents?: any[];
        notes_suivi?: any[];
        accouchements?: any[];
    };
}

export default function DossierPatientTabs({ dossier }: DossierPatientProps) {
    const [activeTab, setActiveTab] = useState('general');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<'consultation' | 'examen' | 'prescription' | 'rendez-vous' | 'document' | 'note' | 'accouchement'>(
        'consultation',
    );

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Non renseigné';
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    const formatDateTime = (dateString: string | null) => {
        if (!dateString) return 'Non renseigné';
        return new Date(dateString).toLocaleString('fr-FR');
    };

    const InfoItem = ({ label, value, icon: Icon }: { label: string; value: any; icon?: any }) => (
        <div className="flex items-start space-x-3 py-2">
            {Icon && <Icon className="text-muted-foreground mt-1 h-4 w-4" />}
            <div className="flex-1">
                <dt className="text-muted-foreground text-sm font-medium">{label}</dt>
                <dd className="text-foreground mt-1 text-sm">{value || 'Non renseigné'}</dd>
            </div>
        </div>
    );

    const openDialog = (type: typeof dialogType) => {
        setDialogType(type);
        setIsDialogOpen(true);
    };

    // Formulaire Consultation adapté au modèle
    const ConsultationForm = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="date">Date de consultation</Label>
                    <Input type="date" id="date" />
                </div>
                <div>
                    <Label htmlFor="type_consultation">Type de consultation</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="suivi_grossesse">Suivi de grossesse</SelectItem>
                            <SelectItem value="consultation_urgence">Consultation d'urgence</SelectItem>
                            <SelectItem value="consultation_controle">Consultation de contrôle</SelectItem>
                            <SelectItem value="consultation_prenatale">Consultation prénatale</SelectItem>
                            <SelectItem value="consultation_postnatale">Consultation postnatale</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Mesures physiques */}
            <div className="border-t pt-4">
                <h4 className="text-muted-foreground mb-3 text-sm font-medium">Mesures physiques</h4>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="poids">Poids (kg)</Label>
                        <Input type="number" step="0.1" id="poids" placeholder="65.5" />
                    </div>
                    <div>
                        <Label htmlFor="tension_arterielle_systolique">Tension systolique</Label>
                        <Input type="number" step="0.1" id="tension_arterielle_systolique" placeholder="120" />
                    </div>
                    <div>
                        <Label htmlFor="tension_arterielle_diastolique">Tension diastolique</Label>
                        <Input type="number" step="0.1" id="tension_arterielle_diastolique" placeholder="80" />
                    </div>
                </div>
            </div>

            {/* Mesures obstétricales */}
            <div className="border-t pt-4">
                <h4 className="text-muted-foreground mb-3 text-sm font-medium">Mesures obstétricales</h4>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="hauteur_uterine">Hauteur utérine (cm)</Label>
                        <Input type="number" step="0.1" id="hauteur_uterine" placeholder="32.5" />
                    </div>
                    <div>
                        <Label htmlFor="position_foetus">Position du fœtus</Label>
                        <Input id="position_foetus" placeholder="Vertex, siège, transverse..." />
                    </div>
                    <div>
                        <Label htmlFor="rythme_cardiaque_foetal">Rythme cardiaque fœtal (bpm)</Label>
                        <Input type="number" id="rythme_cardiaque_foetal" placeholder="140" />
                    </div>
                </div>
            </div>

            {/* Observations et prescriptions */}
            <div className="space-y-4 border-t pt-4">
                <div>
                    <Label htmlFor="observations">Observations</Label>
                    <Textarea id="observations" placeholder="Observations cliniques de la consultation..." rows={3} />
                </div>
                <div>
                    <Label htmlFor="prescriptions">Prescriptions</Label>
                    <Textarea id="prescriptions" placeholder="Médicaments prescrits..." rows={2} />
                </div>
                <div>
                    <Label htmlFor="examens_prescrits">Examens prescrits</Label>
                    <Textarea id="examens_prescrits" placeholder="Examens à réaliser..." rows={2} />
                </div>
                <div>
                    <Label htmlFor="recommandations">Recommandations</Label>
                    <Textarea id="recommandations" placeholder="Recommandations pour la patiente..." rows={2} />
                </div>
            </div>
        </div>
    );

    // Formulaire Examen adapté au modèle
    const ExamenForm = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="type">Type d'examen</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Échographie">Échographie</SelectItem>
                            <SelectItem value="Prise de sang">Prise de sang</SelectItem>
                            <SelectItem value="Analyse d'urine">Analyse d'urine</SelectItem>
                            <SelectItem value="Monitoring fœtal">Monitoring fœtal</SelectItem>
                            <SelectItem value="Amniocentèse">Amniocentèse</SelectItem>
                            <SelectItem value="Biopsie de trophoblaste">Biopsie de trophoblaste</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="date">Date d'examen</Label>
                    <Input type="date" id="date" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="prescrit_par">Prescrit par</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le prescripteur" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Dr. Alice Smith</SelectItem>
                            <SelectItem value="2">Dr. Marie Dubois</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="realise_par">Réalisé par</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le réalisateur" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Dr. Alice Smith</SelectItem>
                            <SelectItem value="2">Dr. Marie Dubois</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <Label htmlFor="resultats">Résultats</Label>
                <Textarea id="resultats" placeholder="Résultats de l'examen..." rows={3} />
            </div>
            <div>
                <Label htmlFor="interpretation">Interprétation</Label>
                <Textarea id="interpretation" placeholder="Interprétation médicale..." rows={3} />
            </div>
            <div>
                <Label htmlFor="fichier_rapport">Fichier rapport</Label>
                <Input type="file" id="fichier_rapport" accept=".pdf,.doc,.docx,.jpg,.png" />
            </div>
        </div>
    );

    // Formulaire Prescription adapté au modèle
    const PrescriptionForm = () => (
        <div className="space-y-4">
            <div>
                <Label htmlFor="consultation_id">Consultation associée</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une consultation" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Consultation du 15/02/2024</SelectItem>
                        <SelectItem value="2">Consultation du 15/01/2024</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="medicament">Médicament</Label>
                    <Input id="medicament" placeholder="Nom du médicament" />
                </div>
                <div>
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input id="dosage" placeholder="500mg, 5ml..." />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="frequence">Fréquence</Label>
                    <Input id="frequence" placeholder="2 fois par jour, matin et soir..." />
                </div>
                <div>
                    <Label htmlFor="duree">Durée</Label>
                    <Input id="duree" placeholder="7 jours, 1 mois..." />
                </div>
            </div>
            <div>
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea id="instructions" placeholder="Instructions particulières pour la prise..." rows={3} />
            </div>
        </div>
    );

    // Formulaire RendezVous adapté au modèle
    const RendezVousForm = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="date_heure">Date et heure</Label>
                    <Input type="datetime-local" id="date_heure" />
                </div>
                <div>
                    <Label htmlFor="sage_femme_id">Sage-femme</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner la sage-femme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Dr. Alice Smith</SelectItem>
                            <SelectItem value="2">Dr. Marie Dubois</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="type_consultation">Type de consultation</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="suivi_grossesse">Suivi de grossesse</SelectItem>
                            <SelectItem value="consultation_urgence">Consultation d'urgence</SelectItem>
                            <SelectItem value="echographie">Échographie</SelectItem>
                            <SelectItem value="consultation_controle">Consultation de contrôle</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="statut">Statut</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="programme">Programmé</SelectItem>
                            <SelectItem value="confirme">Confirmé</SelectItem>
                            <SelectItem value="reporte">Reporté</SelectItem>
                            <SelectItem value="annule">Annulé</SelectItem>
                            <SelectItem value="termine">Terminé</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <Label htmlFor="motif">Motif</Label>
                <Textarea id="motif" placeholder="Motif du rendez-vous..." rows={2} />
            </div>
            <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Notes particulières..." rows={2} />
            </div>
        </div>
    );

    // Formulaire Document adapté au modèle
    const DocumentForm = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="titre">Titre du document</Label>
                    <Input id="titre" placeholder="Titre du document" />
                </div>
                <div>
                    <Label htmlFor="type_document">Type de document</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="echographie">Échographie</SelectItem>
                            <SelectItem value="analyse">Analyse médicale</SelectItem>
                            <SelectItem value="ordonnance">Ordonnance</SelectItem>
                            <SelectItem value="rapport">Rapport médical</SelectItem>
                            <SelectItem value="certificat">Certificat</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <Label htmlFor="date_document">Date du document</Label>
                <Input type="date" id="date_document" />
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Description du document..." rows={3} />
            </div>
            <div>
                <Label htmlFor="chemin_fichier">Fichier</Label>
                <Input type="file" id="chemin_fichier" accept=".pdf,.doc,.docx,.jpg,.png" />
            </div>
        </div>
    );

    // Formulaire NoteSuivi adapté au modèle
    const NoteSuiviForm = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="date_note">Date de la note</Label>
                    <Input type="date" id="date_note" />
                </div>
                <div>
                    <Label htmlFor="type_note">Type de note</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="observation">Observation</SelectItem>
                            <SelectItem value="recommandation">Recommandation</SelectItem>
                            <SelectItem value="alerte">Alerte</SelectItem>
                            <SelectItem value="suivi">Suivi</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <Label htmlFor="contenu">Contenu de la note</Label>
                <Textarea id="contenu" placeholder="Contenu de la note de suivi..." rows={5} />
            </div>
        </div>
    );

    // Nouveau formulaire Accouchement
    const AccouchementForm = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="date_accouchement">Date et heure d'accouchement</Label>
                    <Input type="datetime-local" id="date_accouchement" />
                </div>
                <div>
                    <Label htmlFor="type_accouchement">Type d'accouchement</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="voie_basse">Voie basse</SelectItem>
                            <SelectItem value="cesarienne">Césarienne</SelectItem>
                            <SelectItem value="forceps">Forceps</SelectItem>
                            <SelectItem value="ventouse">Ventouse</SelectItem>
                            <SelectItem value="episiotomie">Épisiotomie</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="border-t pt-4">
                <h4 className="text-muted-foreground mb-3 text-sm font-medium">Durée du travail</h4>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="duree_travail">Durée totale (heures)</Label>
                        <Input type="number" step="0.5" id="duree_travail" placeholder="8.5" />
                    </div>
                    <div>
                        <Label htmlFor="duree_expulsion">Durée expulsion (minutes)</Label>
                        <Input type="number" id="duree_expulsion" placeholder="45" />
                    </div>
                    <div>
                        <Label htmlFor="presentation">Présentation</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Présentation" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="vertex">Vertex</SelectItem>
                                <SelectItem value="siege">Siège</SelectItem>
                                <SelectItem value="face">Face</SelectItem>
                                <SelectItem value="front">Front</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="border-t pt-4">
                <h4 className="text-muted-foreground mb-3 text-sm font-medium">Informations du nouveau-né</h4>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <Label htmlFor="poids_bebe">Poids (g)</Label>
                        <Input type="number" id="poids_bebe" placeholder="3200" />
                    </div>
                    <div>
                        <Label htmlFor="taille_bebe">Taille (cm)</Label>
                        <Input type="number" id="taille_bebe" placeholder="50" />
                    </div>
                    <div>
                        <Label htmlFor="perimetre_cranien">Périmètre crânien (cm)</Label>
                        <Input type="number" step="0.1" id="perimetre_cranien" placeholder="35.5" />
                    </div>
                    <div>
                        <Label htmlFor="sexe">Sexe</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Sexe" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="masculin">Masculin</SelectItem>
                                <SelectItem value="feminin">Féminin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="border-t pt-4">
                <h4 className="text-muted-foreground mb-3 text-sm font-medium">Score d'Apgar</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="apgar_1min">Apgar 1 minute</Label>
                        <Input type="number" min="0" max="10" id="apgar_1min" placeholder="9" />
                    </div>
                    <div>
                        <Label htmlFor="apgar_5min">Apgar 5 minutes</Label>
                        <Input type="number" min="0" max="10" id="apgar_5min" placeholder="10" />
                    </div>
                </div>
            </div>

            <div className="space-y-4 border-t pt-4">
                <div>
                    <Label htmlFor="complications">Complications</Label>
                    <Textarea id="complications" placeholder="Complications éventuelles..." rows={2} />
                </div>
                <div>
                    <Label htmlFor="observations_accouchement">Observations</Label>
                    <Textarea id="observations_accouchement" placeholder="Observations sur l'accouchement..." rows={3} />
                </div>
                <div>
                    <Label htmlFor="equipe_medicale">Équipe médicale présente</Label>
                    <Textarea id="equipe_medicale" placeholder="Sage-femme, médecin, anesthésiste..." rows={2} />
                </div>
            </div>
        </div>
    );

    const getFormComponent = () => {
        switch (dialogType) {
            case 'consultation':
                return <ConsultationForm />;
            case 'examen':
                return <ExamenForm />;
            case 'prescription':
                return <PrescriptionForm />;
            case 'rendez-vous':
                return <RendezVousForm />;
            case 'document':
                return <DocumentForm />;
            case 'note':
                return <NoteSuiviForm />;
            case 'accouchement':
                return <AccouchementForm />;
            default:
                return <div>Formulaire non disponible</div>;
        }
    };

    const getDialogTitle = () => {
        switch (dialogType) {
            case 'consultation':
                return 'Nouvelle consultation';
            case 'examen':
                return 'Nouvel examen';
            case 'prescription':
                return 'Nouvelle prescription';
            case 'rendez-vous':
                return 'Nouveau rendez-vous';
            case 'document':
                return 'Nouveau document';
            case 'note':
                return 'Nouvelle note de suivi';
            case 'accouchement':
                return 'Nouvel accouchement';
            default:
                return 'Nouveau';
        }
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6 p-6">
            {/* En-tête du dossier */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <User className="text-primary h-8 w-8" />
                            <div>
                                <CardTitle className="text-2xl">
                                    {dossier.patiente ? `${dossier.patiente.prenom} ${dossier.patiente.nom}` : 'Patiente'}
                                </CardTitle>
                                <p className="text-muted-foreground">Dossier patient #{dossier.id}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Badge variant={dossier.grossesse_a_risque ? 'destructive' : 'secondary'}>
                                {dossier.grossesse_a_risque ? 'Grossesse à risque' : 'Grossesse normale'}
                            </Badge>
                            <Badge variant="outline">{dossier.statut_dossier}</Badge>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Onglets principaux */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-9">
                    <TabsTrigger value="general" className="flex items-center space-x-1">
                        <Baby className="h-4 w-4" />
                        <span className="hidden sm:inline">Général</span>
                    </TabsTrigger>
                    <TabsTrigger value="consultations" className="flex items-center space-x-1">
                        <Stethoscope className="h-4 w-4" />
                        <span className="hidden sm:inline">Consultations</span>
                    </TabsTrigger>
                    <TabsTrigger value="examens" className="flex items-center space-x-1">
                        <TestTube className="h-4 w-4" />
                        <span className="hidden sm:inline">Examens</span>
                    </TabsTrigger>
                    <TabsTrigger value="prescriptions" className="flex items-center space-x-1">
                        <Pill className="h-4 w-4" />
                        <span className="hidden sm:inline">Prescriptions</span>
                    </TabsTrigger>
                    <TabsTrigger value="rendez-vous" className="flex items-center space-x-1">
                        <CalendarPlus className="h-4 w-4" />
                        <span className="hidden sm:inline">RDV</span>
                    </TabsTrigger>
                    <TabsTrigger value="accouchements" className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span className="hidden sm:inline">Accouchements</span>
                    </TabsTrigger>
                    <TabsTrigger value="documents" className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span className="hidden sm:inline">Documents</span>
                    </TabsTrigger>
                    <TabsTrigger value="antecedents" className="flex items-center space-x-1">
                        <ClipboardList className="h-4 w-4" />
                        <span className="hidden sm:inline">Antécédents</span>
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span className="hidden sm:inline">Notes</span>
                    </TabsTrigger>
                </TabsList>

                {/* Onglet Général */}
                <TabsContent value="general" className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Baby className="h-5 w-5" />
                                    <span>Informations de grossesse</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <InfoItem label="Date des dernières règles" value={formatDate(dossier.date_derniere_regle)} icon={Calendar} />
                                <InfoItem label="Date d'accouchement prévue" value={formatDate(dossier.date_accouchement_prevue)} icon={Calendar} />
                                <InfoItem
                                    label="Âge de grossesse"
                                    value={dossier.age_grossesse_semaines ? `${dossier.age_grossesse_semaines} semaines` : 'Non calculé'}
                                />
                                <InfoItem label="Trimestre" value={dossier.trimestre || 'Non déterminé'} />
                                <InfoItem label="Grossesse multiple" value={dossier.grossesse_multiple ? 'Oui' : 'Non'} />
                                {dossier.grossesse_multiple && <InfoItem label="Nombre de fœtus" value={dossier.nombre_foetus} />}
                                {dossier.grossesse_a_risque && (
                                    <InfoItem label="Facteurs de risque" value={dossier.facteurs_risque} icon={AlertTriangle} />
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <ClipboardList className="h-5 w-5" />
                                    <span>Historique obstétrical</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <InfoItem label="Grossesses antérieures" value={dossier.nombre_grossesses_anterieures} />
                                <InfoItem label="Accouchements" value={dossier.nombre_accouchements} />
                                <InfoItem label="Avortements" value={dossier.nombre_avortements} />
                                <InfoItem label="Enfants vivants" value={dossier.nombre_enfants_vivants} />
                                <InfoItem
                                    label="Sage-femme référente"
                                    value={dossier.sage_femme ? `${dossier.sage_femme.prenom} ${dossier.sage_femme.nom}` : 'Non assignée'}
                                    icon={User}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Onglet Consultations */}
                <TabsContent value="consultations" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2">
                                    <Stethoscope className="h-5 w-5" />
                                    <span>Consultations</span>
                                </CardTitle>
                                <Button onClick={() => openDialog('consultation')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Nouvelle consultation
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Poids</TableHead>
                                        <TableHead>Tension</TableHead>
                                        <TableHead>Hauteur utérine</TableHead>
                                        <TableHead>RCF</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{formatDate('2024-02-15')}</TableCell>
                                        <TableCell>Suivi de grossesse</TableCell>
                                        <TableCell>65.2 kg</TableCell>
                                        <TableCell>120/80</TableCell>
                                        <TableCell>32.5 cm</TableCell>
                                        <TableCell>142 bpm</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Onglet Examens */}
                <TabsContent value="examens" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2">
                                    <TestTube className="h-5 w-5" />
                                    <span>Examens</span>
                                </CardTitle>
                                <Button onClick={() => openDialog('examen')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Nouvel examen
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Prescrit par</TableHead>
                                        <TableHead>Réalisé par</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{formatDate('2024-02-10')}</TableCell>
                                        <TableCell>Échographie</TableCell>
                                        <TableCell>Dr. Smith</TableCell>
                                        <TableCell>Dr. Dubois</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">Terminé</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Onglet Prescriptions */}
                <TabsContent value="prescriptions" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2">
                                    <Pill className="h-5 w-5" />
                                    <span>Prescriptions</span>
                                </CardTitle>
                                <Button onClick={() => openDialog('prescription')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Nouvelle prescription
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Consultation</TableHead>
                                        <TableHead>Médicament</TableHead>
                                        <TableHead>Dosage</TableHead>
                                        <TableHead>Fréquence</TableHead>
                                        <TableHead>Durée</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>15/02/2024</TableCell>
                                        <TableCell>Acide folique</TableCell>
                                        <TableCell>5mg</TableCell>
                                        <TableCell>1 fois/jour</TableCell>
                                        <TableCell>Jusqu'à l'accouchement</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Onglet Rendez-vous */}
                <TabsContent value="rendez-vous" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2">
                                    <CalendarPlus className="h-5 w-5" />
                                    <span>Rendez-vous</span>
                                </CardTitle>
                                <Button onClick={() => openDialog('rendez-vous')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Nouveau rendez-vous
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date et heure</TableHead>
                                        <TableHead>Sage-femme</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Motif</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{formatDateTime('2024-03-15T10:00:00')}</TableCell>
                                        <TableCell>Dr. Smith</TableCell>
                                        <TableCell>Suivi grossesse</TableCell>
                                        <TableCell>
                                            <Badge variant="default">Programmé</Badge>
                                        </TableCell>
                                        <TableCell>Suivi mensuel</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Nouvel onglet Accouchements */}
                <TabsContent value="accouchements" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2">
                                    <Heart className="h-5 w-5" />
                                    <span>Accouchements</span>
                                </CardTitle>
                                <Button onClick={() => openDialog('accouchement')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Nouvel accouchement
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date et heure</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Durée travail</TableHead>
                                        <TableHead>Poids bébé</TableHead>
                                        <TableHead>Apgar</TableHead>
                                        <TableHead>Sexe</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{formatDateTime('2024-10-01T14:30:00')}</TableCell>
                                        <TableCell>Voie basse</TableCell>
                                        <TableCell>8h30</TableCell>
                                        <TableCell>3200g</TableCell>
                                        <TableCell>9/10</TableCell>
                                        <TableCell>Féminin</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Onglet Documents */}
                <TabsContent value="documents" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2">
                                    <FileText className="h-5 w-5" />
                                    <span>Documents</span>
                                </CardTitle>
                                <Button onClick={() => openDialog('document')}>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Ajouter un document
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Titre</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Date document</TableHead>
                                        <TableHead>Ajouté par</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Échographie T2</TableCell>
                                        <TableCell>Échographie</TableCell>
                                        <TableCell>{formatDate('2024-02-15')}</TableCell>
                                        <TableCell>Dr. Smith</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Onglet Antécédents */}
                <TabsContent value="antecedents" className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Antécédents médicaux</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <InfoItem label="Antécédents médicaux" value={dossier.antecedents_medicaux} />
                                <InfoItem label="Antécédents chirurgicaux" value={dossier.antecedents_chirurgicaux} />
                                <InfoItem label="Maladies chroniques" value={dossier.maladies_chroniques} />
                                <InfoItem label="Allergies" value={dossier.allergies} icon={AlertTriangle} />
                                <InfoItem label="Traitements en cours" value={dossier.traitements_en_cours} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Antécédents familiaux et gynécologiques</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <InfoItem label="Antécédents familiaux" value={dossier.antecedents_familiaux} />
                                <InfoItem label="Antécédents gynécologiques" value={dossier.antecedents_gynecologiques} />
                                <InfoItem label="Antécédents obstétricaux" value={dossier.antecedents_obstetricaux} />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Onglet Notes */}
                <TabsContent value="notes" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2">
                                    <MessageSquare className="h-5 w-5" />
                                    <span>Notes de suivi</span>
                                </CardTitle>
                                <Button onClick={() => openDialog('note')}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Nouvelle note
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Contenu</TableHead>
                                        <TableHead>Ajouté par</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{formatDate('2024-02-15')}</TableCell>
                                        <TableCell>Observation</TableCell>
                                        <TableCell>Patiente très anxieuse, nécessite un suivi rapproché</TableCell>
                                        <TableCell>Dr. Smith</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <MessageSquare className="h-5 w-5" />
                                    <span>Notes importantes du dossier</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none">
                                    <p className="text-sm whitespace-pre-wrap">{dossier.notes_importantes || 'Aucune note importante renseignée.'}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <ClipboardList className="h-5 w-5" />
                                    <span>Recommandations particulières</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none">
                                    <p className="text-sm whitespace-pre-wrap">
                                        {dossier.recommandations_particulieres || 'Aucune recommandation particulière renseignée.'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Dialog pour les formulaires */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{getDialogTitle()}</DialogTitle>
                    </DialogHeader>
                    {getFormComponent()}
                    <div className="mt-6 flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Annuler
                        </Button>
                        <Button onClick={() => setIsDialogOpen(false)}>Enregistrer</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
