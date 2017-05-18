import React from 'react'
import RecursiveCategoryTree from '../components/RecursiveCategoryTree'


class Root extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            formType: 'recursive'
        }
    }
    handleClick(formType){
        this.setState({formType})
    }

    render(){
        return(
            <div>
                <ToggleButtons handleClick={this.handleClick.bind(this)} active={this.state.formType}/>
                {this.state.formType}
                { this.state.formType === 'iterative' ?
                    <CategoryDisplayIterative/> 
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



class CategoryDisplayIterative extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            categories: []
        }
    }
    componentDidMount(){
        console.log(data);
        this.setState({categories: data})
    }
    
    render(){
        return(
            <div>
                {this.state.categories.map(category => {return (<CategoryIterative {...category}/>)})}
            </div>
            )
    }
    
}
const CategoryIterative = (props) => {
    console.log(props.children)
    
    
    return(<div>
        <div>{props.name}</div>
        <div>{props.children.length > 0 ? props.children : null}</div>
    </div>)
}
/*
 if(curr.hasOwnProperty('children')){
	console.log('hasOwnProperty: ',curr)
	if(curr.children.length > 0){
		console.log('children long')
    }
}
 return( (curr.hasOwnProperty('children') && curr.children.length > 0) ? [...prev, curr, ...curr.children] : [...prev, curr]);
*/


class AddCategory extends React.Component{
    constructor(props){
        super(props)
        this.state ={value: ''}
        this.handleOnChange = this.handleOnChange.bind(this)
    }
    handleAddCategory(e){
        e.preventDefault();
        this.props.handleAddCategory(e.target.value)
        console.log(e.target.value);
    }
    handleOnChange(e){
        this.setState({value: e.target.value});
    }
    render(){
        
        return(
    <form onSubmit={this.handleAddCategory.bind(this)}>
        <input type="text" value={this.state.value} onChange={this.handleOnChange}></input>
        <input type="submit" value="Submit"/>
    </form>
        )
    }
}
export default Root

