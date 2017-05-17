import React from 'react'
import data from '../data.js'

const categoriesArray = data;

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
                    <CategoryDisplayRecursive/> 
                    
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
                {this.state.categories.map(category => {
                    <div></div>
                })}
            </div>
            )
    }
    
}

class CategoryDisplayRecursive extends React.Component {
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
    handleAddCategory(val){
        console.log(val)
    }

    
    render(){
        return(
            <div>
                {this.state.categories.map(category => 
                    <CategoryRecursive handleAddCategory={this.handleAddCategory.bind(this)} categoryData={category}/>
                )}
            </div>
            )
    }
    
}

const CategoryRecursive = ({categoryData, handleAddCategory}) => {
    {if(categoryData.hasOwnProperty('children') && categoryData.children.length > 0){
        return (
            <ul>
                <li>{categoryData.name} <AddCategory handleAddCategory={(categoryData) => {this.props.handleAddCategory(categoryData)}}/> </li>
                {categoryData.children.map(c => 
                    <CategoryRecursive categoryData={c} />
                )}
            </ul>
            )
    }else{ return(
        <ul>
            <li>{categoryData.name} <AddCategory handleAddCategory={(categoryData) => {this.props.handleAddCategory(categoryData)}}/>  </li>
        </ul>
        )
    }
        
    }
}

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

