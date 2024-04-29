export function addApiBase(path: string): string {
    const config = useRuntimeConfig();

    // При SSR грузим данные по локалке
    const base = process.server ? config.public.apiBaseLocal : config.public.apiBase;

    return `${base}:${config.public.apiPort}/api/${path}`;
}
