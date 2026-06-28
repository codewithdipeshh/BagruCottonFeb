import { Dispatch } from 'redux';
import { api } from '../../config/apiConfig'; 
import {
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE
} from './ActionType';

export const findProducts = (reqData: any) => async (dispatch: Dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });

  const {
    category,
    colors,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize
  } = reqData;

  try {
    const { data } = await api.get(
      `/products?category=${category || ''}&color=${colors || ''}&minPrice=${minPrice || 0}&maxPrice=${maxPrice || 100000}&minDiscount=${minDiscount || 0}&sort=${sort || 'price_low'}&stock=${stock || ''}&pageNumber=${pageNumber || 0}&pageSize=${pageSize || 10}`
    );

    console.log("Products Fetched Successfully:", data);

    dispatch({
      type: FIND_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    console.error(" Error fetching filtered products:", error);
    dispatch({
      type: FIND_PRODUCTS_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};


export const findProductById = (reqData: { productId: string | number }) => async (dispatch: Dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

  try {
    const { data } = await api.get(`/products/id/${reqData.productId}`);

    console.log("🔍 Single Product Detail Fetched:", data);

    dispatch({
      type: FIND_PRODUCT_BY_ID_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    console.error(`Error fetching product with ID ${reqData.productId}:`, error);
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};