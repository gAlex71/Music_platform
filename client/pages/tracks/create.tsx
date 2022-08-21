import { Button, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import FileUpload from '../../components/FileUpload'
import StepWrapper from '../../components/StepWrapper'
import { useInput } from '../../hooks/useInput'
import MainLayout from '../../layouts/MainLayout'

const Create = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    //Инициализируем объекты созданным нами хуком
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()

    const next = () => {
        if(activeStep !== 2){
            //Передаем калбек, который явно опирается на предыдущее состояние
            setActiveStep(prev => prev + 1)
        }else{
            //В случае, когда мы дошли до последнего шага, создаем трек
            //Необходимо отправить запрос на сервер с созданием трека
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('text', text.value)
            formData.append('artist', artist.value)
            formData.append('picture', picture)
            formData.append('audio', audio)
            axios.post('http://localhost:5000/tracks', formData)
                //Если запрос прошел успешно, мы будем переходить на страницу списков треков
                .then(resp => router.push('/tracks'))
                .catch(e => console.log(e)
                )
        }
    }
    const back = () => {
        setActiveStep(prev => prev - 1)
    }

    return(
        <MainLayout>
            {/* В пропс прокидываем наш текущий шаг */}
            <StepWrapper activeStep={activeStep}>
                {/* В зависимости от того, на каком мы шаге, отрисовываем разный контент */}
                {activeStep === 0 &&
                    //Форма
                    <Grid container direction={"column"} style={{padding:20}}>
                        <TextField
                            //Разворачиваем объект, созданный с помощью хука
                            {...name}
                            style={{marginTop: 10}}
                            label={"Название трека"}
                        />
                        <TextField
                            {...artist}
                            style={{marginTop: 10}}
                            label={"Имя исполнителя"}
                        />
                        <TextField
                            {...text}
                            style={{marginTop: 10}}
                            label={"Слова к треку"}
                            multiline
                            rows={3}
                        />
                    </Grid>
                }
                {activeStep === 1 &&
                    <FileUpload setFile={setPicture} accept='image/*'>
                        <Button>Загрузить изображение</Button>
                    </FileUpload>
                }
                {activeStep === 2 &&
                    <FileUpload setFile={setAudio} accept='audio/*'>
                        <Button>Загрузить трек</Button>
                    </FileUpload>
                }
            </StepWrapper>
            <Grid container justifyContent="space-between">
                {/* Если активный шаг равняется 0, то мы отключаем кнопку */}
                <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
                <Button onClick={next}>Далее</Button>
            </Grid>
        </MainLayout>
    )
}

export default Create