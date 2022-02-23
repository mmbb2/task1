import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function GetTokenTestButton() {

    let navigate = useNavigate();

    async function getButton(){
      const res = await axios.get('http://localhost:3001/users', { withCredentials: true })
      console.log(res.data)
      if(!res.data.token){
        localStorage.removeItem('token')
        navigate('/login', { replace: true })
      }
  
    }

  return (
    <Button variant="contained" onClick={getButton}>test</Button>
  )
}
