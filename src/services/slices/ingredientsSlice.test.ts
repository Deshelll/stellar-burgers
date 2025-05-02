import reducer, { fetchIngredients, initialState } from './ingredientsSlice';

describe('[ingredientsSlice]', () => {
  it('pending', () => {
    const state = reducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled', () => {
    const ingredients = [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        price: 424,
        image: '',
        image_mobile: '',
        image_large: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        uuid: 'uuid-test'
      }
    ];

    const state = reducer(
      initialState,
      fetchIngredients.fulfilled(ingredients, '', undefined)
    );

    expect(state.items).toEqual(ingredients);
    expect(state.isLoading).toBe(false);
  });

  it('rejected', () => {
    const err = 'error';

    const state = reducer(
      initialState,
      fetchIngredients.rejected(new Error('err'), '', undefined, err)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error');
  });
});
