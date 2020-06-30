// libraries
import React, {Component} from 'react';
// styles
import './styles/FocusPanel.css'
// components
import CreatePanel from './create/CreatePanel';
import AuthPanel from './auth/AuthPanel'
import ViewCardPanel from './viewCard/ViewCardPanel'

export default class FocusPanel extends Component {

    state = {
        panelState: '', // The specific component to load onto the base panel
    }

    componentDidMount() {
        document.querySelector('body').classList.add('scroll-freeze');
        // if called from ViewStoriesPage, this sets the panelState passed through
        // otherwise it can direct it's own state
        this.setState({
            panelState: this.props.panelState
        });
    }

    componentWillUnmount() {
        document.querySelector('body').classList.remove('scroll-freeze');
    }

    render() {
        return (
            <>
                <div id='focus-panel'>
                    <div id='inner-panel'>
                        {this.getPanelComponent()}
                    </div>
                </div>
            </>
        );
    }

    // returns component based on the panel state
    getPanelComponent = () => {
        switch (this.state.panelState) {
            case 'create' : return this.loadCreate();
            case 'viewCard' : return this.loadViewCard(this.props.story);
            case 'auth' : return this.loadAuth();
            default:
                return <></>
        }
    }

    setPanelState = (state) => {
        this.setState({
            panelState: state
        });
    }

    loadCreate = () => {
        if(!this.props.loggedInUser) {
            return this.loadAuth();
        } else {
            return <CreatePanel
             closeFocusPanel={this.props.closeFocusPanel}
             refreshStories={this.props.refreshStories}
             />
        }
    }

    loadViewCard = (story) => {
        return <ViewCardPanel
             closeFocusPanel={this.props.closeFocusPanel}
             story={story}
             loadAuth = {() => {this.setPanelState('auth')}}
             loggedInUser={this.props.loggedInUser}
             replaceStory={this.props.replaceStory}
            removeStory={this.props.removeStory}
             />
    }

    loadAuth = () => {
        return <AuthPanel closeFocusPanel={this.props.closeFocusPanel} updateUserData={this.props.updateUserData}/>
    }

}