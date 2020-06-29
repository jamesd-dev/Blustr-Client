// libraries
import React, {Component} from 'react';
// styles
import './styles/FocusPanel.css'
// components
import CreatePanel from './create/CreatePanel';
import AuthPanel from './auth/AuthPanel'

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
            default:
                return <></>
        }
    }

    loadCreate = () => {
        if(!this.props.loggedInUser) {
            return this.loadAuth();
        } else {
            return <CreatePanel closeFocusPanel={this.props.closeFocusPanel}/>
        }
    }

    loadAuth = () => {
        return <AuthPanel closeFocusPanel={this.props.closeFocusPanel}/>
    }

}