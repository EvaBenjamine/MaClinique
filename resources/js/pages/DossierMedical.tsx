import { useState } from 'react';

interface PatientFormProps {
  onAddPatient: (patient: { name: string; age: number; }) => void;
}

export default function PatientForm({ onAddPatient }: PatientFormProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | string>('');
  const [medicalRecord, setMedicalRecord] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Créer une patiente
    const newPatient = {
      name: name,
      age: Number(age),
    };

    // Appeler la fonction pour ajouter la patiente
    onAddPatient(newPatient);

    // Créer un dossier médical pour cette patiente
    const newMedicalRecord = `${name} - Dossier Médical`;
    setMedicalRecord(newMedicalRecord); // Tu peux ici personnaliser la logique du dossier médical

    alert(`Dossier médical créé pour ${name}: ${newMedicalRecord}`);

    // Réinitialiser les champs du formulaire
    setName('');
    setAge('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Ajouter une Patiente</h3>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nom
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Âge
        </label>
        <input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-md">
        Ajouter la Patiente
      </button>
    </form>
  );
}
