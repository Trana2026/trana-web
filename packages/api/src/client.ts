import type { ProblemDetail } from './types';
import { ApiError } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: BodyInit | object;
  query?: Record<string, string | number | undefined>;
  headers?: HeadersInit;
  signal?: AbortSignal;
};

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, query, headers, signal } = options;

  const url = new URL(path, BASE_URL);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }

  const isFormData = body instanceof FormData;
  const isJsonBody = body !== undefined && !isFormData;

  const init: RequestInit = {
    method,
    credentials: 'omit',
    headers: {
      ...(isJsonBody ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    signal,
  };

  if (body !== undefined) {
    init.body = isFormData ? (body as FormData) : JSON.stringify(body);
  }

  const res = await fetch(url, init);

  if (!res.ok) {
    let problem: ProblemDetail;
    try {
      problem = (await res.json()) as ProblemDetail;
    } catch {
      problem = {
        type: 'about:blank',
        title: res.statusText || 'Unknown error',
        status: res.status,
        detail: res.statusText || 'Unknown error',
        code: `HTTP_${res.status}`,
        timestamp: new Date().toISOString(),
      };
    }
    throw new ApiError(problem);
  }

  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return undefined as T;
  }

  return (await res.json()) as T;
}
