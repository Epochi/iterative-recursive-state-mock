import { combineReducers } from 'redux';

import { CATEGORIES_GET, ADD_CATEGORY } from '../actions'

const categories = (state=[], action) => {
    switch (action.type){
        case CATEGORIES_GET:
            return [...state, ...action.data]
        case ADD_CATEGORY:
            addCategoryHelper(state, action.data.path, [{"name":action.data.newCategory}])
                return [...state]
        default:
            return state
    }
}




const rootReducer = combineReducers({
categories
});
export default rootReducer



//value structure [{"name": value}]
function addCategoryHelper(obj, path, value){
//point to children key of path objects
path = path.replace(/\./g,".children.").split(".")
//construct selector
let parent = obj;
    for (var i = 0; i < path.length -1; i += 1) {
        console.dir(parent);
        parent = parent[path[i]];
    }
       //upserts category arrays
       parent[path[path.length-1]]['children'] = parent[path[path.length-1]].hasOwnProperty('children') ? [...parent[path[path.length-1]]['children'] , ...value] : parent[path[path.length-1]]['children'] = [ ...value]

}
