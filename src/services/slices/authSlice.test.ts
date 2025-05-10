import reducer, { loginUser, initialState } from './authSlice';

describe('[authSlice]', () => {
  it('pending', () => {
    const state = reducer(
      initialState,
      loginUser.pending('', {
        email: 'andrey@andrey.ru',
        password: '12345'
      })
    );

    expect(state.isLoading).toBe(true);
  });

  it('fulfilled', () => {
    const dataPayload = {
      success: true,
      user: {
        email: 'andrey@andrey.ru',
        name: 'andrey'
      },
      accessToken: 'mockToken',
      refreshToken: 'mockRefresh'
    };

    const state = reducer(
      initialState,
      loginUser.fulfilled(dataPayload, '', {
        email: '',
        password: ''
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(dataPayload.user);
  });

  it('rejected', () => {
    const state = reducer(
      initialState,
      loginUser.rejected(new Error('error'), '', { email: '', password: '' })
    );

    expect(state.isLoading).toBe(false);
  });
});
