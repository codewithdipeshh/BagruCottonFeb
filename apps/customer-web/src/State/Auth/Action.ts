import axios from "axios";
import { Dispatch } from "redux";
import { API_BASE_URL } from "../../config/apiConfig"; 
import { 
  GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, 
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, 
  LOGOUT, 
  REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS 
} from "./ActionType";

interface AuthResponse {
  jwt?: string;
  message?: string;
  [key: string]: any;
}

// Helper: Port 4000 (Admin) aur Normal Port (Customer) ke liye storage key isolate karta hai
const getAuthTokenKey = (): string => {
  return typeof window !== "undefined" && window.location.port === "4000" ? "adminJwt" : "jwt";
};

// Helper: Clear invalid tokens on app initialization
export const clearInvalidTokens = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("jwt");
    if (token) {
      // Check if token is valid by attempting to decode it
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          localStorage.removeItem("jwt");
        }
      } catch (e) {
        localStorage.removeItem("jwt");
      }
    }
  }
};

// REGISTER
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (message: string) => ({ type: REGISTER_SUCCESS, payload: message });
const registerFailure = (error: string) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData: any): any => async (dispatch: Dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/signup`, userData);
    const data = response.data;
    
    // Since verification link is used, backend returns a message instead of JWT during registration
    if (data.message) {
      dispatch(registerSuccess(data.message));
      return { success: true, message: data.message };
    } else {
      const err = "Registration response message missing from server";
      dispatch(registerFailure(err));
      return { success: false, message: err };
    }
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
    dispatch(registerFailure(errorMsg));
    return { success: false, message: errorMsg };
  }
};

// LOGIN
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (jwt: string) => ({ type: LOGIN_SUCCESS, payload: jwt });
const loginFailure = (error: string) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData: any): any => async (dispatch: Dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/signin`, userData);
    const data = response.data;
    
    if (data.jwt) {
      const tokenKey = getAuthTokenKey();
      localStorage.setItem(tokenKey, data.jwt);
      // Save login timestamp for 48-hour session expiry
      localStorage.setItem('loginTimestamp', Date.now().toString());
      dispatch(loginSuccess(data.jwt));
      return data;
    } else {
      const err = "Token not received from authentication server";
      dispatch(loginFailure(err));
    }
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
    dispatch(loginFailure(errorMsg));
  }
};

// GOOGLE LOGIN
export const loginWithGoogle = (googleToken: string): any => async (dispatch: Dispatch) => {
  dispatch(loginRequest()); 
  try {
    console.log("Redux pipeline firing Google ID Token to backend...");
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/google`, { 
      token: googleToken 
    });
    const data = response.data;
    
    if (data.jwt) {
      const tokenKey = getAuthTokenKey();
      localStorage.setItem(tokenKey, data.jwt);
      // Save login timestamp for 48-hour session expiry
      localStorage.setItem('loginTimestamp', Date.now().toString());
      dispatch(loginSuccess(data.jwt)); 
      return data.jwt;
    } else {
      const err = "Google validation token missing from backend response";
      dispatch(loginFailure(err));
    }
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
    dispatch(loginFailure(errorMsg));
  }
};

// GET USER PROFILE
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user: any) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error: string) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt: string): any => async (dispatch: Dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/users/profile`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });
    const user = response.data;
    console.log('User profile synchronized successfully:', user);
    
    dispatch(getUserSuccess(user));
  } catch (error: any) {
    if (error.response?.status === 401) {
      const tokenKey = getAuthTokenKey();
      localStorage.removeItem(tokenKey);
      dispatch({ type: LOGOUT, payload: null });
    }
    const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
    dispatch(getUserFailure(errorMsg));
  }
};

// LOGOUT
export const logout = (): any => (dispatch: Dispatch) => {
  const tokenKey = getAuthTokenKey();
  localStorage.removeItem(tokenKey);
  localStorage.removeItem('loginTimestamp'); // Clear login timestamp on logout
  dispatch({ type: LOGOUT, payload: null });
};

// FORGOT PASSWORD ACTION
export const forgotPassword = (email: string): any => async (dispatch: Dispatch) => {
  dispatch({ type: "FORGOT_PASSWORD_REQUEST" });
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
    dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: response.data.message });
    return { success: true, message: response.data.message || "Reset link sent successfully!" };
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || "Failed to send reset email. Please try again.";
    dispatch({ type: "FORGOT_PASSWORD_FAILURE", payload: errorMsg });
    return { success: false, message: errorMsg };
  }
};

// RESET PASSWORD ACTION
export const resetPassword = (data: { token: string; newPassword: string }): any => async (dispatch: Dispatch) => {
  dispatch({ type: "RESET_PASSWORD_REQUEST" });
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, data);
    dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: response.data.message });
    return { success: true, message: response.data.message };
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || "Invalid or expired token.";
    dispatch({ type: "RESET_PASSWORD_FAILURE", payload: errorMsg });
    return { success: false, message: errorMsg };
  }
};

// VERIFY EMAIL ACTION
export const verifyEmail = (data: { token: string; email: string }): any => async (dispatch: Dispatch) => {
  dispatch({ type: "VERIFY_EMAIL_REQUEST" });
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-email`, data);
    dispatch({ type: "VERIFY_EMAIL_SUCCESS", payload: response.data.message });
    return { success: true, message: response.data.message };
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || "Invalid or expired verification link.";
    dispatch({ type: "VERIFY_EMAIL_FAILURE", payload: errorMsg });
    return { success: false, message: errorMsg };
  }
};