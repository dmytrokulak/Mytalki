import { GET_TIMEZONES, TIMEZONES_ERROR } from './types';
import { fetchProtected } from './baseActions';

export const getTimezones = () => async (disptach) => {
  try {
    const data = await fetchProtected('/timezones');
    disptach({
      type: GET_TIMEZONES,
      payload: data,
    });
  } catch (error) {
    disptach({
      type: TIMEZONES_ERROR,
      payload: error.message,
    });
  }
};
