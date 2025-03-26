import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setSearchTerm } from "../store/catalogSlice";
import { useState } from "react";

export default function SearchBox() {
    const {searchTerm} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const [ localTerm, setLocalTerm ] = useState(searchTerm);

    // debouncing the search term
    // by memoizing user input with localTerm
    // and update searchTerm state with 1s delay
    // to avoid unnecessary API calls
    // have to memoize with local state
    // otherwise component will re-render on every key press, so does the debounced function
    // the gloable state will never be updated
    const debouncedSearch = debounce(event => {
            dispatch(setSearchTerm(event.target.value));
        }, 1000);
        
    return (
        <TextField
            label="Search products"
            variant="outlined"
            fullWidth
            type="search"
            value={localTerm}
            onChange={e => {
                setLocalTerm(e.target.value);
                debouncedSearch(e);
            }}
        />
    );
}