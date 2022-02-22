import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { changeStatus } from '../features/squares/squaresSlice';
import { useTimer } from 'use-timer';
import { statusColor } from '../constants';

export default function Square({id, status, setIsBuyButtonActive}) {

  const [timeLeft, setTimeLeft] = useState(0)
  const squares = useSelector((state) => state.squares.value)
  const { time, start, reset} = useTimer({
    initialTime: 120,
    endTime: 0,
    timerType: 'DECREMENTAL',
    onTimeOver: () => {
      dispatch(changeStatus({id, status: statusColor.green}))
    },
  });

  const dispatch = useDispatch()

  function startTimerHandler(){
    if(status === statusColor.green){
      dispatch(changeStatus({id, status: statusColor.yellow}))
      setIsBuyButtonActive(true)
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

  useEffect(()=>{
    timeLeft > 0 && setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
  }, [timeLeft])

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
        <Typography>{ status === statusColor.yellow && `${Math.floor(time/60)}:${(time- Math.floor(time/60)*60).toString().padStart(2, '0')}`}</Typography>
      </Paper>
    </Box>
  )
}
