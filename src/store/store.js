import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reduser } from "./reducer";

const store = createStore(reduser, composeWithDevTools(applyMiddleware()));

export default store;
