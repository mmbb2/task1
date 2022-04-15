import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography} from '@mui/material'

export default function UserInfo() {

    const user = useSelector((state) => state.user.user)

  return (
        <div>
            <Typography>id: {user._id} </Typography>
            <Typography>username: {user.username} </Typography>
            <Typography>email: {user.email} </Typography>
            <Typography>role: {user.role} </Typography>
        </div>
  )
}