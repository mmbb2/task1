import React, {useEffect, useState}  from 'react';
import Square from '../components/square';
import { useSelector, useDispatch } from 'react-redux'
import {buyYellow, rejectYellow, reset} from '../features/squares/squaresSlice';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { statusColor } from '../constants';
import NavPanel from '../components/NavPanel';
import { Container } from '@mui/material';
import SignUpModal from '../components/Modals/SignUpModal'
import SignUpResultModal from '../components/Modals/SignUpResultModal';
import { getBookedUsers } from '../features/squares/adminSlice';

export default function Booking() {
  
    const [isBuyButtonActive, setIsBuyButtonActive] = useState(false)
    const squares = useSelector((state) => state.squares.value)
    const user = useSelector((state) => state.user.user)
    const users = useSelector((state) => state.admin.users)

    const dispatch = useDispatch()
    
    const [credentials, SetCredentials] = useState({})

    const [isModalOpen, SetIsModalOpen] = useState(false)
    const handleModalOpen = () => SetIsModalOpen(true);
    const handleModalClose = () => SetIsModalOpen(false);

    const [isResultModalOpen, SetIsResultModalOpen] = useState(false)
    const handleResultModalOpen = (credentials) => {
      
      SetCredentials(credentials)
      SetIsResultModalOpen(true)
      SetIsModalOpen(false)
    };
    const handleResultModalClose = () => SetIsResultModalOpen(false);

    useEffect( async()=> {
      if(user?.role === "admin"){
        const ids = []
        squares.forEach((square)=>{
          const ownerId = square?.ownerId
          if(ownerId){
            if(!ids.includes(ownerId)){
              ids.push(ownerId)
            }
          }
        })
        await dispatch(getBookedUsers(ids)).unwrap();
      }
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
        dispatch(buyYellow(user._id))
      }).catch(error=>{
        alert(error);
        dispatch(rejectYellow())
      })
    }
  
    function resetHandler(){
      dispatch(reset())
    }
  
    return (
    <>
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
            return <Square key={square.id} id={square.id} status={square.status} setIsBuyButtonActive={setIsBuyButtonActive} timeLeft={square.timeLeft} handleOpenModal={handleModalOpen} ownerData={user?.role === "admin" ? users[square.ownerId] : null}/>
          })}
        </Box>
        {
         isBuyButtonActive && <Button variant="contained" onClick={BuySquaresHandler}>купить</Button>
      }
  
        <Button variant="contained" onClick={resetHandler}>обновить</Button>
       
      </Container>
      <SignUpModal isOpen={isModalOpen} handleClose={handleModalClose} handleResultModalOpen={handleResultModalOpen}/>
      <SignUpResultModal isOpen={isResultModalOpen} handleClose={handleResultModalClose} credentials={credentials}/>
      </>
    );
}
