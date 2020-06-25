import React from 'react';
import './Navitem.css'

export default function NavItem(props) {

    //takes props in the form {text, icon}
    return (
        <div className='nav-icon'>
            <i className={props.item.icon}/>
        </div>
    );

}