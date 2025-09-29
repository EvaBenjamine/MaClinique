import type React from "react"
interface InfoItemProps {
  label: string
  value: any
  icon?: React.ComponentType<{ className?: string }>
}

export function InfoItem({ label, value, icon: Icon }: InfoItemProps) {
  return (
    <div className="flex items-start space-x-3 py-2">
      {Icon && <Icon className="text-muted-foreground mt-1 h-4 w-4" />}
      <div className="flex-1">
        <dt className="text-muted-foreground text-sm font-medium">{label}</dt>
        <dd className="text-foreground mt-1 text-sm">{value || "Non renseigné"}</dd>
      </div>
    </div>
  )
}
