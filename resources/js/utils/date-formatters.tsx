export const formatDate = (dateString: string | null) => {
  if (!dateString) return "Non renseigné"
  return new Date(dateString).toLocaleDateString("fr-FR")
}

export const formatDateTime = (dateString: string | null) => {
  if (!dateString) return "Non renseigné"
  return new Date(dateString).toLocaleString("fr-FR")
}
