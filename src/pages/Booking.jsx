import React, {useEffect, useState}  from 'react';
import Square from '../components/square';
import { useSelector, useDispatch } from 'react-redux'
import {changeYellow, reset} from '../features/squares/squaresSlice';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { statusColor } from '../constants';
import NavPanel from '../components/NavPanel';
import { Container } from '@mui/material';

export default function Booking() {
  
    const [isBuyButtonActive, setIsBuyButtonActive] = useState(false)
    const squares = useSelector((state) => state.squares.value)
    const dispatch = useDispatch()
    useEffect(()=>{
    //  dispatch(changeYellow(statusColor.green))
    }, [])
  
    function BuySquaresHandler(){
  
      let promise = new Promise((resolve, reject) => {
  
        setTimeout(() => {
          if(Math.random() > 0.5){
            resolve()
          } else {
            reject('недостаточно денег')
          }
        }, 1000);
      });
  
      promise.then(()=>{
        dispatch(changeYellow(statusColor.red))
      }).catch(error=>{
        alert(error);
        dispatch(changeYellow(statusColor.green))
      })
    }
  
    function resetHandler(){
      dispatch(reset())
    }
  
    return (
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
      <NavPanel/>
        <Box
        sx={{
          width: 438,
          height: 438,
          display: 'flex',
          flexWrap: 'wrap'
        }}
        >
          {squares.map(square=>{
            return <Square key={square.id} id={square.id} status={square.status} setIsBuyButtonActive={setIsBuyButtonActive} timeLeft={square.timeLeft}/>
          })}
        </Box>
        {
         isBuyButtonActive && <Button variant="contained" onClick={BuySquaresHandler}>купить</Button>
      }
  
        <Button variant="contained" onClick={resetHandler}>обновить</Button>
       
      </Container>
    );
}
