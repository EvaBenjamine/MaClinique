"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Edit, Eye, FileText, Trash2, Upload } from "lucide-react"
import { useDossierPatient } from "@/contexts/dossier-patient-context"
import { useFormHandlers } from "@/hooks/use-form-handlers"
import { formatDate } from "@/utils/date-formatters"

export function DocumentsTab() {
  const { dossier, setDialogType, setIsDialogOpen } = useDossierPatient()
  const { handleDelete } = useFormHandlers()

  const openDialog = () => {
    setDialogType("document")
    setIsDialogOpen(true)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Documents</span>
          </CardTitle>
          <Button onClick={openDialog} className="bg-pink-500 text-white transition-colors hover:bg-pink-600">
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
                  <TableCell className="max-w-xs truncate">{document.description || "-"}</TableCell>
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
                      <Button variant="ghost" size="sm" onClick={() => handleDelete("document", document.id)}>
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
  )
}
