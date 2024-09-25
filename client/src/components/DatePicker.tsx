import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function DateComponent({ handleDateChange }: any) {
    const [date,setDate] = React.useState()
    const handleChange=(e:any) => {
        setDate(date)
        handleDateChange(e['$d'])        
    }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DatePicker name='date' value={date} minDate={dayjs(new Date())} onChange={handleChange} />
    </LocalizationProvider>
  );
}