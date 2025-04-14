import { Box, Button, Paper } from "@mui/material";
import { useFetchFilterQuery } from "../api/catalogApi";
import SearchBox from "./SearchBox";
import RadioButtonGroup from "./RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../store/store";
import { resetFilters, setBrands, setOrderBy, setTypes } from "../store/catalogSlice";
import CheckboxButtonGroup from "./CheckboxButtonGroup";

export default function Filter() {
    const { data } = useFetchFilterQuery();
    const orderBy = useAppSelector(state => state.catalog.orderBy);
    const brands = useAppSelector(state => state.catalog.brands);
    const types = useAppSelector(state => state.catalog.types);
    const dispatch = useAppDispatch();

    if (!data) return <Box><Paper sx={{ p: 3 }}>Loading...</Paper></Box>;

    return (
        <Box display={'flex'} flexDirection={'column'} gap={3}>
            <Paper>
                <SearchBox />
            </Paper>
            <Paper sx={{ p: 3 }}>
                <RadioButtonGroup selectedValue={orderBy} onChange={e => dispatch(setOrderBy(e.target.value))} />
            </Paper>
            <Paper sx={{ p: 3 }}>
                <CheckboxButtonGroup
                    title='Brands'
                    items={data.brands}
                    checked={brands}
                    onChange={(items: string[]) => dispatch(setBrands(items))} />
            </Paper>
            <Paper sx={{ p: 3 }}>
                <CheckboxButtonGroup
                    title='Types'
                    items={data.types}
                    checked={types}
                    onChange={(items: string[]) => dispatch(setTypes(items))} />
            </Paper>
            <Button onClick={() => dispatch(resetFilters())}>Reset filters</Button>
        </Box>
    );
}