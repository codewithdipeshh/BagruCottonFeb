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
  UPDATE_REVIEW_FAILURE
} from './ActionType';

const initialState = {
  reviews: [],
  reviewSummary: {
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    }
  },
  userReview: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  totalPages: 0
};

const reviewReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: [action.payload, ...state.reviews],
        userReview: action.payload
      };

    case CREATE_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case GET_ALL_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_ALL_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload.reviews || [],
        total: action.payload.total || 0,
        page: action.payload.page || 1,
        totalPages: action.payload.totalPages || 0
      };

    case GET_ALL_REVIEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        reviews: []
      };

    case GET_REVIEW_SUMMARY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_REVIEW_SUMMARY_SUCCESS:
      return {
        ...state,
        loading: false,
        reviewSummary: action.payload
      };

    case GET_REVIEW_SUMMARY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case GET_USER_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_USER_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        userReview: action.payload
      };

    case GET_USER_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userReview: null
      };

    case MARK_REVIEW_HELPFUL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case MARK_REVIEW_HELPFUL_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: state.reviews.map((review: any) =>
          review._id === action.payload._id ? action.payload : review
        )
      };

    case MARK_REVIEW_HELPFUL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case UPDATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: state.reviews.map((review: any) =>
          review._id === action.payload._id ? action.payload : review
        ),
        userReview: action.payload
      };

    case UPDATE_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default reviewReducer;