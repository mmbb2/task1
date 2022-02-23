import React, {useState} from 'react'
import { Container, TextField, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import { useNavigate } from 'react-router-dom';
import NavPanel from '../components/NavPanel';
import axios from 'axios';

export default function Login() {

    axios.defaults.withCredentials = true;

    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function loginHandler(){
        //localStorage.setItem('token', md5(email))
        //navigate('/', { replace: true });

         axios.post('http://localhost:3001/users/auth', {
            email, password
        })
        .then((res)=>{
            console.log(res.data)
            localStorage.setItem('token', md5(res.data.token))
            navigate('/', { replace: true })

        })
        .catch(err=>{alert(err.response.data.message)})

        

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
