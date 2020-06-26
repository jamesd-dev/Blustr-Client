import React, {Component} from 'react';
import Axios from 'axios';
import config from '../../config';
import InfinitePanel from '../common/InfinitePanel'
import Navbar from '../common/Navbar'
import CreatePanel from '../CreatePanel';

export default class ViewPage extends Component {

    state = {
        stories: [],
        page: 0,
        viewPanel: <></>,
        navItems: [],
    }

    componentDidMount() {
        this.fetchPage(this.state.page);
        this.loadViewPanel();
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

    loadCreatePanel = () => {
        document.querySelector('body').classList.add('scroll-freeze');
        this.setState({
            viewPanel: <CreatePanel handleSubmit={this.handleCreateSubmit}/>,
            navItems: [
                {text: 'Accept', icon: 'fas fa-check', click: this.loadViewPanel},
                {text: 'Accept', icon: 'fas fa-times', click: this.loadViewPanel},
            ],
        })
        console.log('changed view to create');
    }

    loadViewPanel = () => {
        document.querySelector('body').classList.remove('scroll-freeze');
        this.setState({
            viewPanel: <></>,
            navItems: [
                {text: 'Create', icon: 'fas fa-edit', click: this.loadCreatePanel},
            ],
        })
        console.log('changed view to view');
    }

    handleCreateAccept = () => {
        document.getElementById('form').submit();
    }

    handleCreateSubmit = () => {
        this.loadViewPanel();
    }

    render() {
        return (
            (
                <div id="view-page">
                    <Navbar items={this.state.navItems}/>
                    <InfinitePanel stories={this.state.stories} requestNextPage={this.requestNextPage}/>
                    {this.state.viewPanel}
                </div>
            )
        );
    }

}