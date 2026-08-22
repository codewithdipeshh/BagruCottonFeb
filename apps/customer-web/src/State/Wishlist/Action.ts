import { Dispatch } from 'redux';
import { api } from '../../config/apiConfig';

export const GET_WISHLIST_REQUEST = 'GET_WISHLIST_REQUEST';
export const GET_WISHLIST_SUCCESS = 'GET_WISHLIST_SUCCESS';
export const GET_WISHLIST_FAILURE = 'GET_WISHLIST_FAILURE';

export const TOGGLE_WISHLIST_ITEM_REQUEST = 'TOGGLE_WISHLIST_ITEM_REQUEST';
export const TOGGLE_WISHLIST_ITEM_SUCCESS = 'TOGGLE_WISHLIST_ITEM_SUCCESS';
export const TOGGLE_WISHLIST_ITEM_FAILURE = 'TOGGLE_WISHLIST_ITEM_FAILURE';

export const REMOVE_WISHLIST_ITEM_REQUEST = 'REMOVE_WISHLIST_ITEM_REQUEST';
export const REMOVE_WISHLIST_ITEM_SUCCESS = 'REMOVE_WISHLIST_ITEM_SUCCESS';
export const REMOVE_WISHLIST_ITEM_FAILURE = 'REMOVE_WISHLIST_ITEM_FAILURE';

export const getWishlist = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_WISHLIST_REQUEST });
  try {
    const { data } = await api.get('/wishlist');
    dispatch({ type: GET_WISHLIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: GET_WISHLIST_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const toggleWishlistItem = (productId: string | number) => async (dispatch: any) => {
  dispatch({ type: TOGGLE_WISHLIST_ITEM_REQUEST });
  try {
    const { data } = await api.post(`/wishlist/toggle`, { productId });
    dispatch({ type: TOGGLE_WISHLIST_ITEM_SUCCESS, payload: data });
    dispatch(getWishlist());
  } catch (error: any) {
    dispatch({
      type: TOGGLE_WISHLIST_ITEM_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const removeWishlistItem = (productId: string | number) => async (dispatch: any) => {
  dispatch({ type: REMOVE_WISHLIST_ITEM_REQUEST });
  try {
    const { data } = await api.delete(`/wishlist/${productId}`);
    dispatch({ type: REMOVE_WISHLIST_ITEM_SUCCESS, payload: data });
    dispatch(getWishlist());
  } catch (error: any) {
    dispatch({
      type: REMOVE_WISHLIST_ITEM_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};