
import {createSlice } from '@reduxjs/toolkit';
import { statusColor } from '../../constants';

const initialState = {
  value: [],
  status: 'idle',
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
            id: i,
            status: statusColor.green
          }
          )
        } 
      }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { addSquare, changeStatus,changeYellow, reset} = squaresSlice.actions
  
  export default squaresSlice.reducer