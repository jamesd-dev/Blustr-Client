import React, {Component} from 'react';
import './CreateInput.css';

export default class CreateInput extends Component {

    state = {
        input: <></>
    }

    componentDidMount() {
        this.loadAddInput();
    }

    render () {
        return (
            <div id='create-input-div'>
                {/* contains either a +, list of buttons or an input, determined by the buttons */}
                {this.state.input}
            </div>
        )
    }

    loadAddInput = () => {
        this.setState({
            input: <div id='icon-div'><i className="fas fa-plus create-icon" onClick={this.handleAdd}/></div>
        })
    }

    loadSelectInput = () => {
        this.setState({
            input: <div id='icon-div'>
            <i className="fas fa-times create-icon" onClick={this.handleCancel}/>
            <i className="fas fa-edit create-icon" onClick={this.handleTextInput}/>
            </div>
        })
    }

    loadTextInput = () => {
        this.setState({
            input: <textarea name='textInput' className='create-textInput'></textarea>
        })
    }

    loadImageInput = () => {
        this.setState({
            input: <input name='imageInput' className='create-imageInput' placeholder='image url'/>
        })
    }

    handleAdd = () => {
        this.loadSelectInput();
    }

    handleCancel = () => {
        this.loadAddInput();
    }

    handleTextInput = () => {
        this.loadTextInput();
    }

}