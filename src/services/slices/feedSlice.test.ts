import reducer, { fetchOrders, initialState } from './feedSlice';

describe('[feedSlice]', () => {
  it('pending', () => {
    const state = reducer(initialState, fetchOrders.pending('', undefined));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled', () => {
    const order = {
      orders: [
        {
          _id: '1',
          name: 'Заказ 1',
          status: 'done',
          number: 12345,
          createdAt: '',
          updatedAt: '',
          ingredients: []
        }
      ],
      total: 100,
      totalToday: 25
    };

    const state = reducer(
      initialState,
      fetchOrders.fulfilled(order, '', undefined)
    );

    expect(state.orders).toEqual(order.orders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(25);
    expect(state.isLoading).toBe(false);
  });

  it('rejected', () => {
    const state = reducer(
      initialState,
      fetchOrders.rejected(new Error('error'), '', undefined, 'error')
    );

    expect(state.error).toBe('error');
    expect(state.isLoading).toBe(false);
  });
});
