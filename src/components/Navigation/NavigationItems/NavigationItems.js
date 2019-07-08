import React from 'react'
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = props =>(//active es boolean, por eso se pasa asi.
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" >Burger Builder</NavigationItem>{/**
        active is set automatically due to NavLink(react-router-dom) on NavigationItem component*/}
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
)
export default navigationItems