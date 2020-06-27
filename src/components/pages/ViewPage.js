import React, {Component} from 'react';
import Axios from 'axios';
import config from '../../config';
import InfinitePanel from '../common/InfinitePanel'
import Navbar from '../common/Navbar'
import CreatePanel from '../CreatePanel';
import AuthPanel from '../AuthPanel';

export default class ViewPage extends Component {

    state = {
        stories: [],
        page: 0,
        viewPanel: <></>,
        navItems: []
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

        if(!this.props.loggedInUser) {
            this.loadAuthPanel();
            return;
        }

        document.querySelector('body').classList.add('scroll-freeze');
        this.setState({
            viewPanel: <CreatePanel handleSubmit={this.handleCreateSubmit}/>,
            navItems: [
                {text: 'Accept', icon: 'fas fa-check', click: this.handleCreateAccept},
                {text: 'Cancel', icon: 'fas fa-times', click: this.loadViewPanel},
            ],
        })
        console.log('changed view to create');
    }

    loadAuthPanel = () => {
        document.querySelector('body').classList.add('scroll-freeze');
        this.setState({
            viewPanel: <AuthPanel/>,
            navItems: [
                {text: 'Accept', icon: 'fas fa-check', click: this.handleAuthAccept},
                {text: 'Cancel', icon: 'fas fa-times', click: this.loadViewPanel},
            ],
        })
        console.log('changed view to auth');
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
        let content = this.processFormContent();
        // create post
        this.loadViewPanel();
    }

    handleAuthAccept = () => {
        let content = this.processFormContent();
        // create post
        
        let email = content[2];
    let username = content[0];
    let password = content[1];
    let route = (email) ? 'signup' : 'signin'
    Axios.post(`${config.API_URL}/${route}`, {
      email: email,
      username: username,
      password: password
    }, { withCredentials: true})
    .then((res) => {
        this.props.updateUserData(res.props);
        this.loadViewPanel();
    })

        
    }

    processFormContent = () => {
        // strips values from any elements in the form that has them.
        let formChildren =  document.getElementById('form').childNodes;
        let content = [].map.call(formChildren, (section) => {return section.firstChild.value});
        content = [].filter.call(content, (section) => {return section});
        return content;
    }

    render() {
        console.log(this.props.loggedInUser);
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