'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDossierPatient } from '@/contexts/dossier-patient-context';
import { Calendar, ClipboardList, Heart, Pill, Stethoscope, TestTube } from 'lucide-react';
import { AccouchementsTab } from './tabs/accouchements-tab';
import { ConsultationsTab } from './tabs/consultations-tab';
import { ExamensTab } from './tabs/examens-tab';
import { GeneralTab } from './tabs/general-tab';
import { PrescriptionsTab } from './tabs/prescriptions-tab';
import { RendezVousTab } from './tabs/rendez-vous-tab';

export function DossierTabs() {
    const { activeTab, setActiveTab } = useDossierPatient();

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-8">
                <TabsTrigger value="general" className="flex items-center space-x-1">
                    <ClipboardList className="h-4 w-4" />
                    <span className="hidden sm:inline">Général</span>
                </TabsTrigger>
                <TabsTrigger value="consultations" className="flex items-center space-x-1">
                    <Stethoscope className="h-4 w-4" />
                    <span className="hidden sm:inline">Consultations</span>
                </TabsTrigger>
                <TabsTrigger value="examens" className="flex items-center space-x-1">
                    <TestTube className="h-4 w-4" />
                    <span className="hidden sm:inline">Examens</span>
                </TabsTrigger>
                <TabsTrigger value="prescriptions" className="flex items-center space-x-1">
                    <Pill className="h-4 w-4" />
                    <span className="hidden sm:inline">Prescriptions</span>
                </TabsTrigger>
                <TabsTrigger value="rendez-vous" className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span className="hidden sm:inline">RDV</span>
                </TabsTrigger>

                <TabsTrigger value="accouchements" className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span className="hidden sm:inline">Accouchements</span>
                </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
                <GeneralTab />
            </TabsContent>

            <TabsContent value="consultations" className="space-y-4">
                <ConsultationsTab />
            </TabsContent>

            <TabsContent value="examens" className="space-y-4">
                <ExamensTab />
            </TabsContent>

            <TabsContent value="prescriptions" className="space-y-4">
                <PrescriptionsTab />
            </TabsContent>

            <TabsContent value="rendez-vous" className="space-y-4">
                <RendezVousTab />
            </TabsContent>

            <TabsContent value="accouchements" className="space-y-4">
                <AccouchementsTab />
            </TabsContent>
        </Tabs>
    );
}
