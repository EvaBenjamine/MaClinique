'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useConsultationForm, useFormHandlers } from '@/hooks/use-form-handlers';

export function ConsultationForm() {
    const form = useConsultationForm();
    const { handleSubmit } = useFormHandlers();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(form, route('consultations.store'));
    };

    // Helper pour gérer les valeurs sûrement
    const getStringValue = (value: unknown): string => {
        return typeof value === 'string' ? value : '';
    };

    const handleInputChange = (field: string, value: string) => {
        // @ts-expect-error - Problème temporaire avec les types Inertia
        form.setData(field, value);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="date">Date de consultation</Label>
                    <Input type="date" id="date" value={getStringValue(form.data.date)} onChange={(e) => handleInputChange('date', e.target.value)} />
                    {/* @ts-expect-error - Type issue with Inertia form errors */}
                    {form.errors.date && <p className="mt-1 text-sm text-red-500">{form.errors.date}</p>}
                </div>
                <div>
                    <Label htmlFor="type_consultation">Type de consultation</Label>
                    <Select
                        value={getStringValue(form.data.type_consultation)}
                        onValueChange={(value) => handleInputChange('type_consultation', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="suivi_grossesse">Suivi de grossesse</SelectItem>
                            <SelectItem value="consultation_urgence">Consultation d'urgence</SelectItem>
                            <SelectItem value="consultation_controle">Consultation de contrôle</SelectItem>
                            <SelectItem value="consultation_prenatale">Consultation prénatale</SelectItem>
                            <SelectItem value="consultation_postnatale">Consultation postnatale</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* @ts-expect-error - Type issue with Inertia form errors */}
                    {form.errors.type_consultation && <p className="mt-1 text-sm text-red-500">{form.errors.type_consultation}</p>}
                </div>
            </div>

            {/* Mesures physiques */}
            <div className="border-t pt-4">
                <h4 className="text-muted-foreground mb-3 text-sm font-medium">Mesures physiques</h4>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="poids">Poids (kg)</Label>
                        <Input
                            type="number"
                            step="0.1"
                            id="poids"
                            placeholder="65.5"
                            value={getStringValue(form.data.poids)}
                            onChange={(e) => handleInputChange('poids', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="tension_arterielle_systolique">Tension systolique</Label>
                        <Input
                            type="number"
                            step="0.1"
                            id="tension_arterielle_systolique"
                            placeholder="120"
                            value={getStringValue(form.data.tension_arterielle_systolique)}
                            onChange={(e) => handleInputChange('tension_arterielle_systolique', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="tension_arterielle_diastolique">Tension diastolique</Label>
                        <Input
                            type="number"
                            step="0.1"
                            id="tension_arterielle_diastolique"
                            placeholder="80"
                            value={getStringValue(form.data.tension_arterielle_diastolique)}
                            onChange={(e) => handleInputChange('tension_arterielle_diastolique', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Mesures obstétricales */}
            <div className="border-t pt-4">
                <h4 className="text-muted-foreground mb-3 text-sm font-medium">Mesures obstétricales</h4>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="hauteur_uterine">Hauteur utérine (cm)</Label>
                        <Input
                            type="number"
                            step="0.1"
                            id="hauteur_uterine"
                            placeholder="32.5"
                            value={getStringValue(form.data.hauteur_uterine)}
                            onChange={(e) => handleInputChange('hauteur_uterine', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="position_foetus">Position du fœtus</Label>
                        <Input
                            id="position_foetus"
                            placeholder="Vertex, siège, transverse..."
                            value={getStringValue(form.data.position_foetus)}
                            onChange={(e) => handleInputChange('position_foetus', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="rythme_cardiaque_foetal">Rythme cardiaque fœtal (bpm)</Label>
                        <Input
                            type="number"
                            id="rythme_cardiaque_foetal"
                            placeholder="140"
                            value={getStringValue(form.data.rythme_cardiaque_foetal)}
                            onChange={(e) => handleInputChange('rythme_cardiaque_foetal', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Observations et prescriptions */}
            <div className="space-y-4 border-t pt-4">
                <div>
                    <Label htmlFor="observations">Observations</Label>
                    <Textarea
                        id="observations"
                        placeholder="Observations cliniques de la consultation..."
                        rows={3}
                        value={getStringValue(form.data.observations)}
                        onChange={(e) => handleInputChange('observations', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="prescriptions">Prescriptions</Label>
                    <Textarea
                        id="prescriptions"
                        placeholder="Médicaments prescrits..."
                        rows={2}
                        value={getStringValue(form.data.prescriptions)}
                        onChange={(e) => handleInputChange('prescriptions', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="examens_prescrits">Examens prescrits</Label>
                    <Textarea
                        id="examens_prescrits"
                        placeholder="Examens à réaliser..."
                        rows={2}
                        value={getStringValue(form.data.examens_prescrits)}
                        onChange={(e) => handleInputChange('examens_prescrits', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="recommandations">Recommandations</Label>
                    <Textarea
                        id="recommandations"
                        placeholder="Recommandations pour la patiente..."
                        rows={2}
                        value={getStringValue(form.data.recommandations)}
                        onChange={(e) => handleInputChange('recommandations', e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-2 border-t pt-4">
                <Button type="submit" disabled={form.processing}>
                    {form.processing ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
            </div>
        </form>
    );
}
