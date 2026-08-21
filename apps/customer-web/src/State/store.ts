import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { customerProductReducer } from './Product/Reducer';
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import reviewReducer from "./Review/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  product: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
  review: reviewReducer,
});

export const store = legacy_createStore(
  rootReducer as any, 
  applyMiddleware(thunk)
);

export type RootState = ReturnType<typeof rootReducer>;