import axios from "axios";
import { Dispatch } from "redux";
import { API_BASE_URL } from "../../config/apiConfig"; // Apne path ke mutabik check karlein
import { 
  GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, 
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, 
  LOGOUT, 
  REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS 
} from "./ActionType";

// Types Definitions
interface AuthResponse {
  jwt?: string;
  [key: string]: any;
}

// Register Actions
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (jwt: string) => ({ type: REGISTER_SUCCESS, payload: jwt });
const registerFailure = (error: string) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData: any) => async (dispatch: Dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/signup`, userData);
    const data = response.data;
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      
      dispatch(registerSuccess(data.jwt));
      
    } else {
      dispatch(registerFailure("Token not received"));
    }
    
  } catch (error: any) {
    dispatch(registerFailure(error.response?.data?.message || error.message));
  }
};

// Login Actions
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (jwt: string) => ({ type: LOGIN_SUCCESS, payload: jwt });
const loginFailure = (error: string) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData: any) => async (dispatch: Dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/signin`, userData);
    const data = response.data;
    
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      
      dispatch(loginSuccess(data.jwt));
    } else {
      dispatch(loginFailure("Token not received"));
    }
  } catch (error: any) {
    dispatch(loginFailure(error.response?.data?.message || error.message));
  }
  
};

// Get User Profile Actions
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user: any) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error: string) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = () => async (dispatch: Dispatch) => {
  dispatch(getUserRequest());
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(`${API_BASE_URL}/users/profile`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const user = response.data;
    console.log('user',user);
    
    dispatch(getUserSuccess(user));
  } catch (error: any) {
    dispatch(getUserFailure(error.response?.data?.message || error.message));
  }
};

// Logout Action
export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT, payload: null });
};