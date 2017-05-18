import React from 'react'
import { bindActionCreators } from 'redux'

class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: false};

    // This binding is necessary to make `this` work in the callback
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
        {return !this.state.isToggleOn ? 
        <button onClick={this.handleToggle} >&#9547;</button>
        :
         <Form handleToggle={this.handleToggle} path={this.props.path} handleAddCategory={this.props.handleAddCategory}/>
            
        }
    }
}

export default AddButton



class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleAddCategory(this.props.path, this.state.value)
    console.log('handleSubmit ',this.props.path, this.state.value)
    this.props.handleToggle()
     this.setState({value:''});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" placeholder="New Category" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Add" />
      </form>
    );
  }
}
