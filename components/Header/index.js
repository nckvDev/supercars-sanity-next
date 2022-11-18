import { AppBar, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const Header = () => {
  return (
    <Box sx={{ borderBottom: 1 }}>
      <AppBar color='transparent' position='sticky' sx={{ borderBottom: 1, borderColor: 'gray' }}>
        <Typography gutterBottom={false} variant='h3' align='center' sx={{ my: 2, fontWeight: 400, letterSpacing: 2 }}>
          Supercars
        </Typography>
      </AppBar>
    </Box>
  )
}
