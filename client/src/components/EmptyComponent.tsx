import { Box } from '@mui/material'
import React, { ReactNode } from 'react'
type Props = {
    children: ReactNode
}
const EmptyComponent = ({ children}: Props) => {
  return (
    <Box sx={{ height: '10rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        { children }
    </Box>
  )
}

export default EmptyComponent