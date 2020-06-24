import React, {Component} from 'react';
import InfinitePanel from '../common/InfinitePanel'
import Axios from 'axios';
import config from '../../config';

export default class ViewPage extends Component {

    state = {
        stories: [],
        page: 0,
    }

    componentDidMount() {
        this.fetchPage(this.state.page);
    }

    fetchPage(page) {
        return new Promise((resolve, reject) => {
            Axios.get(`${config.API_URL}/story/page/${page}`)
            .then((response) => {
                console.log(`Fetched page ${page} of stories`);
                this.setState({
                    stories: [...this.state.stories, ...response.data]
                })
                resolve(response);
            })
            .catch((err) => {
                console.log(`Failed to fetched page ${page} of stories`);
                reject(err);
            });
        });
    }

    // gets the next page of data, even if there isn't any more.
    // I'm sure this is going to cause bugs at some point, but the code is to embroyonic atm too see precicely how.
    requestNextPage = () => {
        this.setState({
            page: this.state.page + 1
        })
        this.fetchPage(this.state.page);
    }

    render() {

        return (
            <div id="view-page">
                <InfinitePanel stories={this.state.stories} requestNextPage={this.requestNextPage}/>
            </div>
        );
    }

}