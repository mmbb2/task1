import React from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios';


export default function ProtectedRoute({component}) {

    // function isAuth(){
    //     return !!localStorage.getItem('token')
    // }

    function isAuth(){
      return !!localStorage.getItem('token')
    }

  return (
    isAuth() === true ? component : <Navigate to="/login" replace />
  )
}