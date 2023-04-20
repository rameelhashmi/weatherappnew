import { combineReducers, createStore } from "redux";
import { cityReducer } from "./cityNameReducer";

const rootReducer = combineReducers({
  city: cityReducer,
});

const store = createStore(rootReducer);

export default store;
