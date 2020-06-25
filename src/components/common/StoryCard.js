import React, { Component } from "react";
import "./StoryCard.css";

export default class StoryCard extends Component {
  render() {
    const story = this.props.story;
    return (
      <div id="story-card">
        <img
          id="story-card-cover-image"
          src={story.coverImg || "/images/defaultImage.jpg"}
          alt="story cover"
        />
        <div id="story-card-text-panel">
          <h3 id="story-card-title">{story.title}</h3>
          <p id="story-card-teaser">
            {
              // find first content entry that isn't an image address
              // only displays first 20 words as it's a teaser
              story.content
                .find((elem) => {
                  return !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(
                    elem
                  );
                })
                .split(" ")
                .slice(0, 20)
                .join(" ")
            }
            ...
          </p>
        </div>
      </div>
    );
  }
}
