import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_LOADING_AUTH,
  SET_ACCOUNT_NAME,
  SET_ACCOUNT_EMAIL,
  SET_ACCOUNT_PASSWORD,
  ACCOUNT_ERROR,
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
    case SET_ACCOUNT_NAME:
      return {
        ...state,
        user: { ...state.user, firstName: action.payload.firstName, lastName: action.payload.lastName },
      };
    case SET_ACCOUNT_EMAIL:
      return {
        ...state,
        user: { ...state.user, email: action.payload },
      };
    case SET_ACCOUNT_PASSWORD:
      return state;
    default:
      return state;
  }
};
