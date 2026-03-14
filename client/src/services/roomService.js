const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function buildUrl(path) {
  // If VITE_API_BASE_URL is not set, rely on Vite proxy with relative /api paths.
  return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
}

async function handleResponse(response) {
  const status = response.status;
  const text = await response.text();

  // STEP 2 (debug): log status + raw response text before JSON parsing.
  // Only logs in dev to avoid noisy production consoles.
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[rooms api]", { status, url: response.url, body: text });
  }

  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    // If backend returned HTML (common when request hits Vite dev server),
    // give a clear error message.
    const looksLikeHtml = text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html");
    if (looksLikeHtml) {
      throw new Error(
        "Backend returned HTML instead of JSON. Check VITE_API_BASE_URL or Vite proxy for /api."
      );
    }

    throw new Error(data?.message || `Request failed (${status})`);
  }

  return data ?? {};
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchRooms() {
  const response = await fetch(buildUrl("/api/rooms"), {
    headers: {
      ...getAuthHeaders(),
    },
  });

  return handleResponse(response);
}

export async function createRoom({ name }) {
  const response = await fetch(buildUrl("/api/rooms"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ name }),
  });

  return handleResponse(response);
}

export async function fetchRoomMessages({ roomId, page = 1, limit = 50 }) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(
    buildUrl(`/api/rooms/${roomId}/messages?${params.toString()}`),
    {
      headers: {
        ...getAuthHeaders(),
      },
    }
  );

  return handleResponse(response);
}

