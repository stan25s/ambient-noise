declare global {
    interface ImportMetaEnv {
        VITE_CLOUDFLARE_BASE_URL: string;
    }
}
interface ImportMeta {
    readonly env: ImportMetaEnv;
}