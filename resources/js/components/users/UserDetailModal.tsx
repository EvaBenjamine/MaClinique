import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, UserDetails } from '@/types/models';

interface FieldProps {
    label: string;
    value: React.ReactNode;
    className?: string;
}

function Field({ label, value, className = '' }: FieldProps) {
    return (
        <div className={`rounded-xl bg-pink-50 p-4 shadow-inner ${className}`}>
            <h3 className="mb-1 text-sm font-medium text-pink-600">{label}</h3>
            <p className="text-base text-gray-800">{value}</p>
        </div>
    );
}

interface UserDetailModalProps {
    isOpen: boolean;
    onClose: (open: boolean) => void;
    selectedUser: User | null;
    selectedUserDetails?: UserDetails;
}

export default function UserDetailModal({ isOpen, onClose, selectedUser, selectedUserDetails }: UserDetailModalProps) {
    if (!selectedUser) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-0 bg-white p-6 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-pink-600">Détails de l'utilisateur</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="general" className="mt-4 space-y-6">
                    <TabsList className="w-full rounded-lg bg-pink-100 p-1">
                        <TabsTrigger
                            value="general"
                            className="rounded-md px-4 py-2 text-pink-700 data-[state=active]:bg-pink-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                        >
                            Informations générales
                        </TabsTrigger>
                        {(selectedUser.role === 'sage_femme' || selectedUser.role === 'secretaire') && (
                            <TabsTrigger
                                value="professionnel"
                                className="rounded-md px-4 py-2 text-pink-700 data-[state=active]:bg-pink-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                            >
                                Détails professionnels
                            </TabsTrigger>
                        )}
                    </TabsList>

                    {/* Informations générales */}
                    <TabsContent value="general" className="space-y-4 pt-4">
                        <Field label="Nom complet" value={`${selectedUser.prenom} ${selectedUser.nom}`} />
                        <Field label="Email" value={selectedUser.email} />
                        <Field label="Rôle" value={<Badge className="bg-pink-200 text-pink-800">{selectedUser.role}</Badge>} />
                    </TabsContent>

                    {/* Détails professionnels */}
                    <TabsContent value="professionnel" className="space-y-4 pt-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Matricule" value={selectedUserDetails?.matricule || 'Non spécifié'} />
                            <Field label="Grade" value={selectedUserDetails?.grade || 'Non spécifié'} />
                            {selectedUser.role === 'sage_femme' && (
                                <Field label="Spécialité" value={selectedUserDetails?.specialite || 'Non spécifié'} />
                            )}
                            <Field label="Téléphone" value={selectedUserDetails?.numero_telephone || 'Non spécifié'} />
                            <Field label="Adresse" value={selectedUserDetails?.adresse || 'Non spécifié'} className="md:col-span-2" />
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter className="mt-6">
                    <Button
                        variant="outline"
                        onClick={() => onClose(false)}
                        className="border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
                    >
                        Fermer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
