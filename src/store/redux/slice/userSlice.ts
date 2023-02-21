import type User from '@models/User';
import {createSlice} from '@reduxjs/toolkit';

import {checkSignedUser, initUser, signIn, signOut} from '../thunk/userThunk';

interface UserState {
  user: User | null;
  isLoading: boolean;
  isSignInLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
  isSignInLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: ({addCase}) => {
    addCase(initUser.pending, state => {
      state.isLoading = true;
    });
    addCase(initUser.fulfilled, state => {
      state.isLoading = false;
    });
    addCase(signIn.pending, state => {
      state.isSignInLoading = true;
    });
    addCase(signIn.rejected, state => {
      state.isSignInLoading = false;
      state.error = 'Email ou senha inválidos';
    });
    addCase(signIn.fulfilled, (state, action) => {
      state.error = null;
    });
    addCase(checkSignedUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isSignInLoading = false;
    });
    addCase(signOut.fulfilled, state => {
      state.user = null;
      state.error = null;
    });
  },
});

export default userSlice.reducer;
