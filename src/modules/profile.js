import { httpGet } from 'utils/network';
import { checkResponse } from '../utils/checkResponse';
import { NOT_FOUND, SERVER_IS_UNAVAILABLE } from 'utils/constants';

const PROFILE_REQUEST = 'PROFILE_REQUEST';
const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
const PROFILE_FAIL = 'PROFILE_FAIL';

const initialState = {
  errorMsg: '',
  isFetching: false,
  data: null,
};

//reducer
export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case 'PROFILE_REQUEST':
      return {
        ...state,
        isFetching: true,
        errorMsg: '',
      };
    case 'PROFILE_SUCCESS':
      return {
        ...state,
        isFetching: false,
        data: action.payload.data,
      };
    case 'PROFILE_FAIL':
      return {
        ...state,
        isFetching: false,
        errorMsg: action.payload.errorMsg,
      };
    default:
      return state;
  }
}

// actions
export function getProfile(id) {
  return dispatch => {
    dispatch({
      type: PROFILE_REQUEST,
    });

    httpGet(`user-info/${id}`)
      .then(response => {
        if (checkResponse(response)) {
          dispatch({
            type: PROFILE_SUCCESS,
            payload: {
              data: response.data,
            },
          });
        } else {
          dispatch({
            type: PROFILE_FAIL,
            payload: {
              errorMsg: `User ${NOT_FOUND}`,
            },
            error: true,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: PROFILE_FAIL,
          payload: {
            errorMsg: SERVER_IS_UNAVAILABLE,
          },
          error: true,
        });
      });
  };
}
