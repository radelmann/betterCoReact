import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import CommentReducer from './comment_reducer'
import ModalReducer from './modal_reducer'

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  comments: CommentReducer,
  modal: ModalReducer
});

export default rootReducer;
