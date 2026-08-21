import { Dispatch } from "redux";
import { api } from "../../config/apiConfig";
import { 
  GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, 
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, 
  LOGOUT, 
  REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS 
} from "./ActionType";

const getAuthConfig = () => {
  const token = localStorage.getItem("jwt");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// ================= REGISTER ACTION HANDLING =================
export const register = (userData: any): any => async (dispatch: Dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await api.post(`/auth/signup`, userData);
    const data = response.data;
    
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("user_role", data.user?.role || "USER");
      dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    } else {
      dispatch({ type: REGISTER_SUCCESS, payload: "COOKIE_STORED" });
    }
    
    if (data.user) {
      dispatch({ type: GET_USER_SUCCESS, payload: data.user });
    }
    return { success: true };
  } catch (error: any) {
    dispatch({ type: REGISTER_FAILURE, payload: error.response?.data?.error || error.message });
  }
};

// ================= STANDARD EMAIL LOGIN ACTION HANDLING =================
export const login = (userData: any): any => async (dispatch: Dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await api.post(`/auth/signin`, userData);
    const data = response.data;

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("user_role", data.user?.role || "USER");
      dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    } else {
      dispatch({ type: LOGIN_SUCCESS, payload: "COOKIE_STORED" });
    }

    if (data.user) {
      dispatch({ type: GET_USER_SUCCESS, payload: data.user });
    }
    return { success: true };
  } catch (error: any) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.error || error.message });
    throw error;
  }
};

// ================= GOOGLE CUSTOM AUTH ACTION HANDLING =================
export const loginWithGoogle = (googleToken: string): any => async (dispatch: Dispatch) => {
  dispatch({ type: LOGIN_REQUEST }); 
  try {
    const response = await api.post(`/auth/google`, { token: googleToken });
    const data = response.data;

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("user_role", data.user?.role || "USER");
      dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    } else {
      dispatch({ type: LOGIN_SUCCESS, payload: "COOKIE_STORED" }); 
    }
    
    if (data.user) {
      dispatch({ type: GET_USER_SUCCESS, payload: data.user });
    }
    return { success: true };
  } catch (error: any) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.error || error.message });
    throw error;
  }
};


export const getUser = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const response = await api.get(`/users/profile`, getAuthConfig());
    if (response.data) {
      localStorage.setItem("user_role", response.data.role || "USER");
    }
    dispatch({ type: GET_USER_SUCCESS, payload: response.data });
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user_role");
      dispatch({ type: LOGOUT, payload: null });
    }
    dispatch({ type: GET_USER_FAILURE, payload: error.response?.data?.error || error.message });
  }
};

// ================= SYSTEM DE-AUTHENTICATE LOGOUT =================
export const logout = (): any => async (dispatch: Dispatch) => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user_role");
  dispatch({ type: LOGOUT, payload: null });
};