import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function GetTokenTestButton() {

    let navigate = useNavigate();

     function getButton(){
     axios.get('http://localhost:3001/users', { withCredentials: true }).then(res=>{
        console.log(res.data.token)
     })
     .catch(()=>{
        localStorage.removeItem('token')
        navigate('/login', { replace: true })
     })
    }

  return (
    <Button variant="contained" onClick={getButton}>test</Button>
  )
}
