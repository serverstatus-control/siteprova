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

  // Allow passing either a full path starting with /api or a relative path like '/favorites'
  const resolvedPath = path.startsWith('/api') || path.startsWith('http') ? path : `/api${path}`;

  console.log('Making API request:', {
    method,
    path: resolvedPath,
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