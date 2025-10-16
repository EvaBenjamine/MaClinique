import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDossierPatient } from '@/contexts/dossier-patient-context';
import { router } from '@inertiajs/react';
import { AccouchementForm } from './forms/accouchement-form';
import { ConsultationForm } from './forms/consultation-form';

export function FormDialog() {
    const { isDialogOpen, setIsDialogOpen, dialogType } = useDossierPatient();

    const handleClose = () => {
        setIsDialogOpen(false);
    };

    const handleComplete = () => {
        setIsDialogOpen(false);
        router.reload();
    };

    const getDialogTitle = () => {
        switch (dialogType) {
            case 'consultation':
                return 'Nouvelle consultation';
            case 'examen':
                return 'Nouvel examen';
            case 'prescription':
                return 'Nouvelle prescription';
            case 'rendez-vous':
                return 'Nouveau rendez-vous';
            case 'document':
                return 'Nouveau document';
            case 'note':
                return 'Nouvelle note de suivi';
            case 'accouchement':
                return 'Nouvel accouchement';
            default:
                return 'Nouveau';
        }
    };

    const getFormComponent = () => {
        switch (dialogType) {
            case 'consultation':
                return <ConsultationForm isOpen={isDialogOpen} onClose={handleClose} onComplete={handleComplete} />;
            case 'accouchement':
                return <AccouchementForm isOpen={isDialogOpen} onClose={handleClose} onComplete={handleComplete} />;
            // Ajouter les autres formulaires ici
            default:
                return <ConsultationForm isOpen={isDialogOpen} onClose={handleClose} onComplete={handleComplete} />;
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{getDialogTitle()}</DialogTitle>
                </DialogHeader>
                <div className="py-4">{getFormComponent()}</div>
            </DialogContent>
        </Dialog>
    );
}
