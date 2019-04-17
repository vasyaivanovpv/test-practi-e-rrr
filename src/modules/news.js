import { httpGet } from 'utils/network';
import { checkResponse } from 'utils/checkResponse';
import { NOT_FOUND, SERVER_IS_UNAVAILABLE } from 'utils/constants';

const NEWS_REQUEST = 'NEWS_REQUEST';
const NEWS_SUCCESS = 'NEWS_SUCCESS';
const NEWS_FAIL = 'NEWS_FAIL';

const initialState = {
  isFetching: false,
  errorMsg: '',
  data: null,
};

//reducer
export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case 'NEWS_REQUEST':
      return {
        ...state,
        isFetching: true,
        errorMsg: '',
      };
    case 'NEWS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        errorMsg: '',
      };
    case 'NEWS_FAIL':
      return {
        ...state,
        isFetching: false,
        errorMsg: action.payload.errorMsg,
      };
    default:
      return state;
  }
}

//actions
export function getNews(endPoint) {
  return dispatch => {
    dispatch({
      type: NEWS_REQUEST,
    });
    httpGet(endPoint)
      .then(response => {
        if (checkResponse(response)) {
          dispatch({
            type: NEWS_SUCCESS,
            payload: response.data,
          });
        } else {
          dispatch({
            type: NEWS_FAIL,
            payload: {
              errorMsg: `News ${NOT_FOUND}`,
            },
            error: true,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: NEWS_FAIL,
          payload: {
            errorMsg: SERVER_IS_UNAVAILABLE,
          },
          error: true,
        });
      });
  };
}
