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
import { router, useForm, usePage } from '@inertiajs/react';
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
            age: number;
            numero_telephone: string;
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
    sages_femmes?: Array<{
        id: number;
        nom: string;
        prenom: string;
    }>;
}

export default function DossierPatientTabs({ dossier, sages_femmes = [] }: DossierPatientProps) {
    const [activeTab, setActiveTab] = useState('general');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<'consultation' | 'examen' | 'prescription' | 'rendez-vous' | 'document' | 'note' | 'accouchement'>(
        'consultation',
    );
    const { auth } = usePage().props;

    // Formulaires Inertia pour chaque type
    const consultationForm = useForm({
        dossier_patient_id: dossier.id,
        sage_femme_id: auth.user.id,
        date: '',
        type_consultation: '',
        poids: '',
        tension_arterielle_systolique: '',
        tension_arterielle_diastolique: '',
        hauteur_uterine: '',
        position_foetus: '',
        rythme_cardiaque_foetal: '',
        observations: '',
        prescriptions: '',
        examens_prescrits: '',
        recommandations: '',
    });

    const examenForm = useForm({
        dossier_patient_id: dossier.id,
        type: '',
        date_examen: '',
        prescrit_par: '',
        realise_par: '',
        resultats: '',
        interpretation: '',
        fichier_rapport: null as File | null,
    });

    const prescriptionForm = useForm({
        dossier_id: dossier.id,
        consultation_id: '',
        medicament: '',
        dosage: '',
        frequence: '',
        duree: '',
        instructions: '',
    });

    const rendezVousForm = useForm({
        dossier_id: dossier.id,
        date_heure: '',
        sage_femme_id: '',
        type_consultation: '',
        statut: '',
        motif: '',
        notes: '',
    });

    const documentForm = useForm({
        dossier_id: dossier.id,
        titre: '',
        type_document: '',
        date_document: '',
        description: '',
        chemin_fichier: null as File | null,
    });

    const noteSuiviForm = useForm({
        dossier_id: dossier.id,
        date_note: '',
        type_note: '',
        contenu: '',
    });

    const accouchementForm = useForm({
        dossier_id: dossier.id,
        date_accouchement: '',
        type_accouchement: '',
        duree_travail: '',
        duree_expulsion: '',
        presentation: '',
        poids_bebe: '',
        taille_bebe: '',
        perimetre_cranien: '',
        sexe: '',
        apgar_1min: '',
        apgar_5min: '',
        complications: '',
        observations_accouchement: '',
        equipe_medicale: '',
    });

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

    const getCurrentForm = () => {
        switch (dialogType) {
            case 'consultation':
                return consultationForm;
            case 'examen':
                return examenForm;
            case 'prescription':
                return prescriptionForm;
            case 'rendez-vous':
                return rendezVousForm;
            case 'document':
                return documentForm;
            case 'note':
                return noteSuiviForm;
            case 'accouchement':
                return accouchementForm;
            default:
                return consultationForm;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = getCurrentForm();

        // URLs pour les routes Laravel
        const routes = {
            consultation: route('consultations.store'),
            examen: route('examens.store'),
            prescription: route('prescriptions.store'),
            'rendez-vous': route('rendez-vous.store'),
            document: route('documents.store'),
            note: route('notes-suivi.store'),
            accouchement: route('accouchements.store'),
        };

        form.post(routes[dialogType], {
            onSuccess: () => {
                setIsDialogOpen(false);
                form.reset();
            },
            onError: (errors) => {
                console.error('Erreurs de validation:', errors);
            },
        });
    };

    const handleDelete = (type: string, id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
            const routes = {
                consultation: route('consultations.destroy', id),
                examen: route('examens.destroy', id),
                prescription: route('prescriptions.destroy', id),
                'rendez-vous': route('rendez-vous.destroy', id),
                document: route('documents.destroy', id),
                note: route('notes-suivi.destroy', id),
                accouchement: route('accouchements.destroy', id),
            };

            router.delete(routes[type as keyof typeof routes]);
        }
    };

    // Formulaire Consultation
    const ConsultationForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="date">Date de consultation</Label>
                    <Input
                        type="date"
                        id="date"
                        value={consultationForm.data.date}
                        onChange={(e) => consultationForm.setData('date', e.target.value)}
                    />
                    {consultationForm.errors.date && <p className="mt-1 text-sm text-red-500">{consultationForm.errors.date}</p>}
                </div>
                <div>
                    <Label htmlFor="type_consultation">Type de consultation</Label>
                    <Select
                        value={consultationForm.data.type_consultation}
                        onValueChange={(value) => consultationForm.setData('type_consultation', value)}
                    >
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
                    {consultationForm.errors.type_consultation && (
                        <p className="mt-1 text-sm text-red-500">{consultationForm.errors.type_consultation}</p>
                    )}
                </div>
            </div>

            {/* Mesures physiques */}
            <div className="border-t pt-4">
                <h4 className="text-muted-foreground mb-3 text-sm font-medium">Mesures physiques</h4>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="poids">Poids (kg)</Label>
                        <Input
                            type="number"
                            step="0.1"
                            id="poids"
                            placeholder="65.5"
                            value={consultationForm.data.poids}
                            onChange={(e) => consultationForm.setData('poids', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="tension_arterielle_systolique">Tension systolique</Label>
                        <Input
                            type="number"
                            step="0.1"
                            id="tension_arterielle_systolique"
                            placeholder="120"
                            value={consultationForm.data.tension_arterielle_systolique}
                            onChange={(e) => consultationForm.setData('tension_arterielle_systolique', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="tension_arterielle_diastolique">Tension diastolique</Label>
                        <Input
                            type="number"
                            step="0.1"
                            id="tension_arterielle_diastolique"
                            placeholder="80"
                            value={consultationForm.data.tension_arterielle_diastolique}
                            onChange={(e) => consultationForm.setData('tension_arterielle_diastolique', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Mesures obstétricales */}
            <div className="border-t pt-4">
                <h4 className="text-muted-foreground mb-3 text-sm font-medium">Mesures obstétricales</h4>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="hauteur_uterine">Hauteur utérine (cm)</Label>
                        <Input
                            type="number"
                            step="0.1"
                            id="hauteur_uterine"
                            placeholder="32.5"
                            value={consultationForm.data.hauteur_uterine}
                            onChange={(e) => consultationForm.setData('hauteur_uterine', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="position_foetus">Position du fœtus</Label>
                        <Input
                            id="position_foetus"
                            placeholder="Vertex, siège, transverse..."
                            value={consultationForm.data.position_foetus}
                            onChange={(e) => consultationForm.setData('position_foetus', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="rythme_cardiaque_foetal">Rythme cardiaque fœtal (bpm)</Label>
                        <Input
                            type="number"
                            id="rythme_cardiaque_foetal"
                            placeholder="140"
                            value={consultationForm.data.rythme_cardiaque_foetal}
                            onChange={(e) => consultationForm.setData('rythme_cardiaque_foetal', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Observations et prescriptions */}
            <div className="space-y-4 border-t pt-4">
                <div>
                    <Label htmlFor="observations">Observations</Label>
                    <Textarea
                        id="observations"
                        placeholder="Observations cliniques de la consultation..."
                        rows={3}
                        value={consultationForm.data.observations}
                        onChange={(e) => consultationForm.setData('observations', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="prescriptions">Prescriptions</Label>
                    <Textarea
                        id="prescriptions"
                        placeholder="Médicaments prescrits..."
                        rows={2}
                        value={consultationForm.data.prescriptions}
                        onChange={(e) => consultationForm.setData('prescriptions', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="examens_prescrits">Examens prescrits</Label>
                    <Textarea
                        id="examens_prescrits"
                        placeholder="Examens à réaliser..."
                        rows={2}
                        value={consultationForm.data.examens_prescrits}
                        onChange={(e) => consultationForm.setData('examens_prescrits', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="recommandations">Recommandations</Label>
                    <Textarea
                        id="recommandations"
                        placeholder="Recommandations pour la patiente..."
                        rows={2}
                        value={consultationForm.data.recommandations}
                        onChange={(e) => consultationForm.setData('recommandations', e.target.value)}
                    />
                </div>
            </div>
        </form>
    );

    // Formulaire Examen
    const ExamenForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="type">Type d'examen</Label>
                    <Select value={examenForm.data.type} onValueChange={(value) => examenForm.setData('type', value)}>
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
                    {examenForm.errors.type && <p className="mt-1 text-sm text-red-500">{examenForm.errors.type}</p>}
                </div>
                <div>
                    <Label htmlFor="date">Date d'examen</Label>
                    <Input
                        type="date"
                        id="date"
                        value={examenForm.data.date_examen}
                        onChange={(e) => examenForm.setData('date_examen', e.target.value)}
                    />
                    {examenForm.errors.date_examen && <p className="mt-1 text-sm text-red-500">{examenForm.errors.date_examen}</p>}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="prescrit_par">Prescrit par</Label>
                    <Select value={examenForm.data.prescrit_par} onValueChange={(value) => examenForm.setData('prescrit_par', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le prescripteur" />
                        </SelectTrigger>
                        <SelectContent>
                            {sages_femmes.map((sf) => (
                                <SelectItem key={sf.id} value={sf.id.toString()}>
                                    {sf.prenom} {sf.nom}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="realise_par">Réalisé par</Label>
                    <Select value={examenForm.data.realise_par} onValueChange={(value) => examenForm.setData('realise_par', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le réalisateur" />
                        </SelectTrigger>
                        <SelectContent>
                            {sages_femmes.map((sf) => (
                                <SelectItem key={sf.id} value={sf.id.toString()}>
                                    {sf.prenom} {sf.nom}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <Label htmlFor="resultats">Résultats</Label>
                <Textarea
                    id="resultats"
                    placeholder="Résultats de l'examen..."
                    rows={3}
                    value={examenForm.data.resultats}
                    onChange={(e) => examenForm.setData('resultats', e.target.value)}
                />
            </div>
            <div>
                <Label htmlFor="interpretation">Interprétation</Label>
                <Textarea
                    id="interpretation"
                    placeholder="Interprétation médicale..."
                    rows={3}
                    value={examenForm.data.interpretation}
                    onChange={(e) => examenForm.setData('interpretation', e.target.value)}
                />
            </div>
            <div>
                <Label htmlFor="fichier_rapport">Fichier rapport</Label>
                <Input
                    type="file"
                    id="fichier_rapport"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={(e) => examenForm.setData('fichier_rapport', e.target.files?.[0] || null)}
                />
            </div>
        </form>
    );

    // Formulaire Prescription
    const PrescriptionForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="consultation_id">Consultation associée</Label>
                <Select value={prescriptionForm.data.consultation_id} onValueChange={(value) => prescriptionForm.setData('consultation_id', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une consultation" />
                    </SelectTrigger>
                    <SelectContent>
                        {dossier.consultations?.map((consultation) => (
                            <SelectItem key={consultation.id} value={consultation.id.toString()}>
                                Consultation du {formatDate(consultation.date)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="medicament">Médicament</Label>
                    <Input
                        id="medicament"
                        placeholder="Nom du médicament"
                        value={prescriptionForm.data.medicament}
                        onChange={(e) => prescriptionForm.setData('medicament', e.target.value)}
                    />
                    {prescriptionForm.errors.medicament && <p className="mt-1 text-sm text-red-500">{prescriptionForm.errors.medicament}</p>}
                </div>
                <div>
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input
                        id="dosage"
                        placeholder="500mg, 5ml..."
                        value={prescriptionForm.data.dosage}
                        onChange={(e) => prescriptionForm.setData('dosage', e.target.value)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="frequence">Fréquence</Label>
                    <Input
                        id="frequence"
                        placeholder="2 fois par jour, matin et soir..."
                        value={prescriptionForm.data.frequence}
                        onChange={(e) => prescriptionForm.setData('frequence', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="duree">Durée</Label>
                    <Input
                        id="duree"
                        placeholder="7 jours, 1 mois..."
                        value={prescriptionForm.data.duree}
                        onChange={(e) => prescriptionForm.setData('duree', e.target.value)}
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea
                    id="instructions"
                    placeholder="Instructions particulières pour la prise..."
                    rows={3}
                    value={prescriptionForm.data.instructions}
                    onChange={(e) => prescriptionForm.setData('instructions', e.target.value)}
                />
            </div>
        </form>
    );

    // Formulaire RendezVous
    const RendezVousForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="date_heure">Date et heure</Label>
                    <Input
                        type="datetime-local"
                        id="date_heure"
                        value={rendezVousForm.data.date_heure}
                        onChange={(e) => rendezVousForm.setData('date_heure', e.target.value)}
                    />
                    {rendezVousForm.errors.date_heure && <p className="mt-1 text-sm text-red-500">{rendezVousForm.errors.date_heure}</p>}
                </div>
                <div>
                    <Label htmlFor="sage_femme_id">Sage-femme</Label>
                    <Select value={rendezVousForm.data.sage_femme_id} onValueChange={(value) => rendezVousForm.setData('sage_femme_id', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner la sage-femme" />
                        </SelectTrigger>
                        <SelectContent>
                            {sages_femmes.map((sf) => (
                                <SelectItem key={sf.id} value={sf.id.toString()}>
                                    {sf.prenom} {sf.nom}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="type_consultation">Type de consultation</Label>
                    <Select
                        value={rendezVousForm.data.type_consultation}
                        onValueChange={(value) => rendezVousForm.setData('type_consultation', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="consultation_urgence">Consultation d'urgence</SelectItem>
                            <SelectItem value="consultation_prenatale">Consultation prénatale</SelectItem>
                            <SelectItem value="consultation_postnatale">Consultation postnatale</SelectItem>
                            <SelectItem value="consultation_controle">Consultation de contrôle</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="statut">Statut</Label>
                    <Select value={rendezVousForm.data.statut} onValueChange={(value) => rendezVousForm.setData('statut', value)}>
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
                <Textarea
                    id="motif"
                    placeholder="Motif du rendez-vous..."
                    rows={2}
                    value={rendezVousForm.data.motif}
                    onChange={(e) => rendezVousForm.setData('motif', e.target.value)}
                />
            </div>
            <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                    id="notes"
                    placeholder="Notes particulières..."
                    rows={2}
                    value={rendezVousForm.data.notes}
                    onChange={(e) => rendezVousForm.setData('notes', e.target.value)}
                />
            </div>
        </form>
    );

    // Formulaire Document
    const DocumentForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="titre">Titre du document</Label>
                    <Input
                        id="titre"
                        placeholder="Titre du document"
                        value={documentForm.data.titre}
                        onChange={(e) => documentForm.setData('titre', e.target.value)}
                    />
                    {documentForm.errors.titre && <p className="mt-1 text-sm text-red-500">{documentForm.errors.titre}</p>}
                </div>
                <div>
                    <Label htmlFor="type_document">Type de document</Label>
                    <Select value={documentForm.data.type_document} onValueChange={(value) => documentForm.setData('type_document', value)}>
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
                <Input
                    type="date"
                    id="date_document"
                    value={documentForm.data.date_document}
                    onChange={(e) => documentForm.setData('date_document', e.target.value)}
                />
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    placeholder="Description du document..."
                    rows={3}
                    value={documentForm.data.description}
                    onChange={(e) => documentForm.setData('description', e.target.value)}
                />
            </div>
            <div>
                <Label htmlFor="chemin_fichier">Fichier</Label>
                <Input
                    type="file"
                    id="chemin_fichier"
                    accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
                    onChange={(e) => documentForm.setData('chemin_fichier', e.target.files?.[0] || null)}
                />
            </div>
        </form>
    );

    // Formulaire Note de Suivi
    const NoteSuiviForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="date_note">Date de la note</Label>
                    <Input
                        type="date"
                        id="date_note"
                        value={noteSuiviForm.data.date_note}
                        onChange={(e) => noteSuiviForm.setData('date_note', e.target.value)}
                    />
                    {noteSuiviForm.errors.date_note && <p className="mt-1 text-sm text-red-500">{noteSuiviForm.errors.date_note}</p>}
                </div>
                <div>
                    <Label htmlFor="type_note">Type de note</Label>
                    <Select value={noteSuiviForm.data.type_note} onValueChange={(value) => noteSuiviForm.setData('type_note', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="suivi_general">Suivi général</SelectItem>
                            <SelectItem value="observation_particuliere">Observation particulière</SelectItem>
                            <SelectItem value="recommandation">Recommandation</SelectItem>
                            <SelectItem value="alerte">Alerte</SelectItem>
                            <SelectItem value="rappel">Rappel</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <Label htmlFor="contenu">Contenu de la note</Label>
                <Textarea
                    id="contenu"
                    placeholder="Contenu détaillé de la note..."
                    rows={4}
                    value={noteSuiviForm.data.contenu}
                    onChange={(e) => noteSuiviForm.setData('contenu', e.target.value)}
                />
                {noteSuiviForm.errors.contenu && <p className="mt-1 text-sm text-red-500">{noteSuiviForm.errors.contenu}</p>}
            </div>
        </form>
    );

    // Formulaire Accouchement
    const AccouchementForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="date_accouchement">Date d'accouchement</Label>
                    <Input
                        type="datetime-local"
                        id="date_accouchement"
                        value={accouchementForm.data.date_accouchement}
                        onChange={(e) => accouchementForm.setData('date_accouchement', e.target.value)}
                    />
                    {accouchementForm.errors.date_accouchement && (
                        <p className="mt-1 text-sm text-red-500">{accouchementForm.errors.date_accouchement}</p>
                    )}
                </div>
                <div>
                    <Label htmlFor="type_accouchement">Type d'accouchement</Label>
                    <Select
                        value={accouchementForm.data.type_accouchement}
                        onValueChange={(value) => accouchementForm.setData('type_accouchement', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="voie_basse">Voie basse</SelectItem>
                            <SelectItem value="cesarienne">Césarienne</SelectItem>
                            <SelectItem value="forceps">Forceps</SelectItem>
                            <SelectItem value="ventouse">Ventouse</SelectItem>
                            <SelectItem value="siege">Siège</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Durées du travail */}
            <div className="border-t pt-4">
                <h4 className="text-muted-foreground mb-3 text-sm font-medium">Durées</h4>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="duree_travail">Durée du travail (heures)</Label>
                        <Input
                            type="number"
                            step="0.5"
                            id="duree_travail"
                            placeholder="8.5"
                            value={accouchementForm.data.duree_travail}
                            onChange={(e) => accouchementForm.setData('duree_travail', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="duree_expulsion">Durée d'expulsion (minutes)</Label>
                        <Input
                            type="number"
                            id="duree_expulsion"
                            placeholder="20"
                            value={accouchementForm.data.duree_expulsion}
                            onChange={(e) => accouchementForm.setData('duree_expulsion', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="presentation">Présentation</Label>
                        <Input
                            id="presentation"
                            placeholder="Vertex, siège..."
                            value={accouchementForm.data.presentation}
                            onChange={(e) => accouchementForm.setData('presentation', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Informations sur le bébé */}
            <div className="border-t pt-4">
                <h4 className="text-muted-foreground mb-3 text-sm font-medium">Informations sur le bébé</h4>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <Label htmlFor="poids_bebe">Poids (g)</Label>
                        <Input
                            type="number"
                            id="poids_bebe"
                            placeholder="3200"
                            value={accouchementForm.data.poids_bebe}
                            onChange={(e) => accouchementForm.setData('poids_bebe', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="taille_bebe">Taille (cm)</Label>
                        <Input
                            type="number"
                            step="0.5"
                            id="taille_bebe"
                            placeholder="50"
                            value={accouchementForm.data.taille_bebe}
                            onChange={(e) => accouchementForm.setData('taille_bebe', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="perimetre_cranien">Périmètre crânien (cm)</Label>
                        <Input
                            type="number"
                            step="0.5"
                            id="perimetre_cranien"
                            placeholder="35"
                            value={accouchementForm.data.perimetre_cranien}
                            onChange={(e) => accouchementForm.setData('perimetre_cranien', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="sexe">Sexe</Label>
                        <Select value={accouchementForm.data.sexe} onValueChange={(value) => accouchementForm.setData('sexe', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="masculin">Masculin</SelectItem>
                                <SelectItem value="feminin">Féminin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Scores APGAR */}
            <div className="border-t pt-4">
                <h4 className="text-muted-foreground mb-3 text-sm font-medium">Scores APGAR</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="apgar_1min">APGAR à 1 minute</Label>
                        <Input
                            type="number"
                            min="0"
                            max="10"
                            id="apgar_1min"
                            placeholder="9"
                            value={accouchementForm.data.apgar_1min}
                            onChange={(e) => accouchementForm.setData('apgar_1min', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="apgar_5min">APGAR à 5 minutes</Label>
                        <Input
                            type="number"
                            min="0"
                            max="10"
                            id="apgar_5min"
                            placeholder="10"
                            value={accouchementForm.data.apgar_5min}
                            onChange={(e) => accouchementForm.setData('apgar_5min', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Observations */}
            <div className="space-y-4 border-t pt-4">
                <div>
                    <Label htmlFor="complications">Complications</Label>
                    <Textarea
                        id="complications"
                        placeholder="Complications durant l'accouchement..."
                        rows={2}
                        value={accouchementForm.data.complications}
                        onChange={(e) => accouchementForm.setData('complications', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="observations_accouchement">Observations</Label>
                    <Textarea
                        id="observations_accouchement"
                        placeholder="Observations générales sur l'accouchement..."
                        rows={3}
                        value={accouchementForm.data.observations_accouchement}
                        onChange={(e) => accouchementForm.setData('observations_accouchement', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="equipe_medicale">Équipe médicale</Label>
                    <Textarea
                        id="equipe_medicale"
                        placeholder="Membres de l'équipe présente..."
                        rows={2}
                        value={accouchementForm.data.equipe_medicale}
                        onChange={(e) => accouchementForm.setData('equipe_medicale', e.target.value)}
                    />
                </div>
            </div>
        </form>
    );

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
                return <ConsultationForm />;
        }
    };

    return (
        <div className="space-y-6">
            {/* En-tête du dossier */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-primary/10 rounded-full p-3">
                                <User className="text-primary h-6 w-6" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">
                                    {dossier.patiente?.prenom} {dossier.patiente?.nom}
                                </CardTitle>
                                <p className="text-muted-foreground">
                                    Dossier #{dossier.id} • Suivi par {dossier.sage_femme?.prenom} {dossier.sage_femme?.nom}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Badge variant={dossier.grossesse_a_risque ? 'destructive' : 'secondary'} className="flex items-center space-x-1">
                                {dossier.grossesse_a_risque && <AlertTriangle className="h-3 w-3" />}
                                <span>{dossier.grossesse_a_risque ? 'Grossesse à risque' : 'Grossesse normal'}</span>
                            </Badge>
                            <Badge variant="outline">{dossier.statut_dossier}</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className="text-center">
                            <div className="text-muted-foreground text-sm">Âge gestationnel</div>
                            <div className="text-lg font-semibold">{dossier.age_grossesse_semaines || 0} SA</div>
                            <div className="text-muted-foreground text-xs">{dossier.trimestre || 'Non calculé'}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-muted-foreground text-sm">DPA</div>
                            <div className="text-lg font-semibold">{formatDate(dossier.date_accouchement_prevue)}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-muted-foreground text-sm">Fœtus</div>
                            <div className="flex items-center justify-center space-x-1 text-lg font-semibold">
                                <Baby className="h-4 w-4" />
                                <span>{dossier.nombre_foetus || 1}</span>
                            </div>
                            <div className="text-muted-foreground text-xs">{dossier.grossesse_multiple ? 'Multiple' : 'Simple'}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-muted-foreground text-sm">Dernière consultation</div>
                            <div className="text-lg font-semibold">{formatDate(dossier.date_derniere_consultation)}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Onglets principaux */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-8">
                    <TabsTrigger value="general" className="flex items-center space-x-1">
                        <ClipboardList className="h-4 w-4" />
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
                        <Calendar className="h-4 w-4" />
                        <span className="hidden sm:inline">RDV</span>
                    </TabsTrigger>
                    <TabsTrigger value="documents" className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span className="hidden sm:inline">Documents</span>
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span className="hidden sm:inline">Notes</span>
                    </TabsTrigger>
                    <TabsTrigger value="accouchements" className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span className="hidden sm:inline">Accouchements</span>
                    </TabsTrigger>
                </TabsList>

                {/* Onglet Général */}
                <TabsContent value="general" className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Informations patiente */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <User className="h-5 w-5" />
                                    <span>Informations patiente</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <InfoItem label="Nom complet" value={`${dossier.patiente?.prenom} ${dossier.patiente?.nom}`} />
                                <InfoItem label="Age" value={dossier.patiente?.age} />
                                <InfoItem label="Téléphone" value={dossier.patiente?.numero_telephone} />
                                <InfoItem label="Email" value={dossier.patiente?.email} />
                            </CardContent>
                        </Card>

                        {/* Informations grossesse */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Baby className="h-5 w-5" />
                                    <span>Grossesse actuelle</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <InfoItem label="Date dernières règles" value={formatDate(dossier.date_derniere_regle)} />
                                <InfoItem label="Date prévue d'accouchement" value={formatDate(dossier.date_accouchement_prevue)} />
                                <InfoItem label="Âge gestationnel" value={`${dossier.age_grossesse_semaines || 0} semaines`} />
                                <InfoItem label="Trimestre" value={dossier.trimestre} />
                                <InfoItem label="Nombre de fœtus" value={dossier.nombre_foetus || 1} />
                                <InfoItem label="Grossesse multiple" value={dossier.grossesse_multiple ? 'Oui' : 'Non'} />
                                {dossier.grossesse_a_risque && (
                                    <InfoItem label="Facteurs de risque" value={dossier.facteurs_risque} icon={AlertTriangle} />
                                )}
                            </CardContent>
                        </Card>

                        {/* Antécédents obstétricaux */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Antécédents obstétricaux</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoItem label="Grossesses antérieures" value={dossier.nombre_grossesses_anterieures} />
                                    <InfoItem label="Accouchements" value={dossier.nombre_accouchements} />
                                    <InfoItem label="Avortements" value={dossier.nombre_avortements} />
                                    <InfoItem label="Enfants vivants" value={dossier.nombre_enfants_vivants} />
                                </div>
                                {dossier.antecedents_obstetricaux && (
                                    <InfoItem label="Détails antécédents" value={dossier.antecedents_obstetricaux} />
                                )}
                            </CardContent>
                        </Card>

                        {/* Antécédents médicaux */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Antécédents médicaux</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <InfoItem label="Antécédents médicaux" value={dossier.antecedents_medicaux} />
                                <InfoItem label="Antécédents chirurgicaux" value={dossier.antecedents_chirurgicaux} />
                                <InfoItem label="Antécédents familiaux" value={dossier.antecedents_familiaux} />
                                <InfoItem label="Antécédents gynécologiques" value={dossier.antecedents_gynecologiques} />
                                <InfoItem label="Allergies" value={dossier.allergies} />
                                <InfoItem label="Traitements en cours" value={dossier.traitements_en_cours} />
                                <InfoItem label="Maladies chroniques" value={dossier.maladies_chroniques} />
                            </CardContent>
                        </Card>

                        {/* Mode de vie */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Mode de vie</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                                    <InfoItem label="Tabac" value={dossier.tabac ? 'Oui' : 'Non'} />
                                    <InfoItem label="Alcool" value={dossier.alcool ? 'Oui' : 'Non'} />
                                    <InfoItem label="Activité physique" value={dossier.activite_physique} />
                                    <InfoItem label="Régime alimentaire" value={dossier.regime_alimentaire} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notes importantes */}
                        {(dossier.notes_importantes || dossier.recommandations_particulieres) && (
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle>Notes importantes</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {dossier.notes_importantes && (
                                        <InfoItem label="Notes importantes" value={dossier.notes_importantes} icon={AlertTriangle} />
                                    )}
                                    {dossier.recommandations_particulieres && (
                                        <InfoItem label="Recommandations particulières" value={dossier.recommandations_particulieres} />
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                {/* Onglet Consultations */}
                <TabsContent value="consultations" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2">
                                    <Stethoscope className="h-5 w-5" />
                                    <span>Consultations</span>
                                </CardTitle>
                                <Button
                                    onClick={() => openDialog('consultation')}
                                    className="bg-pink-500 text-white transition-colors hover:bg-pink-600"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Nouvelle consultation
                                </Button>
                            </div>
                        </CardHeader>

                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Poids</TableHead>
                                        <TableHead>Tension</TableHead>
                                        <TableHead>Hauteur utérine</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dossier.consultations?.length ? (
                                        dossier.consultations.map((consultation) => (
                                            <TableRow key={consultation.id}>
                                                <TableCell>{formatDate(consultation.date)}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{consultation.type_consultation}</Badge>
                                                </TableCell>
                                                <TableCell>{consultation.poids ? `${consultation.poids} kg` : '-'}</TableCell>
                                                <TableCell>
                                                    {consultation.tension_arterielle_systolique && consultation.tension_arterielle_diastolique
                                                        ? `${consultation.tension_arterielle_systolique}/${consultation.tension_arterielle_diastolique}`
                                                        : '-'}
                                                </TableCell>
                                                <TableCell>{consultation.hauteur_uterine ? `${consultation.hauteur_uterine} cm` : '-'}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end">
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDelete('consultation', consultation.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-muted-foreground py-8 text-center">
                                                Aucune consultation enregistrée
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Onglet Examens */}
                <TabsContent value="examens" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2">
                                    <TestTube className="h-5 w-5" />
                                    <span>Examens</span>
                                </CardTitle>
                                <Button onClick={() => openDialog('examen')} className="bg-pink-500 text-white transition-colors hover:bg-pink-600">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Nouvel examen
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Prescrit par</TableHead>
                                        <TableHead>Réalisé par</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dossier.examens?.length ? (
                                        dossier.examens.map((examen) => (
                                            <TableRow key={examen.id}>
                                                <TableCell>{formatDate(examen.date)}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{examen.type}</Badge>
                                                </TableCell>
                                                <TableCell>{examen.prescrit_par || '-'}</TableCell>
                                                <TableCell>{examen.realise_par || '-'}</TableCell>
                                                <TableCell>
                                                    <Badge variant={examen.resultats ? 'default' : 'secondary'}>
                                                        {examen.resultats ? 'Terminé' : 'En attente'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end">
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        {examen.fichier_rapport && (
                                                            <Button variant="ghost" size="sm">
                                                                <Download className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                        <Button variant="ghost" size="sm" onClick={() => handleDelete('examen', examen.id)}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-muted-foreground py-8 text-center">
                                                Aucun examen enregistré
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Onglet Prescriptions */}
                <TabsContent value="prescriptions" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2">
                                    <Pill className="h-5 w-5" />
                                    <span>Prescriptions</span>
                                </CardTitle>
                                <Button
                                    onClick={() => openDialog('prescription')}
                                    className="bg-pink-500 text-white transition-colors hover:bg-pink-600"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Nouvelle prescription
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Médicament</TableHead>
                                        <TableHead>Dosage</TableHead>
                                        <TableHead>Fréquence</TableHead>
                                        <TableHead>Durée</TableHead>
                                        <TableHead>Consultation</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dossier.prescriptions?.length ? (
                                        dossier.prescriptions.map((prescription) => (
                                            <TableRow key={prescription.id}>
                                                <TableCell className="font-medium">{prescription.medicament}</TableCell>
                                                <TableCell>{prescription.dosage}</TableCell>
                                                <TableCell>{prescription.frequence}</TableCell>
                                                <TableCell>{prescription.duree}</TableCell>
                                                <TableCell>
                                                    {prescription.consultation_date ? formatDate(prescription.consultation_date) : '-'}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end">
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDelete('prescription', prescription.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-muted-foreground py-8 text-center">
                                                Aucune prescription enregistrée
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Onglet Rendez-vous */}
                <TabsContent value="rendez-vous" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2">
                                    <CalendarPlus className="h-5 w-5" />
                                    <span>Rendez-vous</span>
                                </CardTitle>
                                <Button
                                    onClick={() => openDialog('rendez-vous')}
                                    className="bg-pink-500 text-white transition-colors hover:bg-pink-600"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Nouveau rendez-vous
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date et heure</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Sage-femme</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Motif</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dossier.rendez_vous?.length ? (
                                        dossier.rendez_vous.map((rdv) => (
                                            <TableRow key={rdv.id}>
                                                <TableCell>{formatDateTime(rdv.date_heure)}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{rdv.type_consultation}</Badge>
                                                </TableCell>
                                                <TableCell>{rdv.sage_femme_nom || '-'}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            rdv.statut === 'termine'
                                                                ? 'default'
                                                                : rdv.statut === 'confirme'
                                                                  ? 'secondary'
                                                                  : rdv.statut === 'annule'
                                                                    ? 'destructive'
                                                                    : 'outline'
                                                        }
                                                    >
                                                        {rdv.statut}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="max-w-xs truncate">{rdv.motif || '-'}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" onClick={() => handleDelete('rendez-vous', rdv.id)}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-muted-foreground py-8 text-center">
                                                Aucun rendez-vous programmé
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Onglet Documents */}
                <TabsContent value="documents" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2">
                                    <FileText className="h-5 w-5" />
                                    <span>Documents</span>
                                </CardTitle>
                                <Button onClick={() => openDialog('document')} className="bg-pink-500 text-white transition-colors hover:bg-pink-600">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Ajouter un document
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Titre</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dossier.documents?.length ? (
                                        dossier.documents.map((document) => (
                                            <TableRow key={document.id}>
                                                <TableCell className="font-medium">{document.titre}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{document.type_document}</Badge>
                                                </TableCell>
                                                <TableCell>{formatDate(document.date_document)}</TableCell>
                                                <TableCell className="max-w-xs truncate">{document.description || '-'}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" onClick={() => handleDelete('document', document.id)}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-muted-foreground py-8 text-center">
                                                Aucun document ajouté
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Onglet Notes */}
                <TabsContent value="notes" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Notes de suivi</h3>
                        <Button onClick={() => openDialog('note')} className="flex items-center space-x-2">
                            <Plus className="h-4 w-4" />
                            <span>Nouvelle note</span>
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {dossier.notes_suivi?.length ? (
                            dossier.notes_suivi.map((note) => (
                                <Card key={note.id}>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Badge variant="outline">{note.type_note}</Badge>
                                                <span className="text-muted-foreground text-sm">{formatDate(note.date_note)}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button variant="ghost" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => handleDelete('note', note.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm">{note.contenu}</p>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Card>
                                <CardContent className="text-muted-foreground py-8 text-center">Aucune note de suivi enregistrée</CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                {/* Onglet Accouchements */}
                <TabsContent value="accouchements" className="space-y-4">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center space-x-2">
                                <Heart className="h-5 w-5" />
                                <span>Accouchements</span>
                            </CardTitle>
                            <Button onClick={() => openDialog('accouchement')} className="bg-pink-500 text-white transition-colors hover:bg-pink-600">
                                <Plus className="mr-2 h-4 w-4" />
                                Nouvel accouchement
                            </Button>
                        </div>
                    </CardHeader>

                    <div className="space-y-4">
                        {dossier.accouchements?.length ? (
                            dossier.accouchements.map((accouchement) => (
                                <Card key={accouchement.id}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg">
                                                Accouchement du {formatDateTime(accouchement.date_accouchement)}
                                            </CardTitle>
                                            <div className="flex items-center space-x-2">
                                                <Badge variant="outline">{accouchement.type_accouchement}</Badge>
                                                <Button variant="ghost" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => handleDelete('accouchement', accouchement.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                            <InfoItem label="Type" value={accouchement.type_accouchement} />
                                            <InfoItem
                                                label="Durée du travail"
                                                value={accouchement.duree_travail ? `${accouchement.duree_travail}h` : '-'}
                                            />
                                            <InfoItem label="Présentation" value={accouchement.presentation} />
                                            <InfoItem label="Sexe du bébé" value={accouchement.sexe} />
                                            <InfoItem label="Poids" value={accouchement.poids_bebe ? `${accouchement.poids_bebe}g` : '-'} />
                                            <InfoItem label="Taille" value={accouchement.taille_bebe ? `${accouchement.taille_bebe}cm` : '-'} />
                                            <InfoItem label="APGAR 1min" value={accouchement.apgar_1min || '-'} />
                                            <InfoItem label="APGAR 5min" value={accouchement.apgar_5min || '-'} />
                                        </div>

                                        {accouchement.complications && (
                                            <div className="mt-4 rounded-md border border-yellow-200 bg-yellow-50 p-3">
                                                <h4 className="mb-1 text-sm font-semibold text-yellow-800">Complications</h4>
                                                <p className="text-sm text-yellow-700">{accouchement.complications}</p>
                                            </div>
                                        )}

                                        {accouchement.observations_accouchement && (
                                            <div className="mt-4">
                                                <h4 className="mb-1 text-sm font-semibold">Observations</h4>
                                                <p className="text-muted-foreground text-sm">{accouchement.observations_accouchement}</p>
                                            </div>
                                        )}

                                        {accouchement.equipe_medicale && (
                                            <div className="mt-4">
                                                <h4 className="mb-1 text-sm font-semibold">Équipe médicale</h4>
                                                <p className="text-muted-foreground text-sm">{accouchement.equipe_medicale}</p>
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
                </TabsContent>
            </Tabs>

            {/* Dialog pour les formulaires */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{getDialogTitle()}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">{getFormComponent()}</div>
                    <div className="flex justify-end space-x-2 border-t pt-4">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Annuler
                        </Button>
                        <Button onClick={handleSubmit} disabled={getCurrentForm().processing}>
                            {getCurrentForm().processing ? 'Enregistrement...' : 'Enregistrer'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
