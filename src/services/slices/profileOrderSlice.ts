import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type ProfileOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
};

const initialState: ProfileOrdersState = {
  orders: [],
  isLoading: false
};

export const fetchUserOrders = createAsyncThunk(
  'profile/fetchUserOrders',
  async (api) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (err) {
      return;
    }
  }
);

const profileOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload as TOrder[];
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default profileOrdersSlice.reducer;
