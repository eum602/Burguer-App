import React from 'react'
import classes from './NavigationItem.css'
const navigationItem = props =>(
    <ul className={classes.NavigationItem}>
        <li>
            <a 
                href={props.link}
                className={props.active ? classes.active:null}>
                {props.children}
            </a>
        </li>
    </ul>
)
export default navigationItem