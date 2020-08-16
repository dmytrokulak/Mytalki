import { SET_ACCOUNT_NAME, ACCOUNT_ERROR } from './types';
import { fetchProtected } from './baseActions';

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
