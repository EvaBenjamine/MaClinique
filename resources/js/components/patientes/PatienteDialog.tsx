import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { Label } from '../ui/label';

interface PatienteDialogProps {
  open: boolean;
  onClose: () => void;
  patiente?: any;
  mode: 'create' | 'edit';
}

export default function PatienteDialog({ open, onClose, patiente, mode }: PatienteDialogProps) {
  const { data, setData, post, put, processing, errors, reset } = useForm({
    user_id: patiente?.user_id || '',
    date_naissance: patiente?.date_naissance || '',
    numero_dossier: patiente?.numero_dossier || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      post(route('patientes.store'), {
        onSuccess: () => { reset(); onClose(); },
      });
    } else {
      put(route('patientes.update', patiente.id), {
        onSuccess: () => { reset(); onClose(); },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle>{mode === 'create' ? 'Ajouter une patiente' : 'Modifier la patiente'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className="flex flex-col gap-4">
          <Label htmlFor='user_id'>Patiente</Label>
          <Input id='user_id' value={data.user_id} onChange={e => setData('user_id', e.target.value)} required />
          <Label htmlFor='date_naissance' >Date de naissance</Label>
          <Input id='date_naissance' type="date" value={data.date_naissance} onChange={e => setData('date_naissance', e.target.value)} />
          <Label htmlFor='numero_dossier'>Numéro dossier</Label>
          <Input id='numero_dossier' value={data.numero_dossier} onChange={e => setData('numero_dossier', e.target.value)} required />
        </DialogContent>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>Annuler</Button>
          <Button type="submit" disabled={processing}>{mode === 'create' ? 'Ajouter' : 'Enregistrer'}</Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
