import { postData } from 'utils/network';
import { checkResponse } from 'utils/checkResponse';
import { API_ROOT, LOGIN_ERROR, SERVER_IS_UNAVAILABLE } from 'utils/constants';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGOUT = 'LOGOUT';
const RESET_WARNING = 'RESET_WARNING';

const initialState = {
  id: null,
  user: null,
  isFetching: false,
  errorMsg: '',
  isAuth: false,
};

//reducer
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isFetching: true,
        errorMsg: '',
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isFetching: false,
        id: action.payload.id,
        user: {
          name: action.payload.email,
        },
        isAuth: true,
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        isFetching: false,
        errorMsg: action.payload.errorMsg,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuth: false,
        errorMsg: '',
      };
    case 'RESET_WARNING':
      return {
        ...state,
        errorMsg: '',
      };
    default:
      return state;
  }
}

//actions
export function logIn(params, cbFail) {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
    });

    postData(`${API_ROOT}/validate`, params)
      .then(response => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        }
        throw new TypeError("Oops, we haven't got JSON");
      })
      .then(response => {
        if (checkResponse(response)) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              email: params.email,
              id: response.data.id,
            },
          });
        } else {
          dispatch({
            type: LOGIN_FAIL,
            payload: {
              errorMsg: LOGIN_ERROR,
            },
            error: true,
          });
          cbFail();
        }
      })
      .catch(error => {
        dispatch({
          type: LOGIN_FAIL,
          payload: {
            errorMsg: SERVER_IS_UNAVAILABLE,
          },
          error: true,
        });
      });
  };
}

export function logOut() {
  return dispatch => {
    dispatch({
      type: LOGOUT,
    });
  };
}

export function resetWarning() {
  return {
    type: RESET_WARNING,
  };
}
