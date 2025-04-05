import { Box, Button, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";

const steps = ['Address', 'Payment', 'Review'];

export default function CheckoutStepper() {
    const [activeStep, setActiveStep] = useState(0);
    
    const handleNext = () => {
        setActiveStep(step => step + 1);
    }

    const handleBack = () => {
        setActiveStep(step => step - 1);
    }

    const handleSubmit = () => {
        console.log('Submiting order...')
    }

    return (
        <Paper sx={{p: 3, borderRadius: 3}}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    return (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <Box sx={{mt: 2}}>
                <Box sx={{display: activeStep === 0 ? 'block' : 'none'}}>
                    Address step
                </Box>
                <Box sx={{display: activeStep === 1 ? 'block' : 'none'}}>
                    Payment step
                </Box>
                <Box sx={{display: activeStep === 2 ? 'block' : 'none'}}>
                    Review step
                </Box>
            </Box>
            <Box display='flex' paddingTop={2} justifyContent='space-between'>
                <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                <Button onClick={activeStep === 2 ? handleSubmit : handleNext}>{activeStep === 2 ? 'Submit' : 'Next'}</Button>
            </Box>
        </Paper>
    )
}