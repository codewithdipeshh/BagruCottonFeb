import { 
  GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, 
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, 
  REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS,
  LOGOUT 
} from "./ActionType";

interface AuthState {
  user: any;
  isLoading: boolean;
  error: string | null;
  jwt: string | null;
}

// Fixed: State directly checks localStorage during initialization but only loads JWT if user data exists
const intialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null // Don't auto-load JWT from localStorage to prevent false login state
};

export const authReducer = (state = intialState, action: any): AuthState => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, isLoading: true, error: null };
            
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, error: null, jwt: action.payload };
            
        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload };
            
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
            
        case LOGOUT:
            return {
              user: null,
              isLoading: false,
              error: null,
              jwt: null
            };
            
        default:
            return state;
    }
};