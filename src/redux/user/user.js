const initialState = {
  name: '',
  email: '',
  loggedIn: 'out',
  userId: '',
  signedUp: false
}

// Constant Variables as Action Creators
const SIGN_UP = '' // api-endpoint-signUp;
const LOGIN = '' // api-endpoint-logIn;
const LOGOUT = '' // api-endpoint-logOut;

// Redux Action Creators
export const signUp = (payload) => ({
  type: SIGN_UP,
  payload,
});

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const logout = (payload) => ({
  type: LOGOUT,
  payload,
});

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_UP:
      return {
        ...payload,
      };
    case LOGIN:
      return payload;
    case LOGOUT:
      return payload;
    default:
      return state;
  }
};
