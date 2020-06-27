import React, { Component } from "react";
import "./AuthPanel.css";

export default class AuthPanel extends Component {
  state = {
    isSignIn: true,
  };

  toggleAuthState = () => {
    this.setState({
      isSignIn: !this.state.isSignIn,
    });
  };

  render() {
    return (
      <div id="general-panel">
        <div id="auth-panel">
          <form onSubmit={this.props.handleSubmit} id="form">
            {(this.state.isSignIn)?<h1>Sign In</h1>:<h1>Sign Up</h1>}
            <div className="auth-input-div">
            <input
              type="text"
              placeholder="username"
              name="username"
              id="username-input"
            />
            </div>
            <div className="auth-input-div">
            <input
              type="password"
              placeholder="password"
              name="password"
              id="password-input"
            />
            </div>
            {this.state.isSignIn ? (
              <p className="auth-link" onClick={this.toggleAuthState}>
                Sign Up?
              </p>
            ) : (
              <>
              <div className="auth-input-div">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  id="email-input"
                />
                  </div>
                <p className="auth-link" onClick={this.toggleAuthState}>
                  Sign In?
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    );
  }
}
