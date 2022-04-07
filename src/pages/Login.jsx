import React, {useState} from 'react'
import { Container, TextField, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

import NavPanel from '../components/NavPanel';

export default function Login() {


  return (
    <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}> 
    
    <Box sx={{ maxWidth: 'md' }}> 
        <LoginForm>
            
        </LoginForm>
    </Box>
      
    </Container>
  )
}
