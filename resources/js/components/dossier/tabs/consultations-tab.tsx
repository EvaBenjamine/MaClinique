"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Eye, Plus, Stethoscope, Trash2 } from "lucide-react"
import { useDossierPatient } from "@/contexts/dossier-patient-context"
import { useFormHandlers } from "@/hooks/use-form-handlers"
import { formatDate } from "@/utils/date-formatters"

export function ConsultationsTab() {
  const { dossier, setDialogType, setIsDialogOpen } = useDossierPatient()
  const { handleDelete } = useFormHandlers()

  const openDialog = () => {
    setDialogType("consultation")
    setIsDialogOpen(true)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Stethoscope className="h-5 w-5" />
            <span>Consultations</span>
          </CardTitle>
          <Button onClick={openDialog} className="bg-pink-500 text-white transition-colors hover:bg-pink-600">
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
                  <TableCell>{consultation.poids ? `${consultation.poids} kg` : "-"}</TableCell>
                  <TableCell>
                    {consultation.tension_arterielle_systolique && consultation.tension_arterielle_diastolique
                      ? `${consultation.tension_arterielle_systolique}/${consultation.tension_arterielle_diastolique}`
                      : "-"}
                  </TableCell>
                  <TableCell>{consultation.hauteur_uterine ? `${consultation.hauteur_uterine} cm` : "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete("consultation", consultation.id)}>
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
  )
}
