import {AddInstrumentFormData} from "@/types";

const API_URL = 'http://localhost:8080/api/v1';

const handleResponse = async (response: Response) => {
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
};

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name, email, password}),
  });
  return handleResponse(response);
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  });
  return handleResponse(response);
};

export const getWatchlists = async () => {
  const token = localStorage.getItem('tickr_token');
  const response = await fetch(`${API_URL}/watchlists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await handleResponse(response);
  return data.data;
};

export const createWatchlist = async (name: string) => {
  const token = localStorage.getItem('tickr_token');
  const response = await fetch(`${API_URL}/watchlists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  const data = await handleResponse(response);
  return data.data;
};

export const renameWatchlist = async ({ id, name }: { id: string, name: string }) => {
  const token = localStorage.getItem('tickr_token');
  const response = await fetch(`${API_URL}/watchlists/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  })
  const data = await handleResponse(response);
  return data.data;
}

export const getWatchlistItems = async (id: string) => {
  const token = localStorage.getItem('tickr_token');
  const response = await fetch(`${API_URL}/watchlists/${id}/instruments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await handleResponse(response);
  return data.data;
};

export const searchInstruments = async (query: string) => {
  const token = localStorage.getItem('tickr_token');
  const response = await fetch(`${API_URL}/instruments/search?query=${query}&page=0&size=10`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await handleResponse(response);
  return data.data;
};

export const deleteWatchlist = async (id: string) => {
  const token = localStorage.getItem('tickr_token');
  const response = await fetch(`${API_URL}/watchlists/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}


export const removeInstrumentFromWatchlist = async (watchlistId: string, instrumentId: string) => {
  const token = localStorage.getItem('tickr_token');
  const response = await fetch(`${API_URL}/watchlists/${watchlistId}/instruments/${instrumentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

export const addInstrumentToWatchlist = async (watchlistId: string, instrument: AddInstrumentFormData) => {
  const token = localStorage.getItem('tickr_token');
  const response = await fetch(`${API_URL}/watchlists/${watchlistId}/instruments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(instrument)
  })

  return handleResponse(response);
}

export const deleteInstrumentFromWatchlist = async (instrumentId: string) => {
  const token = localStorage.getItem('tickr_token');
  const response = await fetch(`${API_URL}/watchlists/instruments/${instrumentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })

  return handleResponse(response);
}

export const getUser = async () => {
  const token = localStorage.getItem('tickr_token');
  const response = await fetch(`${API_URL}/user/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return await handleResponse(response);
};