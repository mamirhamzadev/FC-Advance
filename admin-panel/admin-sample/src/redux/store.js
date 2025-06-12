import { profile } from "./reducers/profile";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({ profile });

export default configureStore({ reducer });
