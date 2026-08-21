import { api } from '../../config/apiConfig';
import {
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE
} from './ActionType';

// 🌟 Fetch Reviews (Removed "/api")
export const getProductReviews = (productId: string | number) => async (dispatch: any) => {
  dispatch({ type: GET_REVIEWS_REQUEST });
  try {
    const jwt = localStorage.getItem("jwt");
    const headers = jwt ? { Authorization: `Bearer ${jwt}` } : {};

    // ⚡ Changed: /api/reviews/... se badal kar /reviews/... kar diya hai
    const { data } = await api.post(`/reviews/porduct/${productId}`, {}, { headers });
    
    dispatch({ type: GET_REVIEWS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: GET_REVIEWS_FAILURE,
      payload: error.response?.data?.error || error.message
    });
  }
};

// 🌟 Create Review (Removed "/api")
export const createReview = (reviewData: { productId: string | number; review: string; rating: number }) => async (dispatch: any) => {
  dispatch({ type: CREATE_REVIEW_REQUEST });
  try {
    const jwt = localStorage.getItem("jwt");
    
    if (!jwt) {
      alert("Please login first to post a review!");
      return;
    }

    const payload = {
      productId: reviewData.productId,
      rating: reviewData.rating,
      review: reviewData.review,
      comment: reviewData.review
    };

    // ⚡ Changed: /api/reviews/create se badal kar /reviews/create kar diya hai
    const { data } = await api.post('/reviews/create', payload, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    
    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
    dispatch(getProductReviews(reviewData.productId));
  } catch (error: any) {
    dispatch({
      type: CREATE_REVIEW_FAILURE,
      payload: error.response?.data?.error || error.message
    });
  }
};