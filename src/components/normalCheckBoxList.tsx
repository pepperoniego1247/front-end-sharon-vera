import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
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

export const NormalCheckBoxList: React.FC<AutoCompleteCheckBoxes> = ({ sx, size, tag, data, setData, dataRow }: AutoCompleteCheckBoxes) => {
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
      <FormControl required size={size} sx={ sx }>
        <InputLabel id="demo-multiple-checkbox-label">{tag}</InputLabel>
        <Select
          required
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={data}
          onChange={handleChange}
          input={<OutlinedInput label={tag} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {dataRow.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={data.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}