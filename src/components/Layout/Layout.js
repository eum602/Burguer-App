import React from 'react'
import Aux from "../../hoc/Aux"
import classes from "./Layout.css"
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = props =>(//Layout for the page
    <Aux>
        <Toolbar/>
        <SideDrawer/>
        <main className={classes.Content}> {/* adding margin with respect to its parent; all
        wrapper and components done in react do not add style in the project; we add style directly in
        html elements */}
            {props.children}
        </main>        
    </Aux>
)

export default layout