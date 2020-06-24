import React, {Component} from 'react';

export default class InfinitePanel extends Component {

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, false)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, false)
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
                <p>InfinitePanel</p>
                {
                    this.props.stories.map((story, index) => {
                        return (<p key={index}>{story._id}</p>)
                    })
                }
            </>
        );
    }

}