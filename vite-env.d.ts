/// <reference types="vite/client" />

declare module "virtual:pwa-register" {
  export type RegisterSWOptions = {
    immediate?: boolean;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    onRegistered?: (
      registration: ServiceWorkerRegistration | undefined
    ) => void;
    onRegisterError?: (error: any) => void;
  };

  export function registerSW(
    options?: RegisterSWOptions
  ): (reloadPage?: boolean) => void;
}

// Isso aqui é essencial pro import.meta.env funcionar corretamente:
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // adicione mais variáveis do .env aqui se tiver outras
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
