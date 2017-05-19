import { combineReducers } from 'redux';

import { CATEGORIES_FETCH, CATEGORIES_FLAT_GET, ADD_CATEGORY} from '../actions'

const initialState = {
    original: [],
    flat: []
}

const categories = (state=initialState, action) => {
    switch (action.type){
        case CATEGORIES_FETCH:
            let flatSorted = flattenAll(action.data).sort((a, b) => {if(a.sortPath < b.sortPath){return -1}if(a.sortPath > b.sortPath){return 1}return 0})
            
            return state = {
                original: [...action.data],
                flat: [...flatSorted]
            }
        case ADD_CATEGORY:
            //mutate state in helper function, because object.assign would overwrite overlapping arrays and deeper arrays data
            addCategoryHelper(state.original, action.data.path, [{"name":action.data.newCategory}])
            flatSorted = flattenAll(state.original).sort((a, b) => {if(a.sortPath < b.sortPath){return -1}if(a.sortPath > b.sortPath){return 1}return 0})
                return Object.assign({}, state,{original: [...state.original]},{flat: [...flatSorted]} )
              
        default:
            return state
    }
}




const rootReducer = combineReducers({
categories
});
export default rootReducer



//value structure [{"name": value}]
const addCategoryHelper = (obj, path, value) =>{
//construct selector
let parent = obj;
//parent nodes call actions with path null
if(path === null){obj = obj.push(value[0]);return}
//point to children key of path objects
path = path.replace(/\./g,".children.").split(".")
    for (var i = 0; i < path.length -1; i += 1) {
        console.dir(parent);
        parent = parent[path[i]];
    }
       //upserts category arrays
       parent[path[path.length-1]]['children'] = parent[path[path.length-1]].hasOwnProperty('children') ? [...parent[path[path.length-1]]['children'] , ...value] : parent[path[path.length-1]]['children'] = [ ...value]

}

//flattens json structure into a flat object array
const flattenAll = (arr) => {
  let flatArray = []
  let inputArray = arr
  while (inputArray.length > 0) {
    inputArray = inputArray.reduce((acc, curr, i, arr) => {      
        //Add sortPath for cheap array sorting
        //and path so it could update the original data
        flatArray.push({
          name: curr.name,
          sortPath: `${curr.sortPath || ''}${curr.name}`,
          path: `${curr.path || i}`
        });
      if (curr.hasOwnProperty('children') && curr.children.length) {     
        curr.children = curr.children.map((child, ic) => Object.assign(child, {
          sortPath: `${curr.sortPath || ''}${curr.name}.`,
          path: `${curr.path || i}.${ic}`
        }))

        return [...acc, ...curr.children]
      } else {
        return acc
      }
    }, [])
  }
  return flatArray;
}