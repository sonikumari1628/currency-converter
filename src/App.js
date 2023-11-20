import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import Head from './Components/head/Head';
import Conversion from './Components/main/Conversion';

function App() {
  return (
    <Box className="box1">
      <Head />
      <Conversion/>
    </Box>
  );
}

export default App;
