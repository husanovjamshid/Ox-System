import { REMOVE_TOKEN, SET_TOKEN } from './tokenType';

export const initialState = {
	token: '',
};

export const tokenReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_TOKEN:
			return { ...state, token: action.payload };
		case REMOVE_TOKEN:
			return { ...state, token: action.payload };
		default:
			return state;
	}
};
