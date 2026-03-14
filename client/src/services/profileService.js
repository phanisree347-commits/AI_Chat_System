const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`
  };
}

export async function fetchProfile() {
  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    headers: {
      ...getAuthHeaders()
    }
  });

  return handleResponse(response);
}

export async function fetchStats() {
  const response = await fetch(`${API_BASE_URL}/api/profile/stats`, {
    headers: {
      ...getAuthHeaders()
    }
  });

  return handleResponse(response);
}

export async function fetchProgress() {
  const response = await fetch(`${API_BASE_URL}/api/profile/progress`, {
    headers: {
      ...getAuthHeaders()
    }
  });

  return handleResponse(response);
}

export async function fetchAchievements() {
  const response = await fetch(`${API_BASE_URL}/api/profile/achievements`, {
    headers: {
      ...getAuthHeaders()
    }
  });

  return handleResponse(response);
}

