import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setToken } from '../features/squares/userSlice';

export default function GetTokenTestButton() {

    let navigate = useNavigate();
    const token = useSelector((state) => state.user.token)
    const dispatch = useDispatch()
    function getButton(){
      axios.get('http://localhost:3001/users', { withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      .catch((err)=>{
        if(err.toJSON().status === 401){
          axios.post('http://localhost:3001/users/refresh', { withCredentials: true})
          .then(res=>{
            dispatch(setToken(res.headers.authorization))
            axios.get('http://localhost:3001/users', { withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
          })
          .catch((err)=>{
            if(err.toJSON().status === 403){
              dispatch(setToken(''))
              axios.post('http://localhost:3001/users/logout', { withCredentials: true})
              navigate('/login', { replace: true });
            }
          })
        }
      })
    }

  return (
    <Button variant="contained" onClick={getButton}>test</Button>
  )
}
