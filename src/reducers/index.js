import { combineReducers } from 'redux';

import { CATEGORIES_GET, ADD_CATEGORY } from '../actions'

const categories = (state=[], action) => {
    switch (action.type){
        case CATEGORIES_GET:
            return [...state, ...action.data]
        default:
            return state
    }
}





const rootReducer = combineReducers({
categories
});
export default rootReducer