import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
const toolbar = props =>(
    <header className ={classes.Toolbar}>
        <div>MENU</div>
        <div className={classes.Logo}> {/*controlling the height with this wwapper component*/}
            <Logo/>
        </div>        
        <NavigationItems/>
    </header>
)
export default toolbar