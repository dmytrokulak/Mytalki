import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
  // setAuthToken(localStorage.token);
  try {
    const res = await fetch('/auth');
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
    const res = await fetch(`/users`, {
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

    loadUser();
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
    const res = await fetch(`/auth`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    loadUser();
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.msg,
    });
  }
};

// Logout
const logout = () => (dispatch) => dispatch({ type: LOGOUT });
