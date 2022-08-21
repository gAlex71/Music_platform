import { Card, Icon, IconButton, Grid } from '@mui/material'
import React from 'react'
import { ITrack } from '../types/tracks'
import styles from '../styles/TrackItem.module.scss'
import { Delete, Pause, PlayArrow } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useActions } from '../hooks/useActions'

interface TrackItemProps{
    track: ITrack
    active?: boolean
}

//В качестве второго параметра прокидываем пропс active(запущен трек или нет)
const TrackItem: React.FC<TrackItemProps> = ({track, active=false}) => {
    const router = useRouter()
    const {playTrack, pauseTrack, setActiveTrack} = useActions()

    //При первом запуске приложения создается объект аудио, а при клике на какой-либо трек, он становится у нас активным
    const play = (e) => {
        e.stopPropagation()
        setActiveTrack(track)
        playTrack()
    }

    return(
        //При клике на карточку, будем перемещаться на страницу трека
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            {/* Отменяем прокидывание события на компонент */}
            <IconButton onClick={play}>
                {active
                    ?<Pause/>
                    :<PlayArrow/>
                }
            </IconButton>
            <img width={70} height={70} src={'http://localhost:5000/' + track.picture}/>
            <Grid container direction='column' style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            {active && <div>02:45 / 3.50</div>}
            <IconButton onClick={e => e.stopPropagation()} style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>
        </Card>
    )
}

export default TrackItem