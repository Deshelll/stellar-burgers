import {rootReducer} from './store';
import { initialState as authInitialState } from './slices/authSlice';
import { initialState as ingredientsInitialState } from './slices/ingredientsSlice';
import { initialState as constructorIngredientsInitialState } from './slices/constructorSlice';
import { initialState as feedIngredientsInitialState } from './slices/feedSlice';
import { initialState as profileOrdersInitialState } from './slices/profileOrderSlice';

describe('[rootReducer]', () => {
  it('возвращает начальное состояние хранилища при неизвестном экшене', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toHaveProperty('auth', authInitialState);
    expect(state).toHaveProperty('ingredients', ingredientsInitialState);
    expect(state).toHaveProperty('constructorIngredients', constructorIngredientsInitialState);
    expect(state).toHaveProperty('feed', feedIngredientsInitialState);
    expect(state).toHaveProperty('profileOrders', profileOrdersInitialState);
  });
});
