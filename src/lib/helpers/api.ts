export type APIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD';

export type APIHeaders = {
  responseType?: string;
};

export async function fetchApi<T>(
  method: APIMethod,
  url: string,
  body?: object,
  headers?: APIHeaders,
): Promise<T> {
  try {
    let headersSection: object = {
      'Content-Type': 'application/json',
    };

    if (headers) {
      headersSection = {
        ...headersSection,
        ...headers,
      };
    }

    const response = await fetch(`${url}`, {
      method,
      headers: {
        ...headersSection,
      },
      body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw await response.json();
    }

    if (method === 'HEAD') {
      return response as T;
    }

    // responseType 'blob
    if (headers?.responseType === 'blob') {
      const blobData = (await response.blob()) as T;

      return blobData;
    }

    const data = (await response.json()) as T;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
