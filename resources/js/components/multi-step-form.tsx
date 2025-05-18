'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

// Define the form data structure
type FormData = {
    userType: string;
    name: string;
    email: string;
    companyName?: string;
    companySize?: string;
    industry?: string;
    serviceType?: string;
    budget?: string;
    requirements?: string[];
    contactPreference?: string;
};

export default function MultiStepForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        userType: '',
        name: '',
        email: '',
    });

    // Update form data
    const updateFormData = (field: string, value: unknown) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Handle next step
    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    // Handle previous step
    const handlePrevious = () => {
        setStep((prev) => prev - 1);
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Here you would typically send the data to your backend
        setStep(5); // Move to success step
    };

    // Check if current step is valid
    const isStepValid = () => {
        switch (step) {
            case 1:
                return formData.userType !== '';
            case 2:
                return (
                    formData.name !== '' &&
                    formData.email !== '' &&
                    (formData.userType === 'individual' || (formData.companyName !== '' && formData.companySize !== ''))
                );
            case 3:
                return formData.serviceType !== '';
            case 4:
                return formData.budget !== '' && (formData.requirements?.length ?? 0) > 0 && formData.contactPreference !== '';
            default:
                return true;
        }
    };

    // Get available service types based on user type and industry
    const getServiceTypes = () => {
        if (formData.userType === 'individual') {
            return ['Personal Consultation', 'Career Coaching', 'Financial Planning'];
        } else {
            switch (formData.industry) {
                case 'technology':
                    return ['Software Development', 'IT Consulting', 'Cloud Migration'];
                case 'healthcare':
                    return ['Medical Systems', 'Patient Management', 'Healthcare Analytics'];
                case 'finance':
                    return ['Financial Analysis', 'Investment Strategy', 'Risk Management'];
                default:
                    return ['General Consulting', 'Project Management', 'Strategic Planning'];
            }
        }
    };

    // Render form steps
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <CardHeader>
                            <CardTitle>Step 1: Select User Type</CardTitle>
                            <CardDescription>Please select the type of user you are</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup value={formData.userType} onValueChange={(value) => updateFormData('userType', value)} className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="individual" id="individual" />
                                    <Label htmlFor="individual">Individual</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="business" id="business" />
                                    <Label htmlFor="business">Business</Label>
                                </div>
                            </RadioGroup>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <div></div>
                            <Button onClick={handleNext} disabled={!isStepValid()}>
                                Next <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <CardHeader>
                            <CardTitle>Step 2: Your Information</CardTitle>
                            <CardDescription>
                                {formData.userType === 'individual' ? 'Please provide your personal details' : 'Please provide your company details'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => updateFormData('name', e.target.value)}
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateFormData('email', e.target.value)}
                                    placeholder="Your email"
                                />
                            </div>

                            {formData.userType === 'business' && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="companyName">Company Name</Label>
                                        <Input
                                            id="companyName"
                                            value={formData.companyName || ''}
                                            onChange={(e) => updateFormData('companyName', e.target.value)}
                                            placeholder="Your company name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="companySize">Company Size</Label>
                                        <Select value={formData.companySize} onValueChange={(value) => updateFormData('companySize', value)}>
                                            <SelectTrigger id="companySize">
                                                <SelectValue placeholder="Select company size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1-10">1-10 employees</SelectItem>
                                                <SelectItem value="11-50">11-50 employees</SelectItem>
                                                <SelectItem value="51-200">51-200 employees</SelectItem>
                                                <SelectItem value="201-500">201-500 employees</SelectItem>
                                                <SelectItem value="501+">501+ employees</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="industry">Industry</Label>
                                        <Select value={formData.industry} onValueChange={(value) => updateFormData('industry', value)}>
                                            <SelectTrigger id="industry">
                                                <SelectValue placeholder="Select industry" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="technology">Technology</SelectItem>
                                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                                <SelectItem value="finance">Finance</SelectItem>
                                                <SelectItem value="education">Education</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={handlePrevious}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                            <Button onClick={handleNext} disabled={!isStepValid()}>
                                Next <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <CardHeader>
                            <CardTitle>Step 3: Service Selection</CardTitle>
                            <CardDescription>Based on your profile, here are the services we offer</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label htmlFor="serviceType">Service Type</Label>
                                <Select value={formData.serviceType} onValueChange={(value) => updateFormData('serviceType', value)}>
                                    <SelectTrigger id="serviceType">
                                        <SelectValue placeholder="Select service type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getServiceTypes().map((service) => (
                                            <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
                                                {service}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={handlePrevious}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                            <Button onClick={handleNext} disabled={!isStepValid()}>
                                Next <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-4">
                        <CardHeader>
                            <CardTitle>Step 4: Additional Details</CardTitle>
                            <CardDescription>Please provide some final details about your project</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="budget">Budget Range</Label>
                                <Select value={formData.budget} onValueChange={(value) => updateFormData('budget', value)}>
                                    <SelectTrigger id="budget">
                                        <SelectValue placeholder="Select budget range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="under-1000">Under $1,000</SelectItem>
                                        <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                                        <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                                        <SelectItem value="10000-50000">$10,000 - $50,000</SelectItem>
                                        <SelectItem value="over-50000">Over $50,000</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Project Requirements</Label>
                                <div className="space-y-2">
                                    {getRequirementOptions().map((requirement) => (
                                        <div key={requirement.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={requirement.id}
                                                checked={(formData.requirements || []).includes(requirement.id)}
                                                onCheckedChange={(checked) => {
                                                    const currentRequirements = formData.requirements || [];
                                                    if (checked) {
                                                        updateFormData('requirements', [...currentRequirements, requirement.id]);
                                                    } else {
                                                        updateFormData(
                                                            'requirements',
                                                            currentRequirements.filter((id) => id !== requirement.id),
                                                        );
                                                    }
                                                }}
                                            />
                                            <Label htmlFor={requirement.id}>{requirement.label}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contactPreference">Preferred Contact Method</Label>
                                <Select value={formData.contactPreference} onValueChange={(value) => updateFormData('contactPreference', value)}>
                                    <SelectTrigger id="contactPreference">
                                        <SelectValue placeholder="Select contact preference" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="email">Email</SelectItem>
                                        <SelectItem value="phone">Phone</SelectItem>
                                        <SelectItem value="video-call">Video Call</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={handlePrevious}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                            <Button onClick={handleSubmit} disabled={!isStepValid()}>
                                Submit
                            </Button>
                        </CardFooter>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-4 text-center">
                        <CardHeader>
                            <CardTitle>Thank You!</CardTitle>
                            <CardDescription>Your submission has been received</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 flex justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <Check className="h-8 w-8 text-green-600" />
                                </div>
                            </div>
                            <p>We'll be in touch with you shortly via your preferred contact method.</p>
                        </CardContent>
                    </div>
                );
        }
    };

    // Get requirement options based on service type
    const getRequirementOptions = () => {
        const baseOptions = [
            { id: 'urgent', label: 'Urgent delivery' },
            { id: 'support', label: 'Ongoing support' },
        ];

        if (!formData.serviceType) return baseOptions;

        if (formData.userType === 'individual') {
            return [...baseOptions, { id: 'one-on-one', label: 'One-on-one sessions' }, { id: 'materials', label: 'Written materials' }];
        } else {
            if (formData.serviceType.includes('software') || formData.serviceType.includes('it')) {
                return [
                    ...baseOptions,
                    { id: 'integration', label: 'System integration' },
                    { id: 'training', label: 'Staff training' },
                    { id: 'maintenance', label: 'Maintenance plan' },
                ];
            } else if (formData.serviceType.includes('medical') || formData.serviceType.includes('healthcare')) {
                return [
                    ...baseOptions,
                    { id: 'compliance', label: 'HIPAA compliance' },
                    { id: 'data-migration', label: 'Data migration' },
                    { id: 'training', label: 'Staff training' },
                ];
            } else {
                return [
                    ...baseOptions,
                    { id: 'report', label: 'Detailed reporting' },
                    { id: 'presentation', label: 'Executive presentation' },
                    { id: 'consultation', label: 'Regular consultation' },
                ];
            }
        }
    };

    // Calculate progress percentage
    const progress = Math.min(((step - 1) / 4) * 100, 100);

    return (
        <Card className="w-full">
            {step < 5 && (
                <div className="px-6 pt-6">
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
                        <div className="bg-primary absolute h-full transition-all duration-300 ease-in-out" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">Step {step} of 4</div>
                </div>
            )}
            {renderStep()}
        </Card>
    );
}
