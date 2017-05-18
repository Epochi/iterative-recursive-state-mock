import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {categoriesGet, addCategory} from '../actions'

class RecursiveCategoryTree extends React.Component {
    componentDidMount(){
        this.props.dispatch(categoriesGet())
    }
    handleAddCategory(val){
        console.log(val)
    }

    
    render(){
        return(
            <div>
                {this.props.categories.map(category => 
                    <CategoryRecursive key={category.name} handleAddCategory={this.handleAddCategory.bind(this)} categoryData={category}/>
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


export default connect(mapStateToProps)(RecursiveCategoryTree)


const CategoryRecursive = ({categoryData, handleAddCategory}) => {
    {if(categoryData.hasOwnProperty('children') && categoryData.children.length > 0){
        return (
            <ul>
                <li>{categoryData.name}</li>
                {categoryData.children.map(c => 
                    <CategoryRecursive key={c.name} categoryData={c} />
                )}
            </ul>
            )
    }else{ return(
        <ul>
            <li>{categoryData.name}</li>
        </ul>
        )
    }
        
    }
}