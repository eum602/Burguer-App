import React from 'react'
import {NavLink}  from 'react-router-dom'
import classes from './NavigationItem.css'
const navigationItem = props =>(
    <ul className={classes.NavigationItem}>
        <li>
            <NavLink
                to={props.link}                
                activeClassName={classes.active}/**Assigning a custom className
                otherwise react-router-dom will assign an automatic class=active(but
                as React assigns unique class names for all then it wont match
                the active class for an anchor defined in NavivationItem.CSS) */
            >
                {props.children}
            </NavLink>
        </li>
    </ul>
)
export default navigationItem