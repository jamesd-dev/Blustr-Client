// libraries
import React, { Component } from "react";
import axios from 'axios';
// useful data
import config from '../../../../config'
// styles
import "./styles/ViewCardPanel.css";
// components
import Navbar from "../../../navbar/Navbar"

export default class ViewCardPanel extends Component {

  render() {

    return (
        <>
        <div id='view-card-content'>
            {this.getContent()}
        </div>
        <Navbar
            items={[
                {
                text: "Like",
                icon: "fas fa-thumbs-up",
                click: this.like
              },
              {
                text: "Dislike",
                icon: "fas fa-thumbs-down",
                click: this.dislike
              },
              {
                text: "Cancel",
                icon: "fas fa-times",
                click: this.returnToBrowse,
              },
            ]}
          />
          </>
    );
  }

  returnToBrowse = () => {

    axios.get(`${config.API_URL}/story/${this.props.story._id}`)
    .then((story) => {
        this.props.replaceStory(story);
        if(story.data.likes * 10 < story.data.dislikes) {
            axios.delete(`${config.API_URL}/story/${this.props.story._id}`)
            .then(() => {
                this.props.removeStory(story.data);
                console.log('removed unpopular story');
            })
            .catch(() => {
                console.log('failed to remove unpopular story');
            })
        }
    })
    .catch(() => {
        console.log('failed to get story');
    })

    this.props.closeFocusPanel();
  };

  getContent = () => {
      
    // seperate content out into images and text and wrap them accordingly
    return this.props.story.content.map((section, index) => {
        // link ... or in this current build, an image
        if((/(http(s?):)/.test(section))) {
            return (
                <img src={section} alt={'story'} className='story-image' key={index}/>
            )
        } else { // not a link. text for now
            return (
                <article className='story-text' key={index}>
                    {section}
                </article>
            )
        }
    })

  }

  like = () => {
    if(!this.props.loggedInUser) {
        this.props.loadAuth();
    } else {
        axios.patch( `${config.API_URL}/story/${this.props.story._id}/like`, {}, { withCredentials: true })
        .then(() => {
            axios
            .get(`${config.API_URL}/user`, { withCredentials: true })
            .then((res) => {
                this.cssLikeDislikeElement(res);
            })
            .catch((err) => {
                console.log("failed to obtain user data");
            });
        })
        .catch((err) => {console.log(err)})
    }
  }

  dislike = () => {
    if(!this.props.loggedInUser) {
        this.props.loadAuth();
    } else {
        axios.patch( `${config.API_URL}/story/${this.props.story._id}/dislike`, {}, { withCredentials: true })
        .then((res) => {
            axios
            .get(`${config.API_URL}/user`, { withCredentials: true })
            .then((res) => {
                this.cssLikeDislikeElement(res);
            })
            .catch((err) => {
                console.log("failed to obtain user data");
            });
        })
        .catch((err) => {console.log(err)})
    }
  }

  cssLikeDislikeElement(res) {
    let altStory = res.data.alteredStories.find((e) => {
        console.log(e.storyId + " " + this.props.story._id);
        return e.storyId === this.props.story._id;
    });
    if(altStory.liked) document.getElementsByClassName('fa-thumbs-up')[0].classList.add('selected');
    else document.getElementsByClassName('fa-thumbs-up')[0].classList.remove('selected');
    if(altStory.disliked) document.getElementsByClassName('fa-thumbs-down')[0].classList.add('selected');
    else document.getElementsByClassName('fa-thumbs-down')[0].classList.remove('selected');
  }

}