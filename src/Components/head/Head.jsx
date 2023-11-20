import React from 'react';
import { Box, Typography } from '@mui/material';
import '@fontsource/roboto/500.css';
import './head.css';

const Head = () => {
  return (
    <Box className="boxHead">
        <Typography className='typo1' sx={{fontSize:"1.5em", fontWeight:"600", fontFamily:"roboto"}}>
            Currency Converter
        </Typography>
        <Typography sx={{fontSize:"1em", textAlign:"center", fontFamily:"roboto",  color:"#808080"}}> Check live rates, set rate alerts, receive notification and more.</Typography>
    </Box>
  )
}

export default Head;