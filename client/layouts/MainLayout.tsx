import { Container } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import Navbar from '../components/Navbar'
import Player from '../components/Player'

interface MainLayoutProps{
    children: any
    title?: string
    description?: string
    keywords?: string
}

//Чтобы отображать навбар на всех страницах, используем layout
//Это своего рода обертка над каким-то компонентом
const MainLayout: React.FC<MainLayoutProps> = ({children, title, description, keywords}) => {
    return(
        <>
            {/* Используем для seo оптимизации разные заголовки страницы */}
            {/* А так же метатеги с описанием страницы внутри */}
            <Head>
                <title>{title || 'Музыкальная площадка'}</title>
                <meta name="description" content={`Музыкальная площадка. Здесь каждый может оставить свой трек ` + description}/>
                {/* Обработка страницы роботом */}
                <meta name='robots' content = "index, follow"/>
                {/* Ключевые слова */}
                <meta name='keywords' content={keywords || "Музыка, треки, артисты"}/>
                {/* Адаптация под мобильные приложения */}
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
            </Head>
            <Navbar/>
            <Container style={{margin: '90px 0'}}> 
                {children}
            </Container>
            <Player/>
        </>
    )
}

export default MainLayout