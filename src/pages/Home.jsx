import React from 'react'
import NavPanel from '../components/NavPanel'
import { Typography } from '@mui/material'
import Container from '@mui/material/Container';


export default function Home() {
  return (
      
    <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
         <NavPanel/>
        <div><Typography variant='h1'>Home</Typography></div>
    </Container>
   

  )
}
