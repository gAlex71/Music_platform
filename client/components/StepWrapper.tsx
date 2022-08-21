import { Card, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

interface StepWrapperProps{
    activeStep: number,
    children: any
}

const steps = ['Информация о треке', 'Загрузите обложку', 'Загрузите сам трек']
const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
    return(
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) =>
                    //Если активный шаг больше нынешнего, то этот этап пройден
                    <Step
                        key={index}
                        completed={activeStep > index}
                    >
                        <StepLabel>{step}</StepLabel>
                    </Step>    
                )}
            </Stepper>
            <Grid container justifyContent="center" style={{margin: '70px 0', height: 270}}>
                    <Card style={{width: 600}}>
                        {children}
                    </Card>
            </Grid>
        </Container>
    )
}

export default StepWrapper