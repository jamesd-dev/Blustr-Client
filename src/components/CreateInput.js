import React, { Component } from "react";
import "./CreateInput.css";

export default class CreateInput extends Component {
  // state = {
  //     inputList: [],
  //     input: <></>
  // }

  // componentDidMount() {
  //     this.loadAddInput();
  // }

  // render () {
  //     return (
  //         <>
  //             {
  //                 this.state.inputList.map((elem, index) => {return <div className='create-input-div' key={index}>
  //                     <textarea onBlur={this.handleFocusOut}>{elem}</textarea>
  //                 </div>})
  //             }
  //             <div className='create-input-div'>
  //                 {/* contains either a +, list of buttons or an input, determined by the buttons */}
  //                 {this.state.input}
  //             </div>
  //         </>
  //     )
  // }

  // loadAddInput = () => {
  //     this.setState({
  //         input: <div id='icon-div'><i className="fas fa-plus create-icon" onClick={this.handleAdd}/></div>
  //     })
  // }

  // loadSelectInput = () => {
  //     this.setState({
  //         input: <div id='icon-div'>
  //         <i className="fas fa-times create-icon" onClick={this.handleCancel}/>
  //         <i className="fas fa-edit create-icon" onClick={this.handleTextInput}/>
  //         </div>
  //     })
  // }

  // loadTextInput = () => {
  //     this.setState({
  //         input: <textarea name='textInput' className='create-textInput' onBlur={this.handleFocusOut} autoFocus></textarea>
  //     })
  // }

  // loadImageInput = () => {
  //     this.setState({
  //         input: <input type='text' name='imageInput' className='create-imageInput' placeholder='image url' autoFocus/>
  //     })
  // }

  // handleAdd = () => {
  //     this.loadSelectInput();
  // }

  // handleCancel = () => {
  //     this.loadAddInput();
  // }

  // handleTextInput = () => {
  //     this.loadTextInput();
  // }

  // handleFocusOut = (e) => {
  //     e.preventDefault();
  //     let value = e.target.value;
  //     if(value == '') {e.target.innerHtml = <div id='icon-div'><i className="fas fa-plus create-icon" onClick={this.handleAdd}/></div>;}
  //     else {
  //         this.setState({
  //             inputList: [...this.state.inputList, e.target.value]
  //         })
  //         console.log(this.state.inputList);
  //         console.log(this.state.inputList.findIndex((elem) => {return elem === value}));
  //         this.loadAddInput();
  //     }
  // }

  componentDidMount() {
    this.setState({
      sections: [{ type: this.state.type.BLANK, index: 0, value: "" }],
    });
  }

  state = {
    sections: [],
    type: {
      // defines type of html element to wrap section in later
      BLANK: 1,
      OPTIONS: 2,
      TEXT: 3,
      IMAGE: 4,
    },
  };

  render() {
    return (
      <>
        {this.state.sections.map((section) => {
          return this.wrapValue(section);
        })}
      </>
    );
  }

  // expects sections to have at least {type, value, index}
  wrapValue = (section) => {
    switch (section.type) {
      case this.state.type.BLANK: {
        return (
          <div className="create-input-div" key={section.index}>
            <div id="icon-div">
              <i className="fas fa-plus create-icon" onClick={this.handleAdd} />
            </div>
          </div>
        );
      }
      case this.state.type.OPTIONS: {
        return (
          <div className="create-input-div" key={section.key}>
            <div id="icon-div">
              <i
                className="fas fa-times create-icon"
                onClick={this.handleCancel}
              />
              <i
                className="fas fa-edit create-icon"
                onClick={this.handleTextInput}
              />
            </div>
          </div>
        );
      }
      case this.state.type.TEXT: {
        return (
          <div className="create-input-div" key={section.index}>
            <textarea
              name="textInput"
              className="create-textInput"
              onBlur={this.handleFocusOut}
              autoFocus
              onChange={this.updateValue}
              value={section.value}
            ></textarea>
          </div>
        );
      }
      case this.state.type.IMAGE: {
        return (
          <div className="create-input-div" key={section.index}>
            <input
              type="text"
              name="imageInput"
              className="create-imageInput"
              placeholder="image url"
              autoFocus
              onChange={this.updateValue}
              value={section.value}
            />
          </div>
        );
      }
      default: {
        console.log("Unknown section type in CreateInput");
        return (
          <div id="icon-div">
            <i className="fas fa-plus create-icon" onClick={this.handleAdd} />
          </div>
        );
      }
    }
  };

  updateValue = () => {};

  handleFocusOut = (e) => {};
}
