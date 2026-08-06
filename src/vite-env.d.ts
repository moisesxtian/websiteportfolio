/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
  readonly VITE_HCAPTCHA_SITEKEY?: string;
  readonly VITE_WEB3FORMS_KEY?: string;
  readonly VITE_LASTFM_API_KEY?: string;
  readonly VITE_LASTFM_USER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ViewTransition {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition: () => void;
}

interface Document {
  startViewTransition?: (updateCallback: () => void | Promise<void>) => ViewTransition;
}
