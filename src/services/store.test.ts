import store from "./store";
import {initialState as authInitialState} from './slices/authSlice';
import {initialState as ingredientsInitialState} from './slices/ingredientsSlice';
import {initialState as constructorIngredientsInitialState} from './slices/constructorSlice';
import {initialState as feedIngredientsInitialState} from './slices/feedSlice';
import {initialState as profileOrdersInitialState} from './slices/profileOrderSlice';


describe('[rootReducer]', () => {
    it('инициализаци rootReducer', () => {
        const state = store.getState();

        expect(state).toHaveProperty('auth');
        expect(state).toHaveProperty('ingredients');
        expect(state).toHaveProperty('constructorIngredients');
        expect(state).toHaveProperty('feed');
        expect(state).toHaveProperty('profileOrders');

        expect(state.auth).toEqual(
            expect.objectContaining(authInitialState)
        );
        expect(state.ingredients).toEqual(
            expect.objectContaining(ingredientsInitialState)
        );
        expect(state.constructorIngredients).toEqual(
            expect.objectContaining(constructorIngredientsInitialState)
        );
        expect(state.feed).toEqual(
            expect.objectContaining(feedIngredientsInitialState)
        );
        expect(state.profileOrders).toEqual(
            expect.objectContaining(profileOrdersInitialState)
        );
    });
});