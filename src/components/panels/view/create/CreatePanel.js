// libraries
import React, { Component } from "react";
import axios from 'axios';
// useful data
import config from '../../../../config'
// styles
import "./styles/CreatePanel.css";
// components
import CreateInput from "./CreateInput";
import Navbar from "../../../navbar/Navbar";

export default class CreatePanel extends Component {

    state = {
        defaultImages: [
            "https://images.unsplash.com/photo-1514866546504-0c2bbda5f16d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1510191250627-6fdf443cfec4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1554174532-48b37f80a254?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1530800633399-2d35227b35b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1512237260610-23782f4c1bfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1572989753782-accb88ad01f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        ],
    }

  render() {
    return (
      <>
        <form id="form">
          <CreateInput />
          <Navbar
            items={[
              {
                text: "Accept",
                icon: "fas fa-check",
                click: this.handleAccept,
              },
              {
                text: "Cancel",
                icon: "fas fa-times",
                click: this.returnToBrowse,
              },
            ]}
          />
        </form>
      </>
    );
  }

  handleAccept = () => {
    // get data
    let content = this.getFormContent();

    // get first image in content (if any)
    let coverImage = content.find((elem) => {
      return /(http(s?):)/.test(elem);
    });

    // if no images in content, append a random default one to the start
    if (!coverImage) {
      coverImage = this.state.defaultImages[
        Math.floor(Math.random() * this.state.defaultImages.length)
      ];
      content.unshift(
        coverImage
      );
  }

      // create story in database
      axios.post(
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
        })
        .finally(() => {
          this.returnToBrowse();
        });
  };

  getFormContent = () => {
    let formChildren = document.getElementById("form").childNodes;
    let content = [].map.call(formChildren, (section) => {
      return section.firstChild.value || section.firstChild.src;
    });
    content = [].filter.call(content, (section) => {
      return section;
    });
    return content;
  };

  returnToBrowse = () => {
    this.props.closeFocusPanel();
  };
}
