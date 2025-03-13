import { useState } from "react";
import { useLazyGet400ErrorQuery, useLazyGet401ErrorQuery, useLazyGet404ErrorQuery, useLazyGet500ErrorQuery } from "./errorApi";
import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";

export default function AboutPage() {
    const [ validationErrorArray, setValidationErrorArray ] = useState<string[]>([]);

    const [get400Error] = useLazyGet400ErrorQuery();
    const [get401Error] = useLazyGet401ErrorQuery();
    const [get404Error] = useLazyGet404ErrorQuery();
    const [get500Error] = useLazyGet500ErrorQuery();

    const getValidationErrors = async () => {
        try 
        {
            await get400Error().unwrap();
        } 
        catch (error) 
        {
            if (error && typeof error === 'object' && 'data' in error
                && error.data && typeof error.data === 'object' && 'errors' in error.data 
                && error.data.errors && typeof error.data.errors === 'object')
            {
                const errorMessages = Object.values(error.data.errors).map((error: string) => error);
                setValidationErrorArray(errorMessages);
            }
        }
    }

    return (
        <Container maxWidth="lg">
            <Typography gutterBottom variant="h3">Error response testing</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={getValidationErrors}>Get validation error</Button>
                <Button variant="contained" onClick={() => get401Error()}>Get 401 error</Button>
                <Button variant="contained" onClick={() => get404Error()}>Get 404 error</Button>
                <Button variant="contained" onClick={() => get500Error()}>Get 500 error</Button>
            </ButtonGroup>
            {validationErrorArray.length > 0 && (
                <Alert severity="error">
                    <AlertTitle>Validation error</AlertTitle>
                    <List>
                        {validationErrorArray.map((error, index) => (
                            <ListItem key={index}>{error}</ListItem>
                        ))}
                    </List>
                </Alert>
            )}
        </Container>
    ) 
}