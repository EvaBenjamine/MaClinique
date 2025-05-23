import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  Check,
  ChevronDown,
  Info,
  Save,
  X
} from 'lucide-react';

// Types
interface PatientData {
  // Informations personnelles
  nom: string;
  prenom: string;
  dateNaissance: string;
  telephone: string;
  adresse: string;
  profession: string;
  assuranceMaladie: string;
  persContactUrgence: string;
  telContactUrgence: string;

  // Informations grossesse
  datePremiereConsultation: string;
  datesDernieresRegles: string;
  dateAccouchementPrevue: string;
  gestite: number;
  parite: number;

  // Antécédents médicaux
  antecedentsMedicaux: string;
  antecedentsChirurgicaux: string;
  antecedentsGyneco: string;
  antecedentsObstetricaux: string;
  allergies: string;
  medicamentsActuels: string;

  // Habitudes de vie
  tabac: boolean;
  nbCigarettes: number;
  alcool: boolean;
  consommationAlcool: string;
  drogues: boolean;
  detailDrogues: string;

  // Examen initial
  poids: number;
  taille: number;
  tension: string;
  pouls: number;
  temperature: number;

  // Examens complémentaires
  groupeSanguin: string;
  rhesus: string;
  examensSanguin: string;
  echographie: string;

  // Observations et suivi
  observations: string;
  prescriptionsMedicales: string;
  prochainRendezVous: string;
  medecinTraitant: string;
}

