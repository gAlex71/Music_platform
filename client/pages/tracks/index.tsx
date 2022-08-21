import { Button, Card, Grid, Box, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import TrackList from '../../components/TrackList'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import MainLayout from '../../layouts/MainLayout'
import { NextThunkDispatch, wrapper } from '../../store'
import { fetchTracks, searchTracks } from '../../store/actions-creators/track'
import { ITrack } from '../../types/tracks'

const Index = () => {
    const router = useRouter()
    //Создаем массив с типом ITrack
    // const tracks: ITrack[] = [
    //     {_id: '1', name: 'Трек 1', artist: 'Исполнитель 1', text: 'Какой-то текст', listens: 5, picture: '', audio: '', comments: []},
    //     {_id: '2', name: 'Трек 2', artist: 'Исполнитель 2', text: 'Какой-то текст', listens: 7, picture: '', audio: '', comments: []},
    //     {_id: '3', name: 'Трек 3', artist: 'Исполнитель 3', text: 'Какой-то текст', listens: 2, picture: '', audio: '', comments: []},
    //     {_id: '4', name: 'Трек 4', artist: 'Исполнитель 4', text: 'Какой-то текст', listens: 4, picture: '', audio: '', comments: []},
    //     {_id: '5', name: 'Трек 5', artist: 'Исполнитель 5', text: 'Какой-то текст', listens: 8, picture: '', audio: '', comments: []}
    // ]
    //Получаем треки из состояния
    const {tracks, error} = useTypedSelector(state => state.track)
    const [query, setQuery] = useState<string>()
    const dispatch = useDispatch() as NextThunkDispatch
    const [timer, setTimer] = useState(null)

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        //Добавляем таймер, чтобы запрос на сервер не отправлялся при каждом нажатии кнопки в поиске
        if(timer){
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                //В диспатч прокидываем экшен и в нем значение из инпута
                await dispatch(await searchTracks(e.target.value))
            }, 500)
        )
    }

    if(error){
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    return(
        <MainLayout title={"Список треков - музыкальная площадка"}>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Список треков</h1>
                            {/* При клике переходим на другую страницу */}
                            <Button onClick={() => router.push('/tracks/create')}>
                                Загрузить
                            </Button>
                        </Grid>
                    </Box>
                    {/* Поиск трека */}
                    <TextField
                        fullWidth
                        value={query}
                        onChange={search}
                    />
                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayout>
    )
}

export default Index

export const getServerSideProps = wrapper.getServerSideProps(async({store}) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTracks())
})