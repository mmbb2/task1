import React from 'react'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute({component}) {

    function isAuth(){
        console.log(localStorage.getItem('key'))
        return !!localStorage.getItem('key')
    }

  return (
    isAuth() === true ? component : <Navigate to="/login" replace />
  )
}