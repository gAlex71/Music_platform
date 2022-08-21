import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import { playerReducer } from "./playerReducer";
import { trackReducer } from "./trackReducer";

// Здесь будут храниться все наши редьюсеры
const rootReducer = combineReducers({
    player: playerReducer,
    track: trackReducer
})

export const reducer = (state, action) => {
    if(action.type === HYDRATE){
        const nextState = {
            ...state,
            ...action.payload
        }
        if(state.count)nextState.count = state.count
        return nextState
    }else{
        return rootReducer(state, action)
    }
}

//Получаем тип с корневого редюсора, который поместим в глобальный store
export type RootState = ReturnType<typeof rootReducer>