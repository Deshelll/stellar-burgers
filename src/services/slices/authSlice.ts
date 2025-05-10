import {
  getUserApi,
  loginUserApi,
  refreshToken,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type authState = {
  user: TUser | null;
  isLoading: boolean;
};

export const initialState: authState = {
  user: null,
  isLoading: false
};

export const registrationUser = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);

    return response;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);

    return response;
  }
);

export const updateUser = createAsyncThunk(
  'profile/update',
  async (user: TRegisterData) => {
    const response = await updateUserApi(user);
    return response;
  }
);

export const logoutUser = createAsyncThunk('profile/logout', async (_, api) => {
  await logoutUser();
  deleteCookie('accessToken');

  api.dispatch(logout());
});

export const getUserData = createAsyncThunk(
  'auth/getUserData',
  async (_, { dispatch }) => {
    try {
      const response = await getUserApi();
      dispatch(setUser(response.user));
    } catch (err: any) {
      if (err.message === 'jwt expired') {
        try {
          await refreshToken();
          const response = await getUserApi();
          dispatch(setUser(response.user));
        } catch (err) {
          dispatch(logout());
        }
      }

      return err;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrationUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registrationUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registrationUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
