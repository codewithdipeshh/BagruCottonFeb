import {
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE
} from './ActionType';

const initialState = {
  products: [],         // Saari sarees ka array list karne ke liye
  product: null,        // Single product detail page ke liye
  loading: false,       // Loading state skeleton animations ke liye
  error: null           // Error storage
};

export const customerProductReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FIND_PRODUCTS_REQUEST:
    case FIND_PRODUCT_BY_ID_REQUEST:
      return { 
        ...state, 
        loading: true, 
        error: null 
      };

    case FIND_PRODUCTS_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        products: action.payload, // Database data updated globally
        error: null 
      };

    case FIND_PRODUCT_BY_ID_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        product: action.payload, // Single saree item updated
        error: null 
      };

    case FIND_PRODUCTS_FAILURE:
    case FIND_PRODUCT_BY_ID_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    default:
      return state;
  }
};