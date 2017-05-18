import React from 'react'
import AddButton from './AddButton'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {categoriesGet, addCategory} from '../actions'


class CategoryDisplayIterative extends React.Component {
    constructor(props){
        super(props)
    }
    
    
    render(){
        
        return(
            <div>
                {this.props.categories.sort(function (a, b) {
      if(a.sortPath < b.sortPath){return -1}if(a.sortPath > b.sortPath){return 1}return 0
}).map((category,i) => {return (<Category key={i} {...category}/>)})}
            </div>
            )
    }
    
}

function mapStateToProps(state, ownProps){
    return {
        categories: flattenAll(state.categories)
    };
}


export default connect(mapStateToProps,{addCategory: addCategory, categoriesGet: categoriesGet})(CategoryDisplayIterative)



const Category = (props) => {
    return(<div>
        <div style={{marginLeft: (props.path.match(/\./g) || []).length * 15 +'px' }}>{props.name}</div>
    </div>)
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