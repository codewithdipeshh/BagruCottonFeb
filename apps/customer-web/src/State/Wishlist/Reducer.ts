import {
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAILURE,
  TOGGLE_WISHLIST_ITEM_REQUEST,
  TOGGLE_WISHLIST_ITEM_SUCCESS,
  TOGGLE_WISHLIST_ITEM_FAILURE,
  REMOVE_WISHLIST_ITEM_REQUEST,
  REMOVE_WISHLIST_ITEM_SUCCESS,
  REMOVE_WISHLIST_ITEM_FAILURE
} from './Action';

interface WishlistState {
  wishlist: any | null;
  wishlistItems: any[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  wishlist: null,
  wishlistItems: [],
  loading: false,
  error: null,
};

export const wishlistReducer = (state = initialState, action: any): WishlistState => {
  switch (action.type) {
    case GET_WISHLIST_REQUEST:
    case TOGGLE_WISHLIST_ITEM_REQUEST:
    case REMOVE_WISHLIST_ITEM_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlist: action.payload,
        wishlistItems: action.payload?.products || action.payload?.items || (Array.isArray(action.payload) ? action.payload : []),
        error: null,
      };

    case TOGGLE_WISHLIST_ITEM_SUCCESS:
    case REMOVE_WISHLIST_ITEM_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        wishlist: action.payload,
        wishlistItems: action.payload?.products || action.payload?.items || (Array.isArray(action.payload) ? action.payload : []),
        error: null 
      };

    case GET_WISHLIST_FAILURE:
    case TOGGLE_WISHLIST_ITEM_FAILURE:
    case REMOVE_WISHLIST_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

    default:
      return state;
  }
};