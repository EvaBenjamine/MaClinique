"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Edit, MessageSquare, Plus, Trash2 } from "lucide-react"
import { useDossierPatient } from "@/contexts/dossier-patient-context"
import { useFormHandlers } from "@/hooks/use-form-handlers"
import { formatDate } from "@/utils/date-formatters"

export function NotesTab() {
  const { dossier, setDialogType, setIsDialogOpen } = useDossierPatient()
  const { handleDelete } = useFormHandlers()

  const openDialog = () => {
    setDialogType("note")
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center space-x-2 text-lg font-semibold">
          <MessageSquare className="h-5 w-5" />
          <span>Notes de suivi</span>
        </h3>
        <Button onClick={openDialog} className="bg-pink-500 text-white transition-colors hover:bg-pink-600">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle note
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
                    <Button variant="ghost" size="sm" onClick={() => handleDelete("note", note.id)}>
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
            <CardContent className="text-muted-foreground py-8 text-center">
              Aucune note de suivi enregistrée
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
