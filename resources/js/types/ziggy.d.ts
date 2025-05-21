declare module 'ziggy-js' {
    import type { Config, RouteParam, RouteParamsWithQueryOverload } from 'ziggy-js';

    export default function route(name?: string, params?: RouteParamsWithQueryOverload | RouteParam, absolute?: boolean, config?: Config): string;
}
