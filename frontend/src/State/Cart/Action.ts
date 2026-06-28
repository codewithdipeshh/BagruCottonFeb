import { Dispatch } from 'redux';
import { api } from '../../config/apiConfig';
import {
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE
} from './ActionType';

export const getCart = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const { data } = await api.get('/cart');
    dispatch({
      type: GET_CART_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    dispatch({
      type: GET_CART_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};


export const addItemToCart = (reqData: { productId: string | number; quantity: number }) => async (dispatch: Dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
  try {
    
    const { data } = await api.put('/cart/add', reqData);
    dispatch({
      type: ADD_ITEM_TO_CART_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    dispatch({
      type: ADD_ITEM_TO_CART_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const removeCartItem = (cartItemId: string | number) => async (dispatch: Dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM_REQUEST });
  try {
  
    await api.delete(`/cart_items/${cartItemId}`); 
    dispatch({
      type: REMOVE_CART_ITEM_SUCCESS,
      payload: cartItemId
    });
  } catch (error: any) {
    dispatch({
      type: REMOVE_CART_ITEM_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const updateCartItem = (reqData: { cartItemId: string | number; data: { quantity: number } }) => async (dispatch: Dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  try {
    const { data } = await api.put(`/cart_items/${reqData.cartItemId}`, reqData.data);
    dispatch({
      type: UPDATE_CART_ITEM_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    dispatch({
      type: UPDATE_CART_ITEM_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};