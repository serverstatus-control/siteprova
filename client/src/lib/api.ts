// Configurazione API base URL
const getApiBaseUrl = () => {
  // In development, usa localhost
  if (import.meta.env.DEV) {
    return 'http://localhost:3001';
  }
  // Permetti override via env di build (es. VITE_API_BASE)
  if (import.meta.env.VITE_API_BASE) {
    return import.meta.env.VITE_API_BASE as string;
  }
  
  // In production, usa il backend appropriato
  const hostname = window.location.hostname;
  
  // Su GitHub Pages, usa il backend Render
  if (hostname === 'serverstatus-control.github.io') {
    return 'https://server-status.onrender.com';
  }
  
  // Su Render stesso, usa percorsi relativi
  if (hostname.includes('onrender.com')) {
    return '';
  }
  
  // Fallback per altri domini
  return '';
};

// Funzione per effettuare richieste API
export async function apiRequest(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  path: string,
  body?: any
) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Necessario per inviare/ricevere cookies
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  // Determina l'URL completo
  const apiBaseUrl = getApiBaseUrl();
  let resolvedPath: string;
  
  if (path.startsWith('http')) {
    // URL completo già fornito
    resolvedPath = path;
  } else if (path.startsWith('/api')) {
    // Percorso API completo
    resolvedPath = apiBaseUrl ? `${apiBaseUrl}${path}` : path;
  } else {
    // Percorso relativo, aggiungi /api
    resolvedPath = apiBaseUrl ? `${apiBaseUrl}/api${path}` : `/api${path}`;
  }

  console.log('Making API request:', {
    method,
    path: resolvedPath,
    apiBaseUrl: getApiBaseUrl(),
    hasBody: !!body
  });

  const response = await fetch(resolvedPath, options);
  
  console.log('API response received:', {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText
  });

  if (!response.ok) {
    console.error(`API Error (${response.status}):`, {
      path: resolvedPath,
      method,
      status: response.status,
      statusText: response.statusText
    });
    // Try to get a JSON error body, otherwise fallback to text
    let bodyText: string | null = null;
    try {
      bodyText = await response.text();
    } catch (e) {
      console.error('Failed to read response body:', e);
    }

    // If HTML or empty, include statusText to help debugging
    const message = (() => {
      if (!bodyText) return `Errore ${response.status}: ${response.statusText}`;
      try {
        const parsed = JSON.parse(bodyText);
        return parsed && parsed.message ? parsed.message : JSON.stringify(parsed);
      } catch (e) {
        return bodyText;
      }
    })();

    // Special handling for auth errors
    if (response.status === 401 || response.status === 403) {
      throw new Error(`Authentication error (${response.status}): ${message}`);
    }

    throw new Error(message || `Errore ${response.status}: ${response.statusText}`);
  }

  return response;
}