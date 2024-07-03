import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListSubheader from '@mui/material/ListSubheader';
import { AutoCompleteCheckBoxes } from '../helpers/types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const CheckBoxesAutoComplete: React.FC<AutoCompleteCheckBoxes> = ({ sx, size, tag, data, setData, dataRow }: AutoCompleteCheckBoxes) => {
  const handleChange = (event: SelectChangeEvent<typeof data>) => {
    const {
      target: { value },
    } = event;
    setData(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl required size={size} sx={sx}>
        <InputLabel id="demo-multiple-checkbox-label">{tag}</InputLabel>
        <Select
          required
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={data}
          onChange={handleChange}
          input={<OutlinedInput label={tag} />}
          renderValue={(selected: string[]) => {
            const array: string[] = [];

            selected.forEach((item) => array.push(item.split(".")[1]));
            return array.join(", ");
          }}
          MenuProps={MenuProps}
        >
          {dataRow.map((service) => (
            service.includes(".") ? (
              <MenuItem key={service} value={service}>
                <Checkbox checked={data.indexOf(service) > -1} />
                <ListItemText primary={service.split(".")[1]} />
              </MenuItem>
            ) : (
              <ListSubheader key={service}>{service}</ListSubheader>
            )
          ))}
        </Select>
      </FormControl>
    </div>
  );
}