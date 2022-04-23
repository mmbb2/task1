import React from 'react'
import { Typography, Button, Modal, Box,TextField} from '@mui/material'
import { ModalStyles } from './modalStyles'

export default function SignUpResultModal({credentials, isOpen, handleClose}) {
  return (
    <Modal
        open={isOpen}
        onClose={handleClose}
      >
        <Box sx={ModalStyles}>
          <Typography>Your credentials:</Typography>
          <Typography>username: {credentials.username}</Typography>
          <Typography>email: {credentials.email}</Typography>
          <Typography>password: {credentials.password}</Typography>
        </Box>
      </Modal>
  )
}
