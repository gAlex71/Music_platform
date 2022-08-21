// Глобальное хранилище

import { MakeStore, Context, createWrapper } from "next-redux-wrapper";
import { AnyAction, applyMiddleware, createStore } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { reducer, RootState } from "./reducers";

//create a makeStore function
const makeStore: MakeStore<RootState>
    = (context: Context) => createStore(reducer, applyMiddleware(thunk))

//export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore, {debug: true})

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>