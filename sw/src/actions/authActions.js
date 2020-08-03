import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';

// Load User
export const loadUser = () => async (dispatch) => {
  // setAuthToken(localStorage.token);
  const id = localStorage.getItem('token');
  console.log(id);
  try {
    const res = await fetch('/users/' + id);
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
    const admin = await (await fetch('/account')).json();
    if (admin.email === formData.email) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { isAdmin: true },
      });
    } else {
      const users = await (await fetch('/users?email=' + formData.email)).json();
      if (users && users[0].email === formData.email) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { isAdmin: false, user: users[0] },
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: 'No user with given email found.',
        });
      }
    }

    //ToDo:: with real back end
    // const res = await fetch(`/auth`, {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const data = await res.json();

    // loadUser();
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};

// Logout
export const logout = () => (dispatch) => dispatch({ type: LOGOUT });
