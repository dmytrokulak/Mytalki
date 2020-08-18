import { SET_ACCOUNT_NAME, SET_ACCOUNT_EMAIL, SET_ACCOUNT_PASSWORD, ACCOUNT_ERROR } from './types';
import { fetchProtected } from './baseActions';
import { login } from './authActions';

export const changeUserName = (firstName, lastName) => async (dispatch) => {
  try {
    await fetchProtected('/account/name', 'PATCH', {
      firstName,
      lastName,
    });
    dispatch({
      type: SET_ACCOUNT_NAME,
      payload: { firstName, lastName },
    });
  } catch (error) {
    dispatch({
      type: ACCOUNT_ERROR,
      payload: error.message,
    });
  }
};

export const changeEmail = (email) => async (dispatch) => {
  try {
    await fetchProtected('/account/email', 'PATCH', { email });
    dispatch({
      type: SET_ACCOUNT_EMAIL,
      payload: email,
    });
  } catch (error) {
    dispatch({
      type: ACCOUNT_ERROR,
      payload: error.message,
    });
  }
};

export const changePassword = (email, passwordOld, passwordNew) => async (dispatch) => {
  try {
    await fetchProtected('/account/password', 'PATCH', { passwordOld, passwordNew });
    dispatch({
      type: SET_ACCOUNT_PASSWORD,
      payload: passwordNew,
    });
    login({
      email: email,
      password: passwordNew,
    })(dispatch);
  } catch (error) {
    dispatch({
      type: ACCOUNT_ERROR,
      payload: error.message,
    });
  }
};
