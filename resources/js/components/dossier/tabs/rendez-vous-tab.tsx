"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarPlus, Edit, Eye, Plus, Trash2 } from "lucide-react"
import { useDossierPatient } from "@/contexts/dossier-patient-context"
import { useFormHandlers } from "@/hooks/use-form-handlers"
import { formatDateTime } from "@/utils/date-formatters"

export function RendezVousTab() {
  const { dossier, setDialogType, setIsDialogOpen } = useDossierPatient()
  const { handleDelete } = useFormHandlers()

  const openDialog = () => {
    setDialogType("rendez-vous")
    setIsDialogOpen(true)
  }

  const getStatusVariant = (statut: string) => {
    switch (statut) {
      case "termine":
        return "default"
      case "confirme":
        return "secondary"
      case "annule":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <CalendarPlus className="h-5 w-5" />
            <span>Rendez-vous</span>
          </CardTitle>
          <Button onClick={openDialog} className="bg-pink-500 text-white transition-colors hover:bg-pink-600">
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
                  <TableCell>{rdv.sage_femme_nom || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(rdv.statut)}>{rdv.statut}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{rdv.motif || "-"}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete("rendez-vous", rdv.id)}>
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
  )
}
