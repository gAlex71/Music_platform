import { PlayerState, PlayerAction, PlayerActionTypes } from "../../types/player";
//Здесь мы будем описывать всю логику по взаимодействию с нашим плеером

//Значения по умолчанию
const initialState: PlayerState = {
    currentTime: 0,
    duration: 0,
    active: null,
    volume: 50,
    pause: true
}

export const playerReducer = (state = initialState, action: PlayerAction): PlayerState => {
    switch(action.type){
        //Описываем кейс для каждого типа, и что он должен возвращать
        case PlayerActionTypes.PLAY:
            return {...state, pause: false}
        case PlayerActionTypes.PAUSE:
            return {...state, pause: true}
        case PlayerActionTypes.SET_ACTIVE:
            return {...state, active: action.payload, duration: 0, currentTime: 0}
        case PlayerActionTypes.SET_DURATION:
            return {...state, duration: action.payload}
        case PlayerActionTypes.SET_VOLUME:
            return {...state, volume: action.payload}
        case PlayerActionTypes.SET_CURRENT_TIME:
            return {...state, currentTime: action.payload}
        //По дефолту возвращаем состояние
        default:
            return state
    }
}