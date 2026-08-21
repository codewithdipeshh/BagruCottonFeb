import { Dispatch } from 'redux';
import { api } from '../../config/apiConfig';
import {
  CREATE_ORDER_REQUEST, 
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE
} from './ActionType';

export const createOrder = (reqData: { address: any; navigate: (path: string) => void }) => async (dispatch: Dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const { data } = await api.post('/orders', reqData.address);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data
    });
    
    if (data._id) {
      reqData.navigate(`/checkout?step=3&order_id=${data._id}`);
    }
  } catch (error: any) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

// 🔴 Direct Buy Pipeline Ke Liye
export const createDirectBuyOrder = (reqData: { address: any; productId: string; quantity: number; navigate: (path: string) => void }) => async (dispatch: Dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const payload = {
      address: reqData.address,
      productId: reqData.productId,
      quantity: reqData.quantity
    };
    
    const { data } = await api.post('/orders/direct-buy', payload);
    
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data
    });
    
    if (data._id) {
      reqData.navigate(`/checkout?step=3&order_id=${data._id}`);
    }
  } catch (error: any) {
    console.error("Direct Buy Order Error:", error);
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const getOrderById = (orderId: string | number) => async (dispatch: Dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/orders/${orderId}`);
    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};


export const getOrderHistory = () => async (dispatch: Dispatch) => {
  dispatch({ type: "GET_ORDERS_HISTORY_REQUEST" });
  try {
    const { data } = await api.get('/orders/user');
    dispatch({
      type: "GET_ORDERS_HISTORY_SUCCESS",
      payload: data
    });
    return data;
  } catch (error: any) {
    dispatch({
      type: "GET_ORDERS_HISTORY_FAILURE",
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};