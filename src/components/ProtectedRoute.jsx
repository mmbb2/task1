import React from 'react'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute({component}) {

    function isAuth(){
        return !!localStorage.getItem('token')
    }

  return (
    isAuth() === true ? component : <Navigate to="/login" replace />
  )
}