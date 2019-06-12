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
        <div className={classes.Parent} >
            <div className={classes.Son}>p1</div>
            <p className={classes.Son}>p2</p>
            <p className={classes.Son3}>p3</p>
        </div>
    </Aux>
)

export default layout