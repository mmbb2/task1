import React from 'react'
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function NavPanel() {

    let navigate = useNavigate();

    function logOutHandler(){
        localStorage.removeItem('token')
        axios.post('http://localhost:3001/users/logout')
        navigate('/login', { replace: true });
    }

  return (
    <ButtonGroup >
        <Link to='/' >
          <Button>home</Button>
        </Link>
        <Link to='/booking'>
          <Button>booking</Button>
        </Link>
        {!!localStorage.getItem('token') && <Button onClick={logOutHandler}>log out</Button>}
        
    </ButtonGroup>
  )
}
