import React from 'react';
import './Navbar.css'
import Navitem from './Navitem'

export default function Navbar(props) {

    // takes props in the form [{text, icon}]
    return (
        <div id='navbar'>
            {
                props.items.map((item) => {
                    return (<Navitem item={item}/>)
                })
            }
        </div>
    );

}