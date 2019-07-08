import React from 'react'
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = props =>(//active es boolean, por eso se pasa asi.
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>{/**
        Using "EXACT" keyword to pass to NavigationItem as a prop, so that we
        can control wich NavLink in NavigationItem component receives exact or not*/}
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
)
export default navigationItems