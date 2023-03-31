import { combineReducers } from 'redux';
import { tokenReducer } from './Token/tokenReducer';

export const rootTokenReducer = combineReducers({
	token: tokenReducer,
});
