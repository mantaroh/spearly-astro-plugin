interface SpearlyConfig {
  apiKey: string;
  projectId: string;
  baseUrl: string;
}

export class SpearlyClient {
  private config: SpearlyConfig;

  constructor(config: SpearlyConfig) {
    this.config = config;
  }

  private async fetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.config.baseUrl}${path}`;
    const headers = {
      'Accept': 'application/vnd.spearly.v2+json',
      'Authorization': `Bearer ${this.config.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Spearly API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getContent<T>(contentId: string): Promise<T> {
    return this.fetch<T>(`/api/v2/contents/${contentId}`);
  }

  async getContents<T>(params?: {
    page?: number;
    perPage?: number;
    filters?: Record<string, any>;
  }): Promise<{
    data: T[];
    meta: {
      totalCount: number;
      totalPages: number;
      currentPage: number;
    };
  }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.perPage) queryParams.append('per_page', params.perPage.toString());
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        queryParams.append(`filters[${key}]`, value.toString());
      });
    }

    return this.fetch(`/api/v2/contents?${queryParams.toString()}`);
  }
} 