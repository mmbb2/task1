import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { changeStatus, changeTimeLeft } from '../features/squares/squaresSlice';
import { useTimer } from 'use-timer';
import { statusColor } from '../constants';

export default function Square({id, status, setIsBuyButtonActive, timeLeft, handleOpenModal, ownerData}) {

  const dispatch = useDispatch()
  const squares = useSelector((state) => state.squares.value)
  const token = useSelector((state) => state.user.token)

  const { time, start, reset} = useTimer({
    initialTime: timeLeft,
    endTime: 0,
    timerType: 'DECREMENTAL',
    onTimeOver: () => {
      dispatch(changeStatus({id, status: statusColor.green}))
    },
    onTimeUpdate: (time) => {
      dispatch(changeTimeLeft({id, timeLeft: time}));
    },
  });

  

  function startTimerHandler(){
    if(token){
      if(status === statusColor.green){
        dispatch(changeStatus({id, status: statusColor.yellow}))
        setIsBuyButtonActive(true)
      }
    } else{
      handleOpenModal()
    }
    
  }

  useEffect(()=>{
    switch (status) {
      case statusColor.yellow:
        start();
        break;
      case statusColor.green:
      case statusColor.red:
        reset();
        break;
      default:
        break;
    }

    if(!squares.find(square=>square.status === statusColor.yellow)){
      setIsBuyButtonActive(false)
    }
  }, [status])


  return (
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
          backgroundColor: status
        },
      }}
    >
      <Paper variant="outlined"  square onClick={startTimerHandler}>
        {ownerData?.username}
        <Typography>{ status === statusColor.yellow && `${Math.floor(time/60)}:${(time- Math.floor(time/60)*60).toString().padStart(2, '0')}`}</Typography>
      </Paper>
    </Box>
  )
}
