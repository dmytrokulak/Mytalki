import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_LOADING_AUTH,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isAdmin: false,
  loading: true,
  user: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: action.payload.isAdmin,
        loading: false,
        user: action.payload,
        error: null,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isAdmin: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isAdmin: false,
        loading: false,
        user: null,
      };
    case SET_LOADING_AUTH:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
