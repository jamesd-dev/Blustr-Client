import React, { Component } from "react";
import "./styles/StoryCard.css";

export default class StoryCard extends Component {
  render() {
    const story = this.props.story;
    return (
      <div id="story-card" className={(Math.random() * 4 < 1) ? 'story-card card-wide' : 'story-card'} onClick={() => {this.props.showStory(story)}}>
      <div id='inner-story-card'>
        <img
          id="story-card-cover-image"
          src={this.getFirstImage()}
          alt="story cover"
        />
        <div id="story-card-text-panel">
          <p id="story-card-teaser">
            {
              // find first content entry that isn't an image address
              // only displays first 20 words as it's a teaser
              this.getFirstTextSection()
            }
            ...
          </p>
        </div>
        </div>
      </div>
    );
  }

  getFirstImage = () => {
    return this.props.story.content
    .find((elem) => {
      return (/(http(s?):)/.test(
        elem
      ));
    })
  }

  getFirstTextSection = () => {
      
    // finds first text section and rips the first few words to display
    let firstXWords = this.props.story.content
    .find((elem) => {
      return !(/(http(s?):)/.test(
        elem
      ));
    })
    .split(" ")
    .slice(0, 20)
    .join(" ");

    return firstXWords;

  }

}