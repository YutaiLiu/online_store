import { Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type FormButtonGroupProps = {
    title: string;
    items: string[];
    checked: string[];
    onChange: (items: string[]) => void;
};

export default function CheckboxButtonGroup(prop: FormButtonGroupProps) {
    const [checkedItems, setCheckedItems] = useState<string[]>(prop.checked || []);

    useEffect(() => {
        setCheckedItems(prop.checked);
    }, [prop.checked]);

    const handleChange = (value: string) => {
        const updatedCheckedItems = checkedItems.includes(value)
            ? checkedItems.filter(item => item !== value)
            : [...checkedItems, value];

        setCheckedItems(updatedCheckedItems);
        prop.onChange(updatedCheckedItems);
    };

    return (
        <FormGroup>
            <Typography variant="subtitle1">Filter by {prop.title}</Typography>
            {prop.items.map(item => (
                <FormControlLabel
                    key={item}
                    control={<Checkbox
                        checked={checkedItems.includes(item)}
                        onClick={() => handleChange(item)}
                        sx={{ py: 0.7, fontSize: 40 }}
                    />}
                    label={item}
                />
            ))}
        </FormGroup>
    );
}