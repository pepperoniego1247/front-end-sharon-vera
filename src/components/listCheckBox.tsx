import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { TextField, Divider, Typography, Box, Stack } from '@mui/material';
import { CheckBoxListProps } from '../helpers/types';
import InputAdornment from '@mui/material/InputAdornment';

export const CheckboxList: React.FC<CheckBoxListProps> = ({ sx }: CheckBoxListProps) => {
  const [checked, setChecked] = React.useState<number[]>([]);
  const [ value, setValue ] = React.useState<string>("");

  const handleToggle = (valueD: number) => () => {
    const currentIndex = checked.indexOf(valueD);
    const newChecked = [...checked];

    (currentIndex === -1) ? newChecked.push(valueD) : newChecked.splice(currentIndex, 1);

    setChecked(newChecked);
  };

  return (
    <Stack sx={sx}>
      <Stack width="44vh" sx={{ alignItems: "center" }}>
        <TextField sx={{ marginTop: "15px", width: "35vh" }} size='small' value={ value } onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value) } variant="outlined" name="value" label="Servicios" type="text" autoComplete="off" InputProps={{ 
          startAdornment: (
            <InputAdornment position="start">
              
            </InputAdornment>
        )}}></TextField>
      </Stack>

      <Divider sx={{ marginTop: "10px" }}/>

      <List sx={{ overflowY: "auto", maxHeight: 195.2 }}>      
        { (value === "") ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
          const labelId = `checkbox-list-label-${value}`;
          return (
            <ListItem
            key={value}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon/>
                </IconButton>
              }
              disablePadding
              >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        }) :  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((numberD: number) => numberD >= Number(value)).map((value) => {
          const labelId = `checkbox-list-label-${value}`;
          return (
            <ListItem
            key={value}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon/>
                </IconButton>
              }
              disablePadding
              >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}
