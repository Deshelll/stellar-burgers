import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type authState = {
  user: TUser | null;
};

const initialState: authState = {
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.user = null;
    }
  }
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
