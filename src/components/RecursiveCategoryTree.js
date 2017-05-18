import React from 'react'
import AddButton from './AddButton'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {categoriesGet, addCategory} from '../actions'

class RecursiveCategoryTree extends React.Component {
    constructor(props){
        super(props)
        this.handleAddCategory = this.handleAddCategory.bind(this)
    }
    handleAddCategory(path, newCategory){
        this.props.addCategory(path, newCategory)
        console.log(path, newCategory)
    }

    
    render(){
            
        return(
            <div>
                <AddButton path={null} handleAddCategory={this.handleAddCategory}/>
                {this.props.categories.map((category,i,arr) => 
                    <Category key={i} handleAddCategory={this.handleAddCategory} categoryData={category} path={`${i}`} />
                )}
            </div>
            )
    }
    
}

function mapStateToProps(state, ownProps){
    return {
        categories: state.categories
    };
}


export default connect(mapStateToProps,{addCategory: addCategory, categoriesGet: categoriesGet})(RecursiveCategoryTree)

const Category = ({categoryData, handleAddCategory, path=""}) => {
    {if(categoryData.hasOwnProperty('children') && categoryData.children.length > 0){
        return (
            <ul>
                <li><span>{categoryData.name}</span><AddButton path={path} handleAddCategory={handleAddCategory}/></li>
                {categoryData.children.map((c,i,arr) => 
                    <Category key={i} categoryData={c} handleAddCategory={handleAddCategory}  path={`${path}.${i}`}/>
                )}
            </ul>
            )
    }else{ return(
        <ul>
            <li><span>{categoryData.name}</span><AddButton path={path} handleAddCategory={handleAddCategory}/></li>
        </ul>
        )
    }
        
    }
}