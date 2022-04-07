import {createSlice } from '@reduxjs/toolkit';
import { statusColor } from '../../constants';
import { v4 as uuid4 } from 'uuid';

const initialState = {
  value: [],
};

export const squaresSlice = createSlice({
    name: 'squares',
    initialState,
    reducers: {
      addSquare: (state, action) => {
        state.value.push(action.payload)
      },
      changeStatus: (state, action) => {
        state.value.find(square => square.id === action.payload.id).status = action.payload.status
      },
      changeTimeLeft: (state, action) => {
        state.value.find(square => square.id === action.payload.id).timeLeft = action.payload.timeLeft
      },
      changeYellow: (state,action)=>{
        state.value.forEach(square => {
          if(square.status === statusColor.yellow){
           square.status = action.payload
          }
         })
      },
      reset: (state)=>{
        state.value = []
        for(let i =0; i < 9; i++){
          state.value.push({
            id: uuid4(),
            status: statusColor.green,
            timeLeft: 120,
          }
          )
        } 
      }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { addSquare, changeStatus,changeYellow, reset, changeTimeLeft} = squaresSlice.actions
  
  export default squaresSlice.reducer