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

  const response = await fetch(`/api${path}`, options);

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "Si è verificato un errore",
    }));
    throw new Error(error.message);
  }

  return response;
}