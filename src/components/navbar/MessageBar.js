import React from 'react';
import './styles/MessageBar.css'

export default function MessageBar(props) {

    // takes props in the form [{text, icon, clickFunction}]
    return (
        <div id='message-bar'>
            {
                <p id='message-bar-message'>{props.message}</p>
            }
        </div>
    );

}