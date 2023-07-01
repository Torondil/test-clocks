import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reduser } from "./reducer";

export const store = createStore(reduser, composeWithDevTools(applyMiddleware()));
