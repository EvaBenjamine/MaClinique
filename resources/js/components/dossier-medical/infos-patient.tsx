import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, AlertCircle, Calendar, Heart, Mail, MapPin, Phone, User } from 'lucide-react';

export default function InfosPatient() {
    // Données fictives du patient
    const patient = {
        id: 'P-12345',
        nom: 'Dupont',
        prenom: 'Marie',
        dateNaissance: '15/04/1985',
        sexe: 'Féminin',
        telephone: '06 12 34 56 78',
        email: 'marie.dupont@email.com',
        adresse: '123 Avenue de la République, 75011 Paris',
        groupeSanguin: 'A+',
        allergies: ['Pénicilline', 'Arachides'],
        antecedents: ['Hypertension artérielle (2018)', 'Fracture du poignet droit (2015)', 'Appendicectomie (2010)'],
        medecinTraitant: 'Dr. Laurent Martin',
    };

    return (
        <div className="space-y-6">
            <h2 className="mb-4 text-xl font-semibold">Informations du Patient</h2>

            <div className="flex flex-col gap-6 md:flex-row">
                <div className="md:w-1/3">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center">
                                <Avatar className="mb-4 h-24 w-24">
                                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt={`${patient.prenom} ${patient.nom}`} />
                                    <AvatarFallback>{`${patient.prenom.charAt(0)}${patient.nom.charAt(0)}`}</AvatarFallback>
                                </Avatar>

                                <h3 className="text-lg font-medium">{`${patient.prenom} ${patient.nom}`}</h3>
                                <p className="text-muted-foreground mb-2 text-sm">ID: {patient.id}</p>

                                <Badge variant="outline" className="mb-4">
                                    {patient.groupeSanguin}
                                </Badge>

                                <div className="w-full space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="text-muted-foreground h-4 w-4" />
                                        <span className="text-sm">
                                            {patient.dateNaissance} ({calculateAge(patient.dateNaissance)} ans)
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <User className="text-muted-foreground h-4 w-4" />
                                        <span className="text-sm">{patient.sexe}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Phone className="text-muted-foreground h-4 w-4" />
                                        <span className="text-sm">{patient.telephone}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Mail className="text-muted-foreground h-4 w-4" />
                                        <span className="text-sm">{patient.email}</span>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <MapPin className="text-muted-foreground mt-0.5 h-4 w-4" />
                                        <span className="text-sm">{patient.adresse}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6 md:w-2/3">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="mb-4 flex items-center gap-2">
                                <Heart className="h-5 w-5 text-red-500" />
                                <h3 className="text-lg font-medium">Médecin Traitant</h3>
                            </div>
                            <p>{patient.medecinTraitant}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="mb-4 flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-amber-500" />
                                <h3 className="text-lg font-medium">Allergies</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {patient.allergies.map((allergie, index) => (
                                    <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                                        {allergie}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="mb-4 flex items-center gap-2">
                                <Activity className="h-5 w-5 text-blue-500" />
                                <h3 className="text-lg font-medium">Antécédents Médicaux</h3>
                            </div>
                            <ul className="list-disc space-y-1 pl-5">
                                {patient.antecedents.map((antecedent, index) => (
                                    <li key={index}>{antecedent}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Fonction pour calculer l'âge à partir de la date de naissance (format DD/MM/YYYY)
function calculateAge(dateOfBirth: string): number {
    const [day, month, year] = dateOfBirth.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}
