import { useForm } from '@inertiajs/react';
import { Calendar, Clock, User } from 'lucide-react';
import { FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type AddRendezVousModalProps = {
    isOpen: boolean;
    onClose: () => void;
    patientes: Array<{
        id: number;
        nom: string;
        prenom: string;
    }>;
    sagesFemmes: Array<{
        id: number;
        nom: string;
        prenom: string;
    }>;
    onComplete?: () => void;
};

type RendezVousFormData = {
    patiente_id: string;
    sage_femme_id: string;
    date: string;
    heure: string;
    type: string;
    motif: string;
    notes: string;
};

export default function AddRendezVousModal({ isOpen, onClose, patientes, sagesFemmes, onComplete }: AddRendezVousModalProps) {
    const { data, setData, post, processing, errors, reset } = useForm<RendezVousFormData>({
        patiente_id: '',
        sage_femme_id: '',
        date: '',
        heure: '',
        type: '',
        motif: '',
        notes: '',
    });

    const typesRendezVous = [
        'Consultation de suivi',
        'Consultation prénatale',
        'Échographie',
        'Suivi post-partum',
        "Consultation d'urgence",
        'Consultation de contrôle',
        "Préparation à l'accouchement",
    ];

    const creneauxHoraires = [
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
    ];

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/rendez-vous', {
            onSuccess: () => {
                reset();
                onClose();
                onComplete?.();
            },
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                        <Calendar className="h-6 w-6 text-pink-500" />
                        Nouveau rendez-vous
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Sélection de la patiente */}
                    <div className="space-y-2">
                        <Label htmlFor="patiente_id" className="text-sm font-medium text-gray-700">
                            Patiente *
                        </Label>
                        <Select value={data.patiente_id} onValueChange={(value) => setData('patiente_id', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une patiente" />
                            </SelectTrigger>
                            <SelectContent>
                                {patientes.map((patiente) => (
                                    <SelectItem key={patiente.id} value={patiente.id.toString()}>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            {patiente.prenom} {patiente.nom}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.patiente_id && <p className="text-sm text-red-600">{errors.patiente_id}</p>}
                    </div>

                    {/* Sélection de la sage-femme */}
                    <div className="space-y-2">
                        <Label htmlFor="sage_femme_id" className="text-sm font-medium text-gray-700">
                            Sage-femme *
                        </Label>
                        <Select value={data.sage_femme_id} onValueChange={(value) => setData('sage_femme_id', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une sage-femme" />
                            </SelectTrigger>
                            <SelectContent>
                                {sagesFemmes.map((sageFemme) => (
                                    <SelectItem key={sageFemme.id} value={sageFemme.id.toString()}>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            {sageFemme.prenom} {sageFemme.nom}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.sage_femme_id && <p className="text-sm text-red-600">{errors.sage_femme_id}</p>}
                    </div>

                    {/* Date et heure */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                                Date *
                            </Label>
                            <Input
                                type="date"
                                id="date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                className="w-full"
                                min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.date && <p className="text-sm text-red-600">{errors.date}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="heure" className="text-sm font-medium text-gray-700">
                                Heure *
                            </Label>
                            <Select value={data.heure} onValueChange={(value) => setData('heure', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner une heure" />
                                </SelectTrigger>
                                <SelectContent>
                                    {creneauxHoraires.map((heure) => (
                                        <SelectItem key={heure} value={heure}>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                {heure}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.heure && <p className="text-sm text-red-600">{errors.heure}</p>}
                        </div>
                    </div>

                    {/* Type de rendez-vous */}
                    <div className="space-y-2">
                        <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                            Type de rendez-vous *
                        </Label>
                        <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner le type" />
                            </SelectTrigger>
                            <SelectContent>
                                {typesRendezVous.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
                    </div>

                    {/* Motif */}
                    <div className="space-y-2">
                        <Label htmlFor="motif" className="text-sm font-medium text-gray-700">
                            Motif
                        </Label>
                        <Input
                            type="text"
                            id="motif"
                            value={data.motif}
                            onChange={(e) => setData('motif', e.target.value)}
                            placeholder="Motif du rendez-vous"
                            className="w-full"
                        />
                        {errors.motif && <p className="text-sm text-red-600">{errors.motif}</p>}
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                            Notes
                        </Label>
                        <Textarea
                            id="notes"
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            placeholder="Notes complémentaires..."
                            rows={3}
                            className="w-full"
                        />
                        {errors.notes && <p className="text-sm text-red-600">{errors.notes}</p>}
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                        <Button type="button" variant="outline" onClick={handleClose} disabled={processing}>
                            Annuler
                        </Button>
                        <Button type="submit" className="bg-pink-500 text-white hover:bg-pink-600" disabled={processing}>
                            {processing ? 'Enregistrement...' : 'Créer le rendez-vous'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