export default function PatientForm() {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState<PatientData>({
    // Valeurs initiales
    nom: '',
    prenom: '',
    dateNaissance: '',
    telephone: '',
    adresse: '',
    profession: '',
    assuranceMaladie: '',
    persContactUrgence: '',
    telContactUrgence: '',

    datePremiereConsultation: '',
    datesDernieresRegles: '',
    dateAccouchementPrevue: '',
    gestite: 0,
    parite: 0,

    antecedentsMedicaux: '',
    antecedentsChirurgicaux: '',
    antecedentsGyneco: '',
    antecedentsObstetricaux: '',
    allergies: '',
    medicamentsActuels: '',

    tabac: false,
    nbCigarettes: 0,
    alcool: false,
    consommationAlcool: '',
    drogues: false,
    detailDrogues: '',

    poids: 0,
    taille: 0,
    tension: '',
    pouls: 0,
    temperature: 0,

    groupeSanguin: '',
    rhesus: '',
    examensSanguin: '',
    echographie: '',

    observations: '',
    prescriptionsMedicales: '',
    prochainRendezVous: '',
    medecinTraitant: ''
  });

  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: parseFloat(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => {
    if (formStep < 6) {
      setFormStep(formStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (formStep > 0) {
      setFormStep(formStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez envoyer les données à votre API
    console.log('Données du formulaire:', formData);
    // Afficher la notification de succès
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  // Composants réutilisables
  const InputField = ({ label, name, type = 'text', required = false, placeholder = '', value }: {
    label: string,
    name: string,
    type?: string,
    required?: boolean,
    placeholder?: string,
    value: any
  }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-pink-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
      />
    </div>
  );

  const TextAreaField = ({ label, name, required = false, placeholder = '', rows = 3, value }: {
    label: string,
    name: string,
    required?: boolean,
    placeholder?: string,
    rows?: number,
    value: string
  }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-pink-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
      />
    </div>
  );

  const CheckboxField = ({ label, name, value }: {
    label: string,
    name: string,
    value: boolean
  }) => (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={value}
        onChange={handleChange}
        className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
      />
      <label htmlFor={name} className="ml-2 block text-sm text-gray-700">
        {label}
      </label>
    </div>
  );

  const SelectField = ({ label, name, options, required = false, value }: {
    label: string,
    name: string,
    options: {value: string, label: string}[],
    required?: boolean,
    value: string
  }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-pink-500">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          className="appearance-none w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
        >
          <option value="">Sélectionner</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );

  // Rendu du formulaire basé sur l'étape actuelle
  const renderFormStep = () => {
    switch (formStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Informations personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Nom"
                name="nom"
                required
                placeholder="Nom de famille"
                value={formData.nom}
              />
              <InputField
                label="Prénom"
                name="prenom"
                required
                placeholder="Prénom"
                value={formData.prenom}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Date de naissance"
                name="dateNaissance"
                type="date"
                required
                value={formData.dateNaissance}
              />
              <InputField
                label="Téléphone"
                name="telephone"
                type="tel"
                required
                placeholder="Ex: +33 6 12 34 56 78"
                value={formData.telephone}
              />
            </div>
            <InputField
              label="Adresse"
              name="adresse"
              placeholder="Adresse complète"
              value={formData.adresse}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Profession"
                name="profession"
                placeholder="Profession actuelle"
                value={formData.profession}
              />
              <InputField
                label="Numéro d'assurance maladie"
                name="assuranceMaladie"
                placeholder="Numéro de sécurité sociale"
                value={formData.assuranceMaladie}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Personne à contacter en cas d'urgence"
                name="persContactUrgence"
                placeholder="Nom complet"
                value={formData.persContactUrgence}
              />
              <InputField
                label="Téléphone de la personne à contacter"
                name="telContactUrgence"
                type="tel"
                placeholder="Ex: +33 6 12 34 56 78"
                value={formData.telContactUrgence}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Informations sur la grossesse</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Date de la première consultation"
                name="datePremiereConsultation"
                type="date"
                required
                value={formData.datePremiereConsultation}
              />
              <InputField
                label="Date des dernières règles"
                name="datesDernieresRegles"
                type="date"
                required
                value={formData.datesDernieresRegles}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Date d'accouchement prévue"
                name="dateAccouchementPrevue"
                type="date"
                value={formData.dateAccouchementPrevue}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <InputField
                  label="Gestité (nombre de grossesses)"
                  name="gestite"
                  type="number"
                  required
                  value={formData.gestite}
                />
                <p className="text-xs text-pink-500 mt-1">
                  Incluant la grossesse actuelle
                </p>
              </div>
              <div className="flex flex-col">
                <InputField
                  label="Parité (nombre d'accouchements)"
                  name="parite"
                  type="number"
                  required
                  value={formData.parite}
                />
                <p className="text-xs text-pink-500 mt-1">
                  Nombre d'enfants nés vivants ou mort-nés
                </p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Antécédents médicaux</h2>
            <TextAreaField
              label="Antécédents médicaux"
              name="antecedentsMedicaux"
              placeholder="Maladies chroniques, hospitalisations, etc."
              rows={4}
              value={formData.antecedentsMedicaux}
            />
            <TextAreaField
              label="Antécédents chirurgicaux"
              name="antecedentsChirurgicaux"
              placeholder="Interventions chirurgicales précédentes"
              rows={4}
              value={formData.antecedentsChirurgicaux}
            />
            <TextAreaField
              label="Antécédents gynécologiques"
              name="antecedentsGyneco"
              placeholder="Pathologies gynécologiques, contraception, etc."
              rows={4}
              value={formData.antecedentsGyneco}
            />
            <TextAreaField
              label="Antécédents obstétricaux"
              name="antecedentsObstetricaux"
              placeholder="Détails des grossesses et accouchements précédents"
              rows={4}
              value={formData.antecedentsObstetricaux}
            />
            <TextAreaField
              label="Allergies"
              name="allergies"
              placeholder="Médicaments, aliments, etc."
              rows={2}
              value={formData.allergies}
            />
            <TextAreaField
              label="Médicaments actuels"
              name="medicamentsActuels"
              placeholder="Liste des médicaments actuellement pris"
              rows={3}
              value={formData.medicamentsActuels}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Habitudes de vie</h2>
            <div className="border border-pink-200 rounded-lg p-4 mb-4">
              <CheckboxField
                label="Tabac"
                name="tabac"
                value={formData.tabac}
              />
              {formData.tabac && (
                <InputField
                  label="Nombre de cigarettes par jour"
                  name="nbCigarettes"
                  type="number"
                  placeholder="0"
                  value={formData.nbCigarettes}
                />
              )}
            </div>

            <div className="border border-pink-200 rounded-lg p-4 mb-4">
              <CheckboxField
                label="Consommation d'alcool"
                name="alcool"
                value={formData.alcool}
              />
              {formData.alcool && (
                <TextAreaField
                  label="Détails sur la consommation d'alcool"
                  name="consommationAlcool"
                  placeholder="Fréquence, quantité, etc."
                  rows={2}
                  value={formData.consommationAlcool}
                />
              )}
            </div>

            <div className="border border-pink-200 rounded-lg p-4 mb-4">
              <CheckboxField
                label="Consommation de drogues"
                name="drogues"
                value={formData.drogues}
              />
              {formData.drogues && (
                <TextAreaField
                  label="Détails sur la consommation de drogues"
                  name="detailDrogues"
                  placeholder="Types, fréquence, etc."
                  rows={2}
                  value={formData.detailDrogues}
                />
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Examen initial</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                label="Poids (kg)"
                name="poids"
                type="number"
                step="0.1"
                required
                value={formData.poids}
              />
              <InputField
                label="Taille (cm)"
                name="taille"
                type="number"
                required
                value={formData.taille}
              />
              <InputField
                label="Tension artérielle"
                name="tension"
                placeholder="Ex: 120/80"
                required
                value={formData.tension}
              />
              <InputField
                label="Pouls (bpm)"
                name="pouls"
                type="number"
                required
                value={formData.pouls}
              />
              <InputField
                label="Température (°C)"
                name="temperature"
                type="number"
                step="0.1"
                required
                value={formData.temperature}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Examens complémentaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Groupe sanguin"
                name="groupeSanguin"
                options={[
                  { value: 'A', label: 'A' },
                  { value: 'B', label: 'B' },
                  { value: 'AB', label: 'AB' },
                  { value: 'O', label: 'O' }
                ]}
                value={formData.groupeSanguin}
              />
              <SelectField
                label="Rhésus"
                name="rhesus"
                options={[
                  { value: 'positif', label: 'Positif (+)' },
                  { value: 'negatif', label: 'Négatif (-)' }
                ]}
                value={formData.rhesus}
              />
            </div>
            <TextAreaField
              label="Examens sanguins"
              name="examensSanguin"
              placeholder="Résultats des examens sanguins"
              rows={4}
              value={formData.examensSanguin}
            />
            <TextAreaField
              label="Échographie"
              name="echographie"
              placeholder="Observations de l'échographie"
              rows={4}
              value={formData.echographie}
            />
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Observations et suivi</h2>
            <TextAreaField
              label="Observations générales"
              name="observations"
              placeholder="Notes et observations cliniques"
              rows={4}
              value={formData.observations}
            />
            <TextAreaField
              label="Prescriptions médicales"
              name="prescriptionsMedicales"
              placeholder="Médicaments prescrits, posologie, etc."
              rows={4}
              value={formData.prescriptionsMedicales}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Prochain rendez-vous"
                name="prochainRendezVous"
                type="date"
                value={formData.prochainRendezVous}
              />
              <InputField
                label="Médecin traitant"
                name="medecinTraitant"
                placeholder="Nom du médecin"
                value={formData.medecinTraitant}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Barre de progression
  const ProgressBar = () => {
    const totalSteps = 7;
    const progress = ((formStep + 1) / totalSteps) * 100;

    return (
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-pink-700">Étape {formStep + 1} sur {totalSteps}</span>
          <span className="text-sm font-medium text-pink-700">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-pink-100 rounded-full h-2.5">
          <div
            className="bg-pink-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Notification de succès
  const Notification = () => {
    if (!showNotification) return null;

    return (
      <div className="fixed bottom-4 right-4 flex items-center p-4 mb-4 text-pink-800 rounded-lg bg-pink-50 shadow-lg">
        <Check className="flex-shrink-0 w-4 h-4 mr-2" />
        <span className="font-medium">Dossier enregistré avec succès!</span>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-pink-50 text-pink-500 rounded-lg p-1.5 hover:bg-pink-200 inline-flex h-8 w-8"
          onClick={() => setShowNotification(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <div className="flex bg-white min-h-screen">
      <div className="fixed top-0 left-0 h-full z-10">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64">
        <div className="w-full max-w-none py-6 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Calendar className="mr-2 text-pink-600" />
                Création d'un dossier médical - Suivi de grossesse
              </h1>
              <p className="text-gray-600 mt-2">
                Veuillez remplir les informations suivantes pour créer un nouveau dossier de suivi de grossesse.
              </p>
            </div>

            <ProgressBar />

            <form onSubmit={handleSubmit}>
              {renderFormStep()}

              <div className="mt-8 flex justify-between">
                {formStep > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Précédent
                  </button>
                )}
                {formStep < 6 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Suivant
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <Save size={16} className="mr-2" />
                    Enregistrer le dossier
                  </button>
                )}
              </div>
            </form>

            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex items-center text-gray-500 text-sm">
                <Info size={16} className="mr-2 text-pink-500" />
                <span>Les champs marqués d'un <span className="text-pink-500">*</span> sont obligatoires.</span>
              </div>

              <div className="mt-3 flex items-start text-gray-500 text-sm">
                <AlertCircle size={16} className="mr-2 text-pink-500 flex-shrink-0 mt-0.5" />
                <p>
                  Toutes les informations saisies dans ce formulaire sont confidentielles et
                  protégées par le secret médical conformément à la législation en vigueur.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Notification />
      </div>
    </div>
  );
}
