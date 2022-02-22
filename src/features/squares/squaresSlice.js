import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  status: 'idle',
};

export const buySquares = createAsyncThunk(
  'squares/buySquares',
  async (thunkAPI) => {
    const res = await setTimeout(() => {
        return Math.random() < 0.5
    }, 1000);
  return res
})

export const squaresSlice = createSlice({
    name: 'squares',
    initialState,
    reducers: {
      addSquare: (state, action) => {
        state.value.push(action.payload)
      },
      changeStatus: (state, action) => {
        state.value.find(square => square.id == action.payload.id).status = action.payload.status
      },
      changeYellow: (state,action)=>{
        state.value.forEach(square => {
          if(square.status === 'yellow'){
           square.status = action.payload
          }
         })
      }
    },
    extraReducers: {
      [buySquares.fulfilled]: (state)=>{
        state.value.forEach(square => {
          if(square.status === 'yellow'){
           square.status = 'red'
          }
         })
      }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { addSquare, changeStatus,changeYellow} = squaresSlice.actions
  
  export default squaresSlice.reducer