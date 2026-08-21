import {
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE
} from './ActionType';

const initialState = {
  reviews: [],
  loading: false,
  error: null
};

export const reviewReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
    case CREATE_REVIEW_REQUEST:
      return { ...state, loading: true, error: null };
      
    case GET_REVIEWS_SUCCESS:
      return { ...state, loading: false, reviews: action.payload, error: null };
      
    case CREATE_REVIEW_SUCCESS:
      return { ...state, loading: false, error: null };
      
    case GET_REVIEWS_FAILURE:
    case CREATE_REVIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};