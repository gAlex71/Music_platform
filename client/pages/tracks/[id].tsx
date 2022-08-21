import { Button, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useInput } from '../../hooks/useInput'
import MainLayout from '../../layouts/MainLayout'
import { ITrack } from '../../types/tracks'

const TrackPage = ({serverTrack}) => {
    // const track: ITrack = {_id: '1', name: 'Трек 1', artist: 'Исполнитель 1', text: 'Какой-то текст', listens: 5, picture: '', audio: '', comments: []}
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()
    const username = useInput('')
    const text = useInput('')

    const addComment = async () => {
        try{
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            //Разворачиваем старый трек, и в поле комментариев добавляем новый комментарий
            setTrack({...track, comments: [...track.comments, response.data]})
        }catch(e){
            console.log(e);
            
        }
    }

    return(
        <MainLayout 
            title={"Музыкальная площадка - " + track.name + " - " + track.artist}
            keywords={'Музыкаб артисты, ' + track.name}
        >
            <Button
                variant={"outlined"}
                style={{fontSize: 32}}
                onClick={() => router.push('/tracks')}
            >
                К списку
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={'http://localhost:5000/' + track.picture} width={200} height={200}/>
                <div style={{marginLeft: '20px 0'}}>
                    <h1>Название трека - {track.name}</h1>
                    <h1>Исполнитель - {track.artist}</h1>
                    <h1>Прослушиваний - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Слова в треке</h1>
            <p>{track.text}</p>
            <h1>Комментарии</h1>
            <Grid container>
                <TextField
                    {...username}
                    label="Ваше имя"
                    fullWidth
                />
                <TextField
                    {...text}
                    label="Комментарий"
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button onClick={addComment}>Отправить</Button>
            </Grid>
            <div>
                {track.comments.map(comment => 
                    <div>
                        <div>Автор - {comment.username}</div>
                        <div>Комментарии - {comment.text}</div>
                    </div>    
                )}
            </div>
        </MainLayout>
    )
}

export default TrackPage

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5000/tracks/' + params.id)
    return {
        props:{
            serverTrack: response.data
        }
    }
}