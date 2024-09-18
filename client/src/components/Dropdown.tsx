import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// import top100Films from './top100Films';

type Props = {
    options: string[];
    label: string;
    handleChange: (e:string | null) => void;
    value: string;
}
export default function Dropdown({ options, label, handleChange, value}: Props) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300 }}
      size='small'
      onChange={(event: any, newValue: string | null) => {
       handleChange(newValue)
      }}
      value={value}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}