import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { v4 as uuid4 } from 'uuid';

type ConstructorState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: ConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const sendOrder = createAsyncThunk(
  'constructor/sendOrder',
  async (ingredientsId: string[], api) => {
    try {
      const order = await orderBurgerApi(ingredientsId);
      return order;
    } catch (err) {
      return api.rejectWithValue(err);
    }
  }
);

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.constructorItems.bun = ingredient;
        } else {
          state.constructorItems.ingredients.push({
            ...ingredient
          });
        }
      },
      prepare(ingredient) {
        return { payload: { ...ingredient, uuid: uuid4() } };
      }
    },
    removeIngredient(state, action) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.uuid !== action.payload
        );
    },
    resetConstructor(state) {
      state.constructorItems.ingredients = [];
      state.constructorItems.bun = null;
      state.orderModalData = null;
      state.orderRequest = false;
    },
    setOrderModalData(state, action) {
      state.orderModalData = action.payload;
    },
    moveIngredient(state, action) {
      const { start, end } = action.payload;

      const ingredient = state.constructorItems.ingredients;
      const [moveItem] = ingredient.splice(start, 1);
      ingredient.splice(end, 0, moveItem);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(sendOrder.rejected, (state) => {
        state.orderRequest = false;
        state.orderModalData = null;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  resetConstructor,
  setOrderModalData,
  moveIngredient
} = constructorSlice.actions;
export default constructorSlice.reducer;
