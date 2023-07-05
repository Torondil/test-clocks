import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "@/store/types";

export const store = createStore(reducer, composeWithDevTools(applyMiddleware()));

export const appSelector: TypedUseSelectorHook<AppStateType> = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
