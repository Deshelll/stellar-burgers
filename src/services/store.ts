import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/authSlice';
import IngredientsReducer from './slices/ingredientsSlice';
import ConstructorReducer from './slices/constructorSlice';
import ProfileOrdersReducer from './slices/profileOrderSlice';
import FeedReducer from './slices/feedSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  auth: AuthReducer,
  ingredients: IngredientsReducer,
  constructorIngredients: ConstructorReducer,
  feed: FeedReducer,
  profileOrders: ProfileOrdersReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
