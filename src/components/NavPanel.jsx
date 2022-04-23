import React from 'react'
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setToken, clearUser } from '../features/squares/userSlice';

export default function NavPanel() {

  
    let navigate = useNavigate();
    const dispatch = useDispatch()

    function logOutHandler(){
        dispatch(clearUser())
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
        <Button onClick={logOutHandler}>log out</Button>
        
    </ButtonGroup>
  )
}
