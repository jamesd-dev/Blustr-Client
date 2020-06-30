import React from 'react';
import './styles/Navitem.css'

export default function NavItem(props) {
    //takes props in the form {text, icon, click}
    return (
        <div className='nav-icon'>
            <i className={props.item.icon} onClick={props.item.click}/>
            {(props.item.stat) ? <p className='nav-icon-stat'>{props.item.stat}</p> : <></>}
        </div>
    );

}