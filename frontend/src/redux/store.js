import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { repAuthrorized } from "./reducers/rep-dashboard";

const rootReducer = combineReducers({ repDashboard: repAuthrorized });

const store = configureStore({ reducer: rootReducer });
export default store;
