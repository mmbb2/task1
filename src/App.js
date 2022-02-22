import React, {useEffect, useState}  from 'react';
import Square from './components/square';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import {addSquare, changeYellow} from './features/squares/squaresSlice';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';


function App() {
  const [isBuyButtonActive, setIsBuyButtonActive] = useState(false)
  const squares = useSelector((state) => state.squares.value)
  const dispatch = useDispatch()



  useEffect(()=>{
    // for(let i =0; i < 9; i++){
    //   dispatch(addSquare({
    //     id: i,
    //     status: 'green'
    //   }
    //   )) 
    // }
    dispatch(changeYellow('green'))
  }, [])

  function BuySquaresHandler(){
    dispatch(changeYellow('red'))
  }

  

  return (
    <div className="App">
      <Box
      sx={{
        width: 438,
        height: 438,
        display: 'flex',
        flexWrap: 'wrap'
      }}
      >
        {squares.map(square=>{
          return <Square key={square.id} id={square.id} status={square.status} setIsBuyButtonActive={setIsBuyButtonActive}/>
        })}
      </Box>
      {
       isBuyButtonActive && <Button variant="contained" onClick={BuySquaresHandler}>купить</Button>
    }
    </div>
  );
}

export default App;
