import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { SortOptions } from "../models/Filter";
import { ChangeEvent } from "react";

type RadioButtonGroupProps = {
    selectedValue: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function RadioButtonGroup(prop: RadioButtonGroupProps) {
    return (
        <RadioGroup
            onChange={prop.onChange}
            value={prop.selectedValue}
        >
            <Typography variant="subtitle1">Sort by</Typography>
            {SortOptions.map(({ value, label }) => (
                <FormControlLabel
                    key={value}
                    control={<Radio />}
                    label={label}
                    value={value}
                />
            ))}
        </RadioGroup>
    );
}