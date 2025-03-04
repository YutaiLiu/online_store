import { combineReducers } from 'redux';
import counterReducer from './counterReducer';

export type RootStateLegacy = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
  counter: counterReducer,
});