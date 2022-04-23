import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../services/UserService';

export const getBookedUsers = createAsyncThunk('user/getBookedUsers',
  async (ids, { rejectWithValue }) => {
    try {
      
      const usersData = await UserService.getBookedUsers(ids)
    
      return usersData
      
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const initialState = {
  users: {}
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
      clearUsersData: (state) => {
        state.users = {}
      }
    },
    extraReducers: {
      [getBookedUsers.fulfilled]: (state, action) => {
        
        state.users = action.payload;
      }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { clearUsersData} = adminSlice.actions
  
  export default adminSlice.reducer