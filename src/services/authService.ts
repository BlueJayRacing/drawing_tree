import axios from 'axios';

const API_BASE_URL = 'https://api.baserow.io/api';

export async function login(username: string, password: string): Promise<string> {
  const response = await axios.post(`${API_BASE_URL}/user/token-auth/`, {
    username,
    password,
  });
  return response.data.token;
}

export function setAuthToken(token: string) {
  localStorage.setItem('authToken', token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

export function removeAuthToken() {
  localStorage.removeItem('authToken');
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}