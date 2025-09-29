"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Edit, Eye, Plus, TestTube, Trash2 } from "lucide-react"
import { useDossierPatient } from "@/contexts/dossier-patient-context"
import { useFormHandlers } from "@/hooks/use-form-handlers"
import { formatDate } from "@/utils/date-formatters"

export function ExamensTab() {
  const { dossier, setDialogType, setIsDialogOpen } = useDossierPatient()
  const { handleDelete } = useFormHandlers()

  const openDialog = () => {
    setDialogType("examen")
    setIsDialogOpen(true)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <TestTube className="h-5 w-5" />
            <span>Examens</span>
          </CardTitle>
          <Button onClick={openDialog} className="bg-pink-500 text-white transition-colors hover:bg-pink-600">
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
                  <TableCell>{formatDate(examen.date_examen)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{examen.type}</Badge>
                  </TableCell>
                  <TableCell>{examen.prescrit_par || "-"}</TableCell>
                  <TableCell>{examen.realise_par || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={examen.resultats ? "default" : "secondary"}>
                      {examen.resultats ? "Terminé" : "En attente"}
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
                      <Button variant="ghost" size="sm" onClick={() => handleDelete("examen", examen.id)}>
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
  )
}
