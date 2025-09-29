import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Baby, User } from "lucide-react"
import { useDossierPatient } from "@/contexts/dossier-patient-context"
import { formatDate } from "@/utils/date-formatters"

export function DossierHeader() {
  const { dossier } = useDossierPatient()

  return (
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
            <Badge
              variant={dossier.grossesse_a_risque ? "destructive" : "secondary"}
              className="flex items-center space-x-1"
            >
              {dossier.grossesse_a_risque && <AlertTriangle className="h-3 w-3" />}
              <span>{dossier.grossesse_a_risque ? "Grossesse à risque" : "Grossesse normale"}</span>
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
            <div className="text-muted-foreground text-xs">{dossier.trimestre || "Non calculé"}</div>
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
            <div className="text-muted-foreground text-xs">{dossier.grossesse_multiple ? "Multiple" : "Simple"}</div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground text-sm">Dernière consultation</div>
            <div className="text-lg font-semibold">{formatDate(dossier.date_derniere_consultation)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
