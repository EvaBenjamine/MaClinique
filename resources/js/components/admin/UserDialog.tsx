import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  user?: any;
  mode: 'create' | 'edit';
}

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'sage-femme', label: 'Sage-femme' },
  { value: 'secretaire', label: 'Secrétaire' },
  { value: 'patiente', label: 'Patiente' },
];

export default function UserDialog({ open, onClose, user, mode }: UserDialogProps) {
  const { data, setData, post, put, processing, errors, reset } = useForm({
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    telephone: user?.telephone || '',
    adresse: user?.adresse || '',
    email: user?.email || '',
    role: user?.role || '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      post(route('admin.users.store'), {
        onSuccess: () => { reset(); onClose(); },
      });
    } else {
      put(route('admin.users.update', user.id), {
        onSuccess: () => { reset(); onClose(); },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle>{mode === 'create' ? 'Créer un utilisateur' : 'Modifier un utilisateur'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className="flex flex-col gap-4">

          <Label htmlFor='nom'>Nom</Label>
          <Input id='nom' value={data.nom} onChange={e => setData('nom', e.target.value)} required />
          <Label htmlFor='prenom'>Prénom</Label>
          <Input id='prenom' value={data.prenom} onChange={e => setData('prenom', e.target.value)} required />
          <Label htmlFor='telephone'>Téléphone</Label>
          <Input id='telephone' value={data.telephone} onChange={e => setData('telephone', e.target.value)} required />
          <Label htmlFor='adresse'>Adresse</Label>
          <Input id='adresse' value={data.adresse} onChange={e => setData('adresse', e.target.value)} required />
          <Label htmlFor='email'>Email</Label>
          <Input id='email' type="email" value={data.email} onChange={e => setData('email', e.target.value)} required />
          <Label htmlFor='role'>Rôle</Label>
          <select id='role' value={data.role} onChange={e => setData('role', e.target.value)} required>
            <option value="">Sélectionner un rôle</option>
            {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
          <Label htmlFor='password'>Mot de passe</Label>
          <Input id='password' type="password" value={data.password} onChange={e => setData('password', e.target.value)} required={mode === 'create'} />
          <Label htmlFor='password_confirmation'>Confirmer le mot de passe</Label>
          <Input id='password_confirmation' type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} required={mode === 'create'} />
        </DialogContent>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>Annuler</Button>
          <Button type="submit" disabled={processing}>{mode === 'create' ? 'Créer' : 'Enregistrer'}</Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
