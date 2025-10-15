import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoItem } from '@/components/ui/info-item';
import { useDossierPatient } from '@/contexts/dossier-patient-context';
import { formatDate } from '@/utils/date-formatters';
import { AlertTriangle, Baby, User } from 'lucide-react';

export function GeneralTab() {
    const { dossier } = useDossierPatient();

    return (
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
                    {dossier.grossesse_a_risque && <InfoItem label="Facteurs de risque" value={dossier.facteurs_risque} icon={AlertTriangle} />}
                </CardContent>
            </Card>

            {/* Antécédents obstétricaux */}
            <Card>
                <CardHeader>
                    <CardTitle>Antécédents obstétricaux</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <InfoItem label="Gestité (G)" value={dossier.gestite} />
                        <InfoItem label="Parité (P)" value={dossier.parite} />
                        <InfoItem label="Fausses couches" value={dossier.fausses_couches} />
                        <InfoItem label="Enfants vivants (EV)" value={dossier.ev} />
                        <InfoItem label="Morts-nés" value={dossier.morts_nes} />
                        <InfoItem label="Décédés" value={dossier.decedes} />
                    </div>
                    {dossier.antecedents_obstetricaux && <InfoItem label="Détails antécédents" value={dossier.antecedents_obstetricaux} />}
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
        </div>
    );
}
