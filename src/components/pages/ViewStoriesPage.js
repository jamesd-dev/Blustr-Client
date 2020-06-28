// libraries
import React, {Component} from 'react';
import axios from 'axios';
// useful data
import config from '../../config.js';
// styles
import './styles/ViewStoriesPage.css'
// components
import BrowseStoriesPanel from '../panels/BrowseStoriesPanel';
import FocusPanel from '../panels/FocusPanel';
import Navbar from '../navbar/Navbar'


export default class ViewStoriesPage extends Component {

    state = {
        stories: [],
        page: 0, // data has to be split into pages for the infinite scroll feature to work
        useFocusPanel: true, // toggles the panel that other view features branch from, such as create, auth and viewing a single story.
    }

    componentDidMount() {
        // fetches first page of data if it's not already downloaded.
        // stops refreshing from creating a large stack of duplicate data.
        if(this.state.stories.length === 0) {
            this.requestNextPage();
        }
    }

    // pulls the requested page of data from the database
    // does not update the page number in state
    // also does not check to see if page has already been downloaded
    // so useful fixes to include
    fetchPage(page) {
            axios.get(`${config.API_URL}/story/page/${page}`)
            .then((response) => {
                console.log(`Fetched page ${page} of stories`);
                this.setState({
                    stories: [...this.state.stories, ...response.data]
                })
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
            page: this.state.page + 1
        })
    }

    render() {
        return (
            (
                <div id="view-stories-page">
                    <BrowseStoriesPanel stories={this.state.stories} requestNextPage={this.requestNextPage}/>
                    {
                        // Navbar is called seperately in other components in focus panel.
                        // But has to be called otherwise here.
                        // panelState is used to call the specific panel built on top of the base focusPanel
                        (this.state.useFocusPanel) ? <FocusPanel panelState={'create'}/> : <Navbar items={[
                            {text: 'Create', icon: 'fas fa-edit'}
                        ]}/>
                    }
                </div>
            )
        );
    }

}