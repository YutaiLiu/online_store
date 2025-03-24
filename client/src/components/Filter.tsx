import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Paper, Radio, TextField, Typography } from "@mui/material";
import { useFetchFilterQuery } from "../api/catalogApi";
import { SortOptions } from "../models/Filter";

export default function Filter() {
    const { data } = useFetchFilterQuery();

    if (!data) return <Box><Paper sx={{ p: 3 }}>Loading...</Paper></Box>;

    return (
        <Box display={'flex'} flexDirection={'column'} gap={3}>
            <Paper>
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                />
            </Paper>
            <Paper sx={{ p: 3 }}>
                <FormControl>
                    <Typography variant="subtitle1">Sort by</Typography>
                    {SortOptions.map(({ value, label }) => (
                        <FormControlLabel
                            key={value}
                            control={<Radio />}
                            label={label}
                            value={value}
                        />
                    ))}
                </FormControl>
            </Paper>
            <Paper sx={{ p: 3 }}>
                <FormGroup>
                    <Typography variant="subtitle1">Filter by brands</Typography>
                    {data.brands.map(item => (
                        <FormControlLabel
                            key={item}
                            control={<Checkbox sx={{ py: 0.7, fontSize: 40}}/>}
                            label={item}
                        />
                    ))}
                </FormGroup>
            </Paper>
            <Paper sx={{ p: 3 }}>
                <FormGroup>
                    <Typography variant="subtitle1">Filter by types</Typography>
                    {data.types.map(item => (
                        <FormControlLabel
                            key={item}
                            control={<Checkbox sx={{ py: 0.7, fontSize: 40}}/>}
                            label={item}
                        />
                    ))}
                </FormGroup>
            </Paper>
        </Box>
    );
}