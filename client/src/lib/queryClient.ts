import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Allow overriding API base at build time with VITE_API_BASE.
  // When deployed to GitHub Pages the API will usually be hosted elsewhere,
  // so set VITE_API_BASE to the full backend URL (for example https://api.example.com)
  const isDev = import.meta.env.MODE === 'development';
  const API_BASE = isDev ? '' : ((import.meta.env as any).VITE_API_BASE || '');
  const resolvedUrl = url.startsWith('/api') && API_BASE ? `${API_BASE}${url}` : url;

  const res = await fetch(resolvedUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
  const isDev = import.meta.env.MODE === 'development';
  const API_BASE = isDev ? '' : ((import.meta.env as any).VITE_API_BASE || '');
  const raw = queryKey[0] as string;
  const finalUrl = raw.startsWith('/api') && API_BASE ? `${API_BASE}${raw}` : raw;

  const res = await fetch(finalUrl, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minuti - cache più aggressiva
      gcTime: 10 * 60 * 1000, // 10 minuti (vecchio cacheTime)
      retry: 1, // Ridotto da false a 1 tentativo
      retryDelay: 1000,
    },
    mutations: {
      retry: false,
    },
  },
});
