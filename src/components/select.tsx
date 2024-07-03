import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { SelectTextFieldProps } from "../helpers/types";

export const SelectTextField: React.FC<SelectTextFieldProps> = ({ setData, data, label, listData, name, required = true }: SelectTextFieldProps) => {
    return (
        <Box sx={{ width: 207 }}>
        <FormControl required={ required } fullWidth>
            <InputLabel size="small" id="demo-simple-select-label">{ label }</InputLabel>
            <Select
                required={ required }
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ data[name] }
                name={name}
                label={ label }
                onChange={(e: SelectChangeEvent) => setData({ ...data, [e.target.name]: e.target.value })}
            >
                {Array.from(listData).map((category: string[]) => (<MenuItem value={category[0]}>{category[1]}</MenuItem>))}
            </Select>
        </FormControl>
    </Box>
    );
}