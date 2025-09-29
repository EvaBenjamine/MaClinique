"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoItem } from "@/components/ui/info-item"
import { Edit, Heart, Plus, Trash2 } from "lucide-react"
import { useDossierPatient } from "@/contexts/dossier-patient-context"
import { useFormHandlers } from "@/hooks/use-form-handlers"
import { formatDateTime } from "@/utils/date-formatters"

export function AccouchementsTab() {
  const { dossier, setDialogType, setIsDialogOpen } = useDossierPatient()
  const { handleDelete } = useFormHandlers()

  const openDialog = () => {
    setDialogType("accouchement")
    setIsDialogOpen(true)
  }

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
                    Accouchement du {formatDateTime(accouchement.date_accouchement)}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{accouchement.type_accouchement}</Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete("accouchement", accouchement.id)}>
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
                    value={accouchement.duree_travail ? `${accouchement.duree_travail}h` : "-"}
                  />
                  <InfoItem label="Présentation" value={accouchement.presentation} />
                  <InfoItem label="Sexe du bébé" value={accouchement.sexe} />
                  <InfoItem label="Poids" value={accouchement.poids_bebe ? `${accouchement.poids_bebe}g` : "-"} />
                  <InfoItem label="Taille" value={accouchement.taille_bebe ? `${accouchement.taille_bebe}cm` : "-"} />
                  <InfoItem label="APGAR 1min" value={accouchement.apgar_1min || "-"} />
                  <InfoItem label="APGAR 5min" value={accouchement.apgar_5min || "-"} />
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
    </div>
  )
}
