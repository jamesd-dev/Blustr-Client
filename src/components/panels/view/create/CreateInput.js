import React, { Component } from "react";
import "./styles/CreateInput.css";

export default class CreateInput extends Component {
  
  componentDidMount() {
    this.setState({
      sections: [{ type: this.state.type.BLANK, index: 0, value: "" }],
    });
  }

  state = {
    sections: [],
    type: {
      // defines type of html element to wrap section in later
      BLANK: 'BLANK',
      OPTIONS: 'OPTIONS',
      TEXT: 'TEXT',
      IMAGE: 'IMAGE',
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
              <i className="fas fa-plus create-icon" onClick={this.handleAdd} index={section.index} sectype={section.type}/>
            </div>
          </div>
        );
      }
      case this.state.type.OPTIONS: {
        return (
          <div className="create-input-div" key={section.index}>
            <div id="icon-div">
              <i
                className="fas fa-edit create-icon"
                onClick={this.handleTextInput}
                index={section.index}
                sectype={section.type}
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
              index={section.index}
              sectype={section.type}
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
              index={section.index}
              sectype={section.type}
            />
          </div>
        );
      }
      default: {
        console.log("Unknown section type in CreateInput");
        return (
        <div className="create-input-div" key={section.index}>
          </div>
        );
      }
    }
  };

  updateValue = (e) => {
    let sections = this.state.sections;
    sections[e.target.getAttribute('index')].value = e.target.value;
    this.setState({
        sections: sections
    })
  };

  handleFocusOut = (e) => {
    if(e.target.value === '') {
        this.removeSection(e);
    }

    let type = '';

    if(this.state.sections.length > 0) {
        type = this.state.sections[this.state.sections.length - 1].type;
    }
    if(type !== this.state.type.BLANK && type !== this.state.type.OPTIONS) {
        let sections = this.state.sections;
        sections.push({ type: this.state.type.BLANK, index: 0, value: "" });
        this.setState({
            sections: sections
        });
        this.reindexSections();
    }
  };

  removeSection = (e) => {
    let sections = this.state.sections.splice(e.target.getAttribute('index'), 1);
    this.setState({
        sections: sections
    })
    this.reindexSections();
  }

  reindexSections = () => {
    let sections = this.state.sections;
    sections = sections.map((section, index) => {section.index = index; return section;})
    this.setState({
        sections: sections
    })
  }

  handleAdd = (e) => {
    let sections = this.state.sections;
    sections[e.target.getAttribute('index')].type = this.state.type.OPTIONS;
    this.setState({
        sections: sections
    })
  }

  handleTextInput = (e) => {
    let sections = this.state.sections;
    sections[e.target.getAttribute('index')].type = this.state.type.TEXT;
    this.setState({
        sections: sections
    })
  }
}
