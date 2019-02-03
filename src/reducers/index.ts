import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = (history: History) => combineReducers({
  auth: authReducer,
  form,
  router: connectRouter(history),
});

export interface IState {
  router: RouterState;
  error: string;
  authenticated: boolean;
  message: string;
}

export default rootReducer;
