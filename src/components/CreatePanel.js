import React, { Component } from "react";
import "./CreatePanel.css";
import "./CreateInput"
import CreateInput from "./CreateInput";

export default class CreatePanel extends Component {
  render() {
    return (
      <>
        <div id="general-panel">
          <div id="create-panel">
              <form onSubmit={this.props.handleSubmit} id='form'>
                <CreateInput/>
              </form>
          </div>
        </div>
      </>
    );
  }
}
