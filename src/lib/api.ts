const API_URL = 'http://localhost:8080/api/v1';

export const registerUser = async (name: string, email: string, password: string) => {
  return await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name, email, password}),
  });
};

export const loginUser = async (email: string, password: string) => {
  return await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  });
};
