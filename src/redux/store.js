import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertsSlice } from "./alertsSlice";
import { userSlice } from "./userSlice";
import reviewReducer from "./reviewSlice";
import registeredStoresReducer from "./registeredStoresSlice";
import productReducer from "./productSlice";

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  user: userSlice.reducer,
  review: reviewReducer,
  stores: registeredStoresReducer,
  product: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
