import { Box, Grid } from '@mui/material'
import React from 'react'
import { ITrack } from '../types/tracks'
import TrackItem from './TrackItem'

//Принимаемые на вход пропсы
interface TrackListProps{
    tracks: ITrack[]
}

//Функциональный компонент
const TrackList: React.FC<TrackListProps> = ({tracks}) => {
    return(
        <Grid container direction="column">
            <Box p={2}>
                {tracks.map(track => 
                    <TrackItem
                        key={track._id}
                        track={track}
                    />   
                )}
            </Box>
        </Grid>
    )
}

export default TrackList