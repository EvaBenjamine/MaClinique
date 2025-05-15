import Sidebar from '@/components/Sidebar';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function OrdonnanceForm() {
  const [form, setForm] = useState({
    patient: '',
    medicament: '',
    posologie: '',
    duree: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Envoyer les données
    alert('Ordonnance enregistrée !');
  };

  return (
    <Sidebar>
      <Head title="Nouvelle Ordonnance" />
      <div className="flex flex-1 flex-col gap-6 rounded-xl p-6 bg-pink-50">
        <h2 className="text-3xl font-bold text-pink-700">Nouvelle Ordonnance 📝</h2>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-md max-w-xl mx-auto flex flex-col gap-4">
          <div>
            <Label htmlFor="patient">Patiente</Label>
            <Input id="patient" name="patient" value={form.patient} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="medicament">Médicament</Label>
            <Input id="medicament" name="medicament" value={form.medicament} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="posologie">Posologie</Label>
            <Input id="posologie" name="posologie" value={form.posologie} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="duree">Durée</Label>
            <Input id="duree" name="duree" value={form.duree} onChange={handleChange} required />
          </div>
          <Button type="submit" className="bg-pink-400 text-white hover:bg-pink-500 mt-4">Enregistrer</Button>
        </form>
      </div>
    </Sidebar>
  );
}
