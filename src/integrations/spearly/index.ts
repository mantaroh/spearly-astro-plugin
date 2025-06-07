import type { AstroIntegration } from 'astro';

export interface SpearlyOptions {
  apiKey: string;
  projectId: string;
  baseUrl?: string;
}

export default function spearly(options: SpearlyOptions): AstroIntegration {
  const { apiKey, projectId, baseUrl = 'https://api.spearly.com' } = options;

  return {
    name: '@mantaroh/spearly-astro',
    hooks: {
      'astro:config:setup': ({ injectScript }: { injectScript: (stage: string, code: string) => void }) => {
        // クライアントサイドのスクリプトを注入
        injectScript('page', `
          window.SPEARLY_CONFIG = {
            apiKey: '${apiKey}',
            projectId: '${projectId}',
            baseUrl: '${baseUrl}'
          };
        `);
      },
    },
  };
} 