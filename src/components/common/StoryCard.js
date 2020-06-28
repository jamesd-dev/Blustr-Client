import React, { Component } from "react";
import "./StoryCard.css";

export default class StoryCard extends Component {
  render() {
    const story = this.props.story;
    return (
      <div id="story-card" className={(Math.random() * 4 < 1) ? "card-wide story-card" : 'story-card'}>
      <div id='inner-story-card'>
        <img
          id="story-card-cover-image"
          src={story.content
                .find((elem) => {
                  return (/(http(s?):)/.test(
                    elem
                  ));
                })}
          alt="story cover"
        />
        <div id="story-card-text-panel">
          <p id="story-card-teaser">
            {
              // find first content entry that isn't an image address
              // only displays first 20 words as it's a teaser
              story.content
                .find((elem) => {
                  return !(/(http(s?):)/.test(
                    elem
                  ));
                })
                .split(" ")
                .slice(0, 20)
                .join(" ")
            }
            ...
          </p>
        </div>
        </div>
      </div>
    );
  }
}
