import axios from "axios";

export const API_BASE_URL = "http://localhost:5454";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && jwt !== "undefined" && jwt !== "null" && jwt.trim() !== "") {
      config.headers["Authorization"] = `Bearer ${jwt}`;
    }
    console.log("API Request:", config.method?.toUpperCase(), config.url, "with token:", !!jwt);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.config.url, "Status:", response.status);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error.config?.url, error.message);
    
    // Handle 401 Unauthorized responses (session expiry)
    if (error.response?.status === 401) {
      console.log('Session expired due to 401 response, triggering logout');
      // Clear localStorage
      localStorage.removeItem("jwt");
      localStorage.removeItem('loginTimestamp');
      localStorage.removeItem('user');
      
      // Force page reload to clear any cached state
      if (typeof window !== 'undefined') {
        window.location.href = '/login?sessionExpired=true';
      }
    }
    
    return Promise.reject(error);
  }
);

export const getImageUrl = (path: string | undefined) => {
  if (!path) return '';
  if (path.startsWith('http')) return path; 
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};