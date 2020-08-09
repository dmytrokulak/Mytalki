import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';

export const preLoadUser = async (store) => {
  if (localStorage.getItem('token')) {
    try {
      const res = await fetch('/user', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      store.dispatch({
        type: USER_LOADED,
        payload: data,
      });
    } catch (error) {
      store.dispatch({ type: AUTH_ERROR });
    }
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await fetch('/user', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    const data = await res.json();
    dispatch({
      type: USER_LOADED,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await fetch(`/register`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
    await loadUser()(dispatch);
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.msg,
    });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);
    const res = await fetch(`/login`, {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const token = res.headers.get('Authorization');
    dispatch({
      type: LOGIN_SUCCESS,
      payload: token,
    });
    await loadUser()(dispatch);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};

// Logout
export const logout = () => (dispatch) => dispatch({ type: LOGOUT });
