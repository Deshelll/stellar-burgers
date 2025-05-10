import reducer, { fetchUserOrders, initialState } from './profileOrderSlice';

describe('[profileOrderSlice]', () => {
  it('pending', () => {
    const state = reducer(initialState, fetchUserOrders.pending('', undefined));

    expect(state.isLoading).toBe(true);
  });

  it('fulfilled', () => {
    const order = [
      {
        _id: '1',
        status: 'done',
        name: 'заказ',
        createdAt: '',
        updatedAt: '',
        number: 111,
        ingredients: []
      }
    ];

    const state = reducer(
      initialState,
      fetchUserOrders.fulfilled(order, '', undefined)
    );

    expect(state.orders).toEqual(order);
    expect(state.isLoading).toBe(false);
  });

  it('rejected', () => {
    const state = reducer(
      initialState,
      fetchUserOrders.rejected(new Error('error'), '', undefined)
    );

    expect(state.isLoading).toBe(false);
  });
});
