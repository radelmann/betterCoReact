import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3000';

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, {email, password})
    .then(response => {
      dispatch({ type: AUTH_USER });
      browserHistory.push('/comments');
      localStorage.setItem('token', response.data.token);
    })
    .catch(response => {
      dispatch(authError(response.data.error));
    });
  }
}

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, {email, password})
    .then(response => {
      dispatch({ type: AUTH_USER });
      browserHistory.push('/comments');
      localStorage.setItem('token', response.data.token);
    })
    .catch(() => {
      dispatch(authError('bad login info'));
    });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type:UNAUTH_USER
  }
}

export function fetchComments() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/comments`, 
      { headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}