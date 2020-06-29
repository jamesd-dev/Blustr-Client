import React, { Component } from "react";
import "./styles/ViewCardPanel.css";

export default class ViewCardPanel extends Component {
  render() {
    return (
        <div id='view-card-content'>
            {this.getContent()}
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

  getContent = () => {
      
    // seperate content out into images and text and wrap them accordingly
    return this.props.story.content.map((section) => {
        // link ... or in this current build, an image
        if((/(http(s?):)/.test(section))) {
            return (
                <img src={section} alt={'story image'} className='story-image'/>
            )
        } else { // not a link. text for now
            return (
                <article className='story-text'>
                    {section}
                </article>
            )
        }
    })

  }

}