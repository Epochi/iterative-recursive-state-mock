import { combineReducers } from 'redux';

import { CATEGORIES_FETCH, CATEGORIES_FLAT_GET, ADD_CATEGORY} from '../actions'

//original structure data is received
const categories = (state=[], action) => {
    switch (action.type){
        case CATEGORIES_FETCH:
            return state = [...action.data]
        case ADD_CATEGORY:
            //mutate state in helper function, because object.assign would overwrite overlapping arrays and deeper arrays data
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
const addCategoryHelper = (obj, path, value) =>{
//construct selector
let parent = obj;
//parent nodes call actions with path null
if(path === null){obj = obj.push(value[0]); console.log(obj);return}
//point to children key of path objects
path = path.replace(/\./g,".children.").split(".")
    for (var i = 0; i < path.length -1; i += 1) {
        console.dir(parent);
        parent = parent[path[i]];
    }
       //upserts category arrays
       parent[path[path.length-1]]['children'] = parent[path[path.length-1]].hasOwnProperty('children') ? [...parent[path[path.length-1]]['children'] , ...value] : parent[path[path.length-1]]['children'] = [ ...value]

}

const flattenAll = (arr) => {
  let flatArray = []
  let inputArray = arr

  while (inputArray.length > 0) {
    inputArray = inputArray.reduce((acc, curr, i, arr) => {      
        flatArray.push({
          name: curr.name,
          sortPath: `${curr.sortPath || ''}${curr.name}`,
          path: `${curr.path || ''}${i}`
        });
      if (curr.hasOwnProperty('children') && curr.children.length) {     
        curr.children = curr.children.map((child, i) => Object.assign(child, {
          sortPath: `${curr.sortPath || ''}${curr.name}.`,
          path: `${curr.path || ''}${i}.`
        }))

        return [...acc, ...curr.children]
      } else {
        return acc
      }
    }, [])
  }
  return flatArray;
}