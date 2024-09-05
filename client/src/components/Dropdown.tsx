import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Option } from '../types/bid.type';
// import top100Films from './top100Films';

type Props = {
    options: Option[];
    label: string
}
export default function Dropdown({ options, label }: Props) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}