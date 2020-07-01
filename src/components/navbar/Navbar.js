import React, {Component} from 'react';
import './styles/Navbar.css'
import Navitem from './Navitem'
import MessageBar from './MessageBar'

export default class Navbar extends Component {

    componentDidMount() {
        if(this.props.onLoad) {
            this.props.onLoad();
        }
    }

    // takes props in the form [{text, icon, clickFunction}]
    render() {
    return (
        <div id='ui-container'>
        <div id='navbar'>
            {
                this.props.items.map((item, index) => {
                    return (<Navitem item={item} key={index}/>)
                })
            }
        </div>
        <MessageBar message={'demo message'}/>
        </div>
    );
        }

}