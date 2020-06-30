// libraries
import React, { Component } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
// useful data
import config from "./config";
// styles
import "./App.css";
// components
import ViewStoriesPage from "./components/pages/ViewStoriesPage";

class App extends Component {
  componentDidMount() {
    if (!this.state.loggedInUser) {
      this.getUser();
    }
  }

  state = {
    loggedinUser: {},
  };

  render() {
    return (
      <>
        <Switch>
          <Route
            path="/"
            render={() => {
              return (
                <ViewStoriesPage
                  loggedInUser={this.state.loggedInUser}
                  updateUserData={this.updateUserData}
                />
              );
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
        console.log(this.state.loggedInUser);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log("failed to obtain user data");
        }
      });
  };

  updateUserData = (data) => {
    this.setState({
      loggedInUser: data,
    });
  };
}

export default App;
