import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  initialState
} from './constructorSlice';

describe('[constructorSlice]', () => {
  it('Добавление булки и начинки', () => {
    const bun = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      price: 1255,
      image: ''
    };
    const ingredients = {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      price: 424,
      image: ''
    };

    let state = reducer(initialState, addIngredient(bun));
    expect(state.constructorItems.bun).toEqual(expect.objectContaining(bun));

    state = reducer(state, addIngredient(ingredients));
    expect(state.constructorItems.ingredients.length).toBe(1);
    expect(state.constructorItems.ingredients[0]).toEqual(
      expect.objectContaining(ingredients)
    );
  });

  it('Удаление по uuid', () => {
    const ingredients = {
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
    };
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [ingredients]
      }
    };

    const state = reducer(stateWithIngredients, removeIngredient('uuid-test'));
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  it('Перемещение ингредиента', () => {
    const ingredientsOne = {
      _id: '1',
      id: '1',
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
      uuid: 'uuid-test-1'
    };
    const ingredientsTwo = {
      _id: '2',
      id: '2',
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
      uuid: 'uuid-test-2'
    };
    const ingredientsThree = {
      _id: '3',
      id: '3',
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
      uuid: 'uuid-test-3'
    };

    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [ingredientsOne, ingredientsTwo, ingredientsThree]
      }
    };
    const state = reducer(
      stateWithIngredients,
      moveIngredient({ start: 0, end: 2 })
    );
    const uuid = state.constructorItems.ingredients.map(
      (ingredient) => ingredient.uuid
    );

    expect(uuid).toEqual(['uuid-test-2', 'uuid-test-3', 'uuid-test-1']);
  });
});
