import Consultations from '@/components/dossier-medical/consultations';
import Examens from '@/components/dossier-medical/examens';
import Hospitalisations from '@/components/dossier-medical/hospitalisations';
import InfosPatient from '@/components/dossier-medical/infos-patient';
import Prescriptions from '@/components/dossier-medical/prescriptions';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export default function DossierMedical() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeTab, setActiveTab] = useState('infos');

    return (
        <Tabs defaultValue="infos" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-8 grid grid-cols-5">
                <TabsTrigger value="infos">Informations</TabsTrigger>
                <TabsTrigger value="consultations">Consultations</TabsTrigger>
                <TabsTrigger value="examens">Examens</TabsTrigger>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                <TabsTrigger value="hospitalisations">Hospitalisations</TabsTrigger>
            </TabsList>

            <Card className="p-6">
                <TabsContent value="infos" className="mt-0">
                    <InfosPatient />
                </TabsContent>

                <TabsContent value="consultations" className="mt-0">
                    <Consultations />
                </TabsContent>

                <TabsContent value="examens" className="mt-0">
                    <Examens />
                </TabsContent>

                <TabsContent value="prescriptions" className="mt-0">
                    <Prescriptions />
                </TabsContent>

                <TabsContent value="hospitalisations" className="mt-0">
                    <Hospitalisations />
                </TabsContent>
            </Card>
        </Tabs>
    );
}
