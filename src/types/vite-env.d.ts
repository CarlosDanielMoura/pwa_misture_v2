// src/types/vite-pwa.d.ts
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

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Se tiver outras variáveis do .env, declare aqui também!
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
