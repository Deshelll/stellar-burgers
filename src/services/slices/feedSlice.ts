import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type feedSlice = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
  total: number;
  totalToday: number;
};

const initialState: feedSlice = {
  orders: [],
  isLoading: false,
  error: null,
  total: 0,
  totalToday: 0
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, api) => {
    try {
      const response = await getFeedsApi();
      return {
        orders: response.orders,
        total: response.total,
        totalToday: response.totalToday
      };
    } catch (err) {
      return api.rejectWithValue('Ошибка');
    }
  }
);

const feedSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Ошибка';
      });
  }
});

export default feedSlice.reducer;
