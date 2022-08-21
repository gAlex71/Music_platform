import axios from "axios"
import { Dispatch } from "react"
import { TrackAction, TrackActionTypes } from "../../types/tracks"

//Получение треков
export const fetchTracks = () => {
    //Возвращаем функцию, которая параметром принимает диспатч
    return async (dispatch: Dispatch<TrackAction>) => {
        try{
            //Создаем запрос
            const response = await axios.get('http://localhost:5000/tracks')
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        }catch(e){
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка при загрузке треков!'
            })
        }
    }
}

// Поиск треков
export const searchTracks = (query: string) => {
    //Возвращаем функцию, которая параметром принимает диспатч
    return async (dispatch: Dispatch<TrackAction>) => {
        try{
            //Создаем запрос
            const response = await axios.get('http://localhost:5000/tracks/search?query=' + query)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        }catch(e){
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка при загрузке треков!'
            })
        }
    }
}