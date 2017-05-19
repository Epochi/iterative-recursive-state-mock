import React from 'react'
import RecursiveCategoryTree from '../components/RecursiveCategoryTree'
import IterativeCategoryTree from '../components/IterativeCategoryTree'
import { connect } from 'react-redux'
import {categoriesFetch} from '../actions'

class Root extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            formType: 'iterative'
        }
    }
    componentDidMount(){
        this.props.dispatch(categoriesFetch())
    }

    handleClick(formType){
        this.setState({formType})
    }

    render(){
        return(
            <div>
                <ToggleButtons handleClick={this.handleClick.bind(this)} active={this.state.formType}/>
                { this.state.formType === 'iterative' ?
                    <IterativeCategoryTree/> 
                    :
                    <RecursiveCategoryTree/> 
                    
                }
                
            </div>
            )
    }
    
}

const ToggleButtons = ({handleClick,active}) => {
    return(
    <div>
        <button style={active === 'iterative' ? { backgroundColor: 'cyan'} : null} onClick={()=>handleClick('iterative')}>Iterative</button>
        <button style={active === 'recursive' ? { backgroundColor: 'cyan'} : null} onClick={()=>handleClick('recursive')}>Recursive</button>
    </div>)
}


export default connect()(Root)

