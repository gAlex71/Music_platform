import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import styles from '../styles/Player.module.scss'
import { ITrack } from "../types/tracks";
import TrackProgress from "./TrackProgress";

let audio;

const Player = () => {
    const track: ITrack = {_id: '1', name: 'Трек 1', artist: 'Исполнитель 1', text: 'Какой-то текст', listens: 5, picture: '', audio: '', comments: []}
    //Достаем все поля из состояния, используя кастомный хук
    const {pause, volume, active, duration, currentTime} = useTypedSelector(state => state.player)
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack} = useActions()

    //передаем в зависимость отрисовки трек(при выборе другого трека)
    useEffect(() => {
        //Если аудио еще нету, то инициализируем его
        if(!audio){
            audio = new Audio()
        } else {
            setAudio()
            play()
        }
    }, [active])

    const setAudio = () => {
        //Делаем проверку, существует ли у нас активный трек
        if(active){
            //Получаем трек из store
            audio.src = 'http://localhost:5000/' + active.audio
            //Берем значение из состояния(по умолчанию 50)
            audio.volume = volume / 100
            //Длительность трека
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            //Текущее время
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }

    // Функция воспроизведения
    const play = () => {
        if(pause){
            playTrack()
            audio.play()
        }else{
            pauseTrack()
            audio.pause()
        }
    }

    //Изменение громкости
    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Изменяем громкость проигрывания музыки, значение должно варьироваться от 0до1
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }

    // Перемотка аудиозаписи
    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }

    //В случае если плеер не будет выбран, то его не будет видно
    if(!active){
        return null
    }

    return(
        <div className={styles.player}>
            <IconButton onClick={play}>
                {pause
                    ?<PlayArrow/>
                    :<Pause/>
                }
            </IconButton>
            <Grid container direction='column' style={{width: 200, margin: '0 20px'}}>
                <div>{active?.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
            </Grid>
            {/* Прогресс трека */}
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
            {/* Громкость трека */}
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </div>
    )
}

export default Player