import React, {useState} from 'react'
import { Container, TextField, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import { useNavigate } from 'react-router-dom';
import NavPanel from '../components/NavPanel';
export default function Login() {

    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function loginHandler(){
        localStorage.setItem('key', md5(email))
        navigate('/', { replace: true });
    }

  return (
    <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}> 
    

    <NavPanel/>
    <Box sx={{ maxWidth: 'md' }}> 
        <TextField
            fullWidth
            margin="normal"
            required
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
        />
        <TextField
            fullWidth
            margin="normal"
            required
            label="Password"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
        />
            <Button 
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={loginHandler}
                >
                Sign In
            </Button>
    </Box>
        
    </Container>
  )
}
