import React, { Component } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import ViewPage from "./components/pages/ViewPage";
import config from "./config";

class App extends Component {
  componentDidMount() {
    if (!this.state.loggedInUser) {
      this.getUser();
    }
  }

  state = {
    loggedinUser: {}
  };

  render() {
    return (
      <>
        <Switch>
          <Route
            exact
            path="/view"
            render={() => {
              return <ViewPage loggedInUser={this.state.loggedInUser} updateUserData={this.updateUserData}/>;
            }}
          />
          <Route
            path="/"
            render={() => {
              return <ViewPage loggedInUser={this.state.loggedInUser} updateUserData={this.updateUserData}/>;
            }}
          />
        </Switch>
      </>
    );
  }

  getUser = () => {
    axios
      .get(`${config.API_URL}/user`, { withCredentials: true })
      .then((res) => {
        this.setState({
          loggedInUser: res.data,
        });
        console.log("obtained user data");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log("failed to obtain user data");
        }
      });
  };

  updateUserData = (data) => {
    this.setState({
      loggedInUser: data
    })
  }

}

export default App;
