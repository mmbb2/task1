import React from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'


export default function ProtectedRoute({component}) {

    // function isAuth(){
    //     return !!localStorage.getItem('token')
    // }

    const token = useSelector((state) => state.user.token)

    function isAuth(){
      console.log(token)
      return !!token
    }

  return (
    !!token ? component : <Navigate to="/login" replace />
  )
}