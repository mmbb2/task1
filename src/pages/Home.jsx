import React from 'react'
import NavPanel from '../components/NavPanel'
import { Typography, Button } from '@mui/material'
import Container from '@mui/material/Container';
import GetTokenTestButton from '../components/GetTokenTestButton';
import UserInfo from '../components/UserInfo';


export default function Home() {

  return (
    <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
         <NavPanel/>
        <div><Typography variant='h1'>Home</Typography></div>
        <UserInfo/>
        <GetTokenTestButton/>
    </Container>

  )
}
