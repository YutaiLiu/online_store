import { useDispatch, useSelector } from "react-redux"
import { CounterState } from "./counterReducer"
import { Button, ButtonGroup, Typography } from "@mui/material"

export default function ContactPage() {
    const data = useSelector((state: CounterState) => state.data)
    const dispatch = useDispatch();

    return (
        <div>
            <Typography variant="h2">
                Contact page
            </Typography>
            <Typography variant="body1">
                The data is: {data}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch({type: 'increment'})} color='secondary'>Increment</Button>
                <Button onClick={() => dispatch({type: 'decrement'})} color='error'>Decrement</Button>
            </ButtonGroup>
        </div>
    )
}