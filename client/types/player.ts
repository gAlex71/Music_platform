import { ITrack } from "./tracks";

//Состояние нашего плеера
export interface PlayerState{
    active: null | ITrack
    volume: number
    duration: number
    currentTime: number
    pause: boolean
}

//Перечисление всех экшенов, которые у нас будут
export enum PlayerActionTypes{
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SET_ACTIVE = "SET_ACTIVE",
    SET_DURATION = "SET_DURATION",
    SET_CURRENT_TIME ="SET_CURRENT_TIME",
    SET_VOLUME = "SET_VOLUME"
}


//Описание каждого конкретного экшена
interface PlayAction{
    type: PlayerActionTypes.PLAY
}

interface PauseAction{
    type: PlayerActionTypes.PAUSE
}

interface SetActiveAction{
    type: PlayerActionTypes.SET_ACTIVE
    payload: ITrack
}

interface SetDurationAction{
    type: PlayerActionTypes.SET_DURATION
    payload: number
}

interface SetVolumeAction{
    type: PlayerActionTypes.SET_VOLUME
    payload: number
}

interface SetCurrentTimeAction{
    type: PlayerActionTypes.SET_CURRENT_TIME
    payload: number
}

//Объединям все типы экшенов в один и экспортируем
export type PlayerAction = 
    PlayAction
    | PauseAction
    | SetActiveAction
    | SetDurationAction
    | SetVolumeAction
    | SetCurrentTimeAction