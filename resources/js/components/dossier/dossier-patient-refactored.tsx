import { DossierPatientProvider, type DossierData, type SageFemme } from "@/contexts/dossier-patient-context"
import { DossierHeader } from "@/components/dossier/dossier-header"
import { DossierTabs } from "@/components/dossier/dossier-tabs"
import { FormDialog } from "@/components/dossier/form-dialog"

interface DossierPatientProps {
  dossier: DossierData
  sages_femmes?: SageFemme[]
}

export default function DossierPatientRefactored({ dossier, sages_femmes = [] }: DossierPatientProps) {
  return (
    <DossierPatientProvider dossier={dossier} sagesFemmes={sages_femmes}>
      <div className="space-y-6">
        <DossierHeader />
        <DossierTabs />
        <FormDialog />
      </div>
    </DossierPatientProvider>
  )
}
