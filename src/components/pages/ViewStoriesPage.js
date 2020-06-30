// libraries
import React, { Component } from "react";
import axios from "axios";
// useful data
import config from "../../config.js";
// styles
import "./styles/ViewStoriesPage.css";
// components
import BrowseStoriesPanel from "../panels/view/BrowseStoriesPanel";
import FocusPanel from "../panels/view/FocusPanel";
import Navbar from "../navbar/Navbar";

export default class ViewStoriesPage extends Component {
  state = {
    stories: [],
    page: 0, // data has to be split into pages for the infinite scroll feature to work
    useFocusPanel: false, // toggles the panel that other view features branch from, such as create, auth and viewing a single story.
    focusPanelState: "", // series of states for the focuspanel component to switch between
  };

  componentDidMount() {
    // fetches first page of data if it's not already downloaded.
    // stops refreshing from creating a large stack of duplicate data.
    if (this.state.stories.length === 0) {
      this.requestNextPage();
    }
    //this.seedEmptyDatabase(); // for creating dummy content
  }

  // pulls the requested page of data from the database
  // does not update the page number in state
  // also does not check to see if page has already been downloaded
  // so useful fixes to include
  fetchPage(page) {
    axios
      .get(`${config.API_URL}/story/page/${page}`)
      .then((response) => {
        console.log(`Fetched page ${page} of stories`);
        this.setState({
          stories: [...this.state.stories, ...response.data],
        });
      })
      .catch((err) => {
        console.log(`Failed to fetched page ${page} of stories`);
      });
  }

  // Gets next page of story data then increase the page number
  // to help stop duplicate pages
  requestNextPage = () => {
    this.fetchPage(this.state.page);
    this.setState({
      page: this.state.page + 1,
    });
  };

  toggleUseFocusPanel = () => {
    this.setState({
      useFocusPanel: !this.state.useFocusPanel,
    });
  };

  setUseFocusPanel = (bool) => {
    this.setState({
      useFocusPanel: bool,
    });
  };

  loadCreatePanel = () => {
    this.setState({
      useFocusPanel: true,
      focusPanelState: (
        <FocusPanel
          panelState={"create"}
          closeFocusPanel={this.toggleUseFocusPanel}
          loggedInUser={this.props.loggedInUser}
          updateUserData={this.props.updateUserData}
          refreshStories={this.refreshStories}
        />
      ),
    });
  };

  loadViewCardPanel = (story) => {
    this.setState({
      useFocusPanel: true,
      focusPanelState: (
        <FocusPanel
          panelState={"viewCard"}
          closeFocusPanel={this.toggleUseFocusPanel}
          loggedInUser={this.props.loggedInUser}
          updateUserData={this.props.updateUserData}
          refreshStories={this.refreshStories}
          replaceStory={this.replaceStory}
          removeStory={this.removeStory}
          story={story}
        />
      ),
    });
  };

  replaceStory = (story) => {
      let newStories = this.state.stories.map((elem) => {
        if(elem._id === story._id) {
            return story;
        } else {
            return elem;
        }
      });
      this.setState({
          stories: newStories
      });
  }

  removeStory = (story) => {
    let newStories = this.state.stories.filter((elem) => {
        return (elem._id !== story._id)
      });
      this.setState({
          stories: newStories
      });
  }

  getFocusPanel() {
    return this.state.focusPanelState;
  }

  // reboots the stories array.
  // using it mainly for showing new posts
  refreshStories = () => {
    this.setState({
      stories: [],
      page: 0
    });
    this.requestNextPage();
  };

  showStory = (story) => {
    this.loadViewCardPanel(story);
  };

  render() {
    return (
      <div id="view-stories-page">
        <BrowseStoriesPanel
          stories={this.state.stories}
          requestNextPage={this.requestNextPage}
          showStory={this.showStory}
        />
        {
          // Navbar is called seperately in other components in focus panel.
          // But has to be called otherwise here.
          // panelState is used to call the specific panel built on top of the base focusPanel
          this.state.useFocusPanel ? (
            this.getFocusPanel()
          ) : (
            <Navbar
              items={[
                {
                  text: "Create",
                  icon: "fas fa-edit",
                  click: this.loadCreatePanel,
                },
              ]}
            />
          )
        }
      </div>
    );
  }

  // for creating dummy content
  seedEmptyDatabase = () => {
    if (this.state.stories.length === 0) {
      for (let i = 0; i < 100; i++) {
        let defaultImages = [
          "https://images.unsplash.com/photo-1514866546504-0c2bbda5f16d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          "https://images.unsplash.com/photo-1510191250627-6fdf443cfec4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          "https://images.unsplash.com/photo-1554174532-48b37f80a254?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          "https://images.unsplash.com/photo-1530800633399-2d35227b35b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          "https://images.unsplash.com/photo-1512237260610-23782f4c1bfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          "https://images.unsplash.com/photo-1572989753782-accb88ad01f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        ];

        let content = [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisi porta lorem mollis aliquam ut. Urna duis convallis convallis tellus id interdum velit laoreet. Maecenas pharetra convallis posuere morbi leo urna molestie at elementum. Elementum eu facilisis sed odio. Placerat vestibulum lectus mauris ultrices eros in. Sem integer vitae justo eget magna fermentum. Malesuada fames ac turpis egestas sed tempus urna et. Diam in arcu cursus euismod quis viverra nibh. Pharetra pharetra massa massa ultricies mi. Ante in nibh mauris cursus mattis molestie a. Aliquam nulla facilisi cras fermentum odio eu. In nulla posuere sollicitudin aliquam ultrices.",

          "At varius vel pharetra vel turpis nunc eget lorem. Lectus mauris ultrices eros in. Urna duis convallis convallis tellus id interdum velit. Leo in vitae turpis massa. Adipiscing tristique risus nec feugiat in fermentum posuere. Sit amet cursus sit amet dictum. Porta non pulvinar neque laoreet. Luctus venenatis lectus magna fringilla urna. In cursus turpis massa tincidunt dui ut. Amet venenatis urna cursus eget nunc scelerisque viverra. Tincidunt dui ut ornare lectus sit amet est placerat in. Rhoncus urna neque viverra justo nec ultrices dui. Auctor augue mauris augue neque gravida. Neque convallis a cras semper auctor neque vitae tempus quam.",

          "Diam sollicitudin tempor id eu nisl nunc mi ipsum. Amet venenatis urna cursus eget. Turpis egestas integer eget aliquet nibh praesent. Tortor pretium viverra suspendisse potenti nullam ac. Egestas congue quisque egestas diam in arcu cursus. Suspendisse interdum consectetur libero id faucibus nisl tincidunt. Integer feugiat scelerisque varius morbi. Tellus elementum sagittis vitae et leo duis ut diam quam. Dolor sit amet consectetur adipiscing. Lectus arcu bibendum at varius vel pharetra. Dui id ornare arcu odio. Sed vulputate mi sit amet mauris commodo quis. Dignissim suspendisse in est ante. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus.",

          "Lacus laoreet non curabitur gravida arcu ac tortor dignissim. Ut venenatis tellus in metus vulputate eu scelerisque felis. Enim blandit volutpat maecenas volutpat blandit aliquam. Porta lorem mollis aliquam ut porttitor leo a. Tortor vitae purus faucibus ornare suspendisse sed. Egestas fringilla phasellus faucibus scelerisque. Laoreet id donec ultrices tincidunt arcu non sodales neque sodales. A diam sollicitudin tempor id eu nisl nunc mi ipsum. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Feugiat in ante metus dictum. Ut morbi tincidunt augue interdum velit euismod in pellentesque massa. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Diam quam nulla porttitor massa id. At volutpat diam ut venenatis tellus in metus vulputate eu. Dui ut ornare lectus sit amet est placerat in. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper. Lectus urna duis convallis convallis tellus id interdum velit.",

          "Lectus magna fringilla urna porttitor rhoncus dolor purus non. Pellentesque habitant morbi tristique senectus et netus et malesuada. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Nunc congue nisi vitae suscipit. Sed lectus vestibulum mattis ullamcorper velit sed. Neque laoreet suspendisse interdum consectetur libero. Egestas sed tempus urna et. Turpis tincidunt id aliquet risus feugiat in. Sed turpis tincidunt id aliquet risus feugiat. Ut morbi tincidunt augue interdum velit euismod in. Euismod in pellentesque massa placerat duis. Placerat orci nulla pellentesque dignissim enim sit amet. Id semper risus in hendrerit gravida rutrum quisque. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi.",
        ];

        // get first image in content (if any)
        let coverImage = content.find((elem) => {
          return /(http(s?):)/.test(elem);
        });

        // if no images in content, append a random default one to the start
        if (!coverImage)
          content.unshift(
            defaultImages[Math.floor(Math.random() * defaultImages.length)]
          );

        // create story in database
        axios
          .post(
            `${config.API_URL}/story/create`,
            { content },
            { withCredentials: true }
          )
          .then(() => {
            console.log("created post");
          })
          .catch((err) => {
            console.log("failed to create post");
            console.log("error: ", err);
          });
      }
    }
  };
}
