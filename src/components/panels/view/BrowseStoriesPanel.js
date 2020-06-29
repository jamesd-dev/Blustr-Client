// libraries
import React, {Component} from 'react';
// styles
import './styles/BrowseStoriesPanel.css'
// components
import StoryCard from '../../cards/StoryCard'

export default class BrowseStoriesPanel extends Component {

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, false);
    }

    // calls for next page of stories if user has scrolled to the bottom of the screen
    handleScroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
  
        if (bottomOfWindow) {
          this.props.requestNextPage();
        }
      };

    render() {
        return (
            <>
                <div id='browse-stories-panel'>
                    {
                        this.props.stories.map((story, index) => {
                            return <StoryCard key={index} story={story} />
                        })
                    }
                </div>
            </>
        );
    }

}