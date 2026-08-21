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
    const { data } = await api.post('/api/orders', reqData.address);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data
    });
    
    // 🌟 MongoDB Production standard check fixed (_id)
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

export const getOrderById = (orderId: string | number) => async (dispatch: Dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/${orderId}`);
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