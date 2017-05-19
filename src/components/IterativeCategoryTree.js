import React from 'react'
import AddButton from './AddButton'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {addCategory} from '../actions'


class CategoryDisplayIterative extends React.Component {
    constructor(props){
        super(props)
        this.handleAddCategory = this.handleAddCategory.bind(this)
    }
    
    handleAddCategory(path, newCategory){
        this.props.addCategory(path, newCategory)
    }
    
    render(){
        return(
            <div>
                <AddButton path={null} handleAddCategory={this.handleAddCategory}/>
                {this.props.categories.length && 
                     (this.props.categories.map((category,i) => {return (<Category key={i} handleAddCategory={this.handleAddCategory} {...category}/>)}))
                }
            </div>
            )
    }
    
}

function mapStateToProps(state, ownProps){
    return {
        categories: state.categories.flat
    };
}


export default connect(mapStateToProps,{addCategory: addCategory})(CategoryDisplayIterative)



const Category = (props) => {
    return(<div>
        <div style={{marginLeft: (props.path.match(/\./g) || []).length * 30 +'px' }}>
            <span>{props.name}</span>
             <AddButton path={props.path} handleAddCategory={props.handleAddCategory}/>
        </div>
       
    </div>)
}

