// Declaración de tipos para Cloudflare Turnstile
interface Window {
  turnstile: {
    render: (container: string | HTMLElement, options: {
      sitekey: string;
      callback?: (token: string) => void;
      'error-callback'?: (error: Error) => void;
      execution?: 'render' | 'execute';
      appearance?: 'always' | 'execute' | 'interaction-only';
      size?: 'normal' | 'flexible' | 'compact';
      theme?: 'light' | 'dark' | 'auto';
    }) => string;
    execute: (container: string | HTMLElement) => void;
    getResponse: (widgetId: string) => string | undefined;
    reset: (widgetId: string) => void;
    remove: (widgetId: string) => void;
    isExpired: (widgetId: string) => boolean;
  };
}
