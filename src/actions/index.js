import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_COMMENTS, POST_COMMENT, SHOW_MODAL, HIDE_MODAL } from './types';

const ROOT_URL = 'http://localhost:3000';

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, {email, password})
    .then(response => {
      dispatch({ type: AUTH_USER });
      browserHistory.push('/comments');
      localStorage.setItem('betterco.email', email);
      localStorage.setItem('betterco.token', response.data.token);
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
      localStorage.setItem('betterco.email', email);
      localStorage.setItem('betterco.token', response.data.token);
      browserHistory.push('/comments');
    })
    .catch(() => {
      dispatch(authError('Incorrect login information'));
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
  localStorage.removeItem('betterco.email');
  localStorage.removeItem('betterco.token');
  return {
    type: UNAUTH_USER
  }
}

export function fetchComments() {
  return function(dispatch) { 
    axios.get(`${ROOT_URL}/comments`, 
      { headers: { authorization: localStorage.getItem('betterco.token') }
    })
    .then(response => {
      dispatch({
        type: FETCH_COMMENTS,
        payload: response.data.data
      });
    });
  }
}

export function postComment({ message }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/comment`,{ message, email:localStorage.getItem('betterco.email') }, 
      { headers: { authorization: localStorage.getItem('betterco.token') }
    })
    .then(response => {
      dispatch({
        type: POST_COMMENT,
        payload: response.data
      });
    });
  }
}

export function showModal() {
  return {
    type: SHOW_MODAL
  }
}

export function hideModal() {
  return {
    type: HIDE_MODAL
  }
}