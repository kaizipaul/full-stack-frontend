import axios from 'axios';

const initialState = {
  name: '',
  email: '',
  loggedIn: 'out',
  userId: '',
  signedUp: false
}

// Constant Variables as Action Creators
const SIGN_UP = 'reserve_a_car/SIGNUP';
const LOGIN = 'reserve_a_car/LOGIN';
const LOGOUT = 'reserve_a_car/LOGOUT';

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

export const getSignUpInfo = (info) => async (dispatch) => {
  const { name, email, password } = info;
  try {
    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_SIGN_UP_ENDPOINT_B}`,
      data: {
        user: {
          email,
          password,
          name,
        },
      },
    });

    dispatch(
      signUp({
        name: '',
        email: '',
        loggedIn: false,
        userId: '',
        signedUp: 'up',
      }),
    );
  } catch (error) {
    dispatch(
      signUp({
        name: '',
        email: '',
        loggedIn: false,
        userId: '',
        signedUp: 'err',
      }),
    );
  }
}

export const getSigninInfo = (info) => async (dispatch) => {
  const { email, password } = info;
  try {
    const signUpResponse = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_LOGIN_ENDPOINT_B}`,
      data: {
        user: {
          email,
          password,
        },
      },
    });

    const { data, headers } = signUpResponse;
    const { user } = data;
    const { authorization } = headers;

    const mainUser = {
      name: user.name,
      email: user.email,
      loggedIn: 'in',
      userId: user.id,
      signedUp: true,
    };

    const loginData = {
      timestamp: new Date().getTime(),
      authorization,
      mainUser,
    };

    localStorage.setItem('userInfo', JSON.stringify(loginData));

    dispatch(signUp(mainUser));
  } catch (error) {
    dispatch(
      signUp({
        name: '',
        email: '',
        loggedIn: 'err',
        userId: '',
        signedUp: false,
      }),
    );
  }
};

export const getLogoutInfo = (info) => async (dispatch) => {
  const { userAuth } = info;
  try {
    await fetch(
      `${process.env.REACT_APP_LOGOUT_ENDPOINT_B}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${userAuth}`,
        },
      },
    );

    dispatch(logout({
      ...initialState,
      loggedIn: 'out',
      signedUp: false,
    }));

    localStorage.removeItem('userInfo');
  } catch (error) {
    dispatch(
      logout({
        name: '',
        email: '',
        loggedIn: 'err',
        userId: '',
        signedUp: false,
      }),
    );
  }
};
