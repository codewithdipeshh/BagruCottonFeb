import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE
} from './ActionType';

interface OrderState {
  orders: any[];
  order: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

export const orderReducer = (state = initialState, action: any): OrderState => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case GET_ORDER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        orders: [...state.orders, action.payload],
        error: null,
      };

    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: null,
      };

    case CREATE_ORDER_FAILURE:
    case GET_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};