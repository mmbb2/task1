import React from 'react'
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NavPanel() {

    let navigate = useNavigate();

    function logOutHandler(){
        localStorage.removeItem('key')
        navigate('/', { replace: true });
    }

  return (
    <ButtonGroup >
        <Link to='/' >
          <Button>home</Button>
        </Link>
        <Link to='/booking'>
          <Button>booking</Button>
        </Link>
        <Button onClick={logOutHandler}>log out</Button>
    </ButtonGroup>
  )
}