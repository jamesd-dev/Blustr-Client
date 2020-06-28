import React from 'react';
import './styles/Navbar.css'
import Navitem from './Navitem'

export default function Navbar(props) {

    // takes props in the form [{text, icon, clickFunction}]
    return (
        <div id='navbar'>
            {
                props.items.map((item, index) => {
                    return (<Navitem item={item} key={index}/>)
                })
            }
        </div>
    );

}