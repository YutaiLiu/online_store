import { decrement, increment } from "./counterReducer"
import { Button, ButtonGroup, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../store/store";

export default function ContactPage() {
    const data = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch();

    return (
        <div>
            <Typography variant="h2">
                Contact page
            </Typography>
            <Typography variant="body1">
                The data is: {data}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(increment(1))} color='secondary'>Increment</Button>
                <Button onClick={() => dispatch(increment(5))} color='primary'>Increment by 5</Button>
                <Button onClick={() => dispatch(decrement(1))} color='error'>Decrement</Button>
            </ButtonGroup>
        </div>
    )
}

//Legacy implementation
// import { Button, ButtonGroup, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux"
// import { decrement, increment } from "../../actionsLegacy/counterActions";
// import { RootStateLegacy } from "../../reducersLegacy/rootReducer";

// export default function ContactPage() {
//     const data = useSelector((state : RootStateLegacy) => state.counter.value)
//     const dispatch = useDispatch();

//     return (
//         <div>
//             <Typography variant="h2">
//                 Contact page
//             </Typography>
//             <Typography variant="body1">
//                 The data is: {data}
//             </Typography>
//             <ButtonGroup>
//                 <Button onClick={() => dispatch(increment())} color='secondary'>Increment</Button>
//                 <Button onClick={() => dispatch(increment(5))} color='primary'>Increment by 5</Button>
//                 <Button onClick={() => dispatch(decrement())} color='error'>Decrement</Button>
//             </ButtonGroup>
//         </div>
//     )
// }