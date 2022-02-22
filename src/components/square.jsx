import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { changeStatus } from '../features/squares/squaresSlice';
import { useTimer } from 'use-timer';

export default function Square({id, status, setIsBuyButtonActive}) {

  const [timeLeft, setTimeLeft] = useState(0)
  const squares = useSelector((state) => state.squares.value)
  const { time, start, reset} = useTimer({
    initialTime: 120,
    endTime: 0,
    timerType: 'DECREMENTAL',
    onTimeOver: () => {
      dispatch(changeStatus({id, status: 'green'}))
    },
  });

  const dispatch = useDispatch()

  function startTimerHandler(){
    if(status === 'green'){
      dispatch(changeStatus({id, status: 'yellow'}))
      setIsBuyButtonActive(true)
    }
    
  }

  useEffect(()=>{
    switch (status) {
      case 'yellow':
        start();
        break;
      case 'green':
      case 'red':
        reset();
        break;
      default:
        break;
    }

    if(!squares.find(square=>square.status === 'yellow')){
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
        <Typography>{ status === 'yellow' && `${Math.floor(time/60)}:${(time- Math.floor(time/60)*60).toString().padStart(2, '0')}`}</Typography>
      </Paper>
    </Box>
  )
}
