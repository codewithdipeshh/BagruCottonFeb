import { Dispatch } from 'redux';
import { api } from '../../config/apiConfig';
import {
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE,
  GET_ALL_REVIEWS_REQUEST,
  GET_ALL_REVIEWS_SUCCESS,
  GET_ALL_REVIEWS_FAILURE,
  GET_REVIEW_SUMMARY_REQUEST,
  GET_REVIEW_SUMMARY_SUCCESS,
  GET_REVIEW_SUMMARY_FAILURE,
  GET_USER_REVIEW_REQUEST,
  GET_USER_REVIEW_SUCCESS,
  GET_USER_REVIEW_FAILURE,
  MARK_REVIEW_HELPFUL_REQUEST,
  MARK_REVIEW_HELPFUL_SUCCESS,
  MARK_REVIEW_HELPFUL_FAILURE,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST, // 👈 Naya Add Kiya
  DELETE_REVIEW_SUCCESS, // 👈 Naya Add Kiya
  DELETE_REVIEW_FAILURE  // 👈 Naya Add Kiya
} from './ActionType';

export const createReview = (reviewData: any) => async (dispatch: Dispatch) => {
  dispatch({ type: CREATE_REVIEW_REQUEST });

  try {
    const formData = new FormData();
    formData.append('productId', reviewData.productId);
    formData.append('review', reviewData.review);
    formData.append('rating', reviewData.rating.toString());

    if (reviewData.images && reviewData.images.length > 0) {
      reviewData.images.forEach((image: File) => {
        formData.append('images', image);
      });
    }

    const { data } = await api.post('/reviews/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    dispatch({
      type: CREATE_REVIEW_SUCCESS,
      payload: data
    });

    return { success: true, data };
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
    dispatch({
      type: CREATE_REVIEW_FAILURE,
      payload: errorMsg
    });
    return { success: false, error: errorMsg };
  }
};

export const getAllReviews = (productId: string, options: any = {}) => async (dispatch: Dispatch) => {
  dispatch({ type: GET_ALL_REVIEWS_REQUEST });

  try {
    const { rating, sort, page, limit } = options;
    const queryParams = new URLSearchParams();
    
    if (rating) queryParams.append('rating', rating);
    if (sort) queryParams.append('sort', sort);
    if (page) queryParams.append('page', page);
    if (limit) queryParams.append('limit', limit);

    const { data } = await api.get(`/reviews/product/${productId}?${queryParams.toString()}`);

    dispatch({
      type: GET_ALL_REVIEWS_SUCCESS,
      payload: data
    });

    return { success: true, data };
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
    dispatch({
      type: GET_ALL_REVIEWS_FAILURE,
      payload: errorMsg
    });
    return { success: false, error: errorMsg };
  }
};

// Alias for getReviews to match the component usage
export const getReviews = getAllReviews;

export const getReviewSummary = (productId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: GET_REVIEW_SUMMARY_REQUEST });

  try {
    const { data } = await api.get(`/reviews/product/${productId}/summary`);

    dispatch({
      type: GET_REVIEW_SUMMARY_SUCCESS,
      payload: data
    });

    return { success: true, data };
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
    dispatch({
      type: GET_REVIEW_SUMMARY_FAILURE,
      payload: errorMsg
    });
    return { success: false, error: errorMsg };
  }
};

export const getUserReview = (productId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: GET_USER_REVIEW_REQUEST });

  try {
    const { data } = await api.get(`/reviews/product/${productId}/user`);

    dispatch({
      type: GET_USER_REVIEW_SUCCESS,
      payload: data
    });

    return { success: true, data };
  } catch (error: any) {
    // If user doesn't have a review, that's not an error - return null
    if (error.response?.status === 404 || error.response?.status === 400) {
      dispatch({
        type: GET_USER_REVIEW_SUCCESS,
        payload: null
      });
      return { success: true, data: null };
    }
    
    const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
    dispatch({
      type: GET_USER_REVIEW_FAILURE,
      payload: errorMsg
    });
    return { success: false, error: errorMsg };
  }
};

export const markReviewHelpful = (reviewId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: MARK_REVIEW_HELPFUL_REQUEST });

  try {
    const { data } = await api.put(`/reviews/${reviewId}/helpful`);

    dispatch({
      type: MARK_REVIEW_HELPFUL_SUCCESS,
      payload: data
    });

    return { success: true, data };
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
    dispatch({
      type: MARK_REVIEW_HELPFUL_FAILURE,
      payload: errorMsg
    });
    return { success: false, error: errorMsg };
  }
};

export const updateReview = (reviewId: string, reviewData: any) => async (dispatch: Dispatch) => {
  dispatch({ type: UPDATE_REVIEW_REQUEST });

  try {
    const formData = new FormData();
    formData.append('review', reviewData.review);
    formData.append('rating', reviewData.rating.toString());

    // Handle new images
    if (reviewData.images && reviewData.images.length > 0) {
      reviewData.images.forEach((image: File) => {
        formData.append('images', image);
      });
    }

    // Handle existing images that should be kept
    if (reviewData.existingImages && reviewData.existingImages.length > 0) {
      formData.append('existingImages', JSON.stringify(reviewData.existingImages));
    }

    const { data } = await api.put(`/reviews/${reviewId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    dispatch({
      type: UPDATE_REVIEW_SUCCESS,
      payload: data
    });

    return { success: true, data };
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
    dispatch({
      type: UPDATE_REVIEW_FAILURE,
      payload: errorMsg
    });
    return { success: false, error: errorMsg };
  }
};

// 🔴 NAYA FUNCTION: Delete Review Pipeline
export const deleteReview = (reviewId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_REVIEW_REQUEST });

  try {
    const { data } = await api.delete(`/reviews/${reviewId}`);

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: reviewId
    });

    return { success: true, data };
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
    dispatch({
      type: DELETE_REVIEW_FAILURE,
      payload: errorMsg
    });
    return { success: false, error: errorMsg };
  }
};