import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';

export const login = createAsyncThunk('user/login',
  async ({email, password}, { rejectWithValue }) => {
    try {
      
      const userData = await AuthService.login({email, password})

      return userData
      
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  token: '',
  user: {}
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload
      },
      clearUser: (state) =>{
        state.token = ""
        state.user = {}
      }
    },
    extraReducers: {
      [login.fulfilled]: (state, action) => {
        
        state.user = action.payload.data;
        state.token = action.payload.token;
      }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { setToken, clearUser} = userSlice.actions
  
  export default userSlice.reducer