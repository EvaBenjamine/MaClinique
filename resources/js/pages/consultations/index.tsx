import Sidebar from '@/components/Sidebar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default function ConsultationsIndex() {
    return (
        <Sidebar>
            <div className="py-6">
                <div className="mx-auto max-w-7xl">
                    <Card className="mb-6 border border-gray-100 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-bold text-gray-800">Gestion des Consultations</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </Sidebar>
    );
}
