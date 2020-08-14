import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_LOADING_AUTH,
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    setLoading();
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
    dispatch({
      type: AUTH_ERROR,
      payload: error.message,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(`/register`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const token = res.headers.get('Authorization');
    dispatch({
      type: REGISTER_SUCCESS,
      payload: token,
    });
    await loadUser()(dispatch);
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.message,
    });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  try {
    setLoading();
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

//Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING_AUTH,
  };
};
