import type { User } from './models';

declare module '@inertiajs/inertia' {
    interface PageProps {
        auth: {
            user: User;
        };
        errors: Record<string, string>;
        flash: {
            message?: string;
            type?: 'success' | 'error' | 'warning' | 'info';
        };
    }
}
