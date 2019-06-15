import React, {Component} from 'react'
import Aux from "../../hoc/Aux"
import classes from "./Layout.css"
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer:false
    }
    sideDrawerCloseHanlder = () => {
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleHanlder = () => {
        this.setState(prevState=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }


    render(){
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHanlder}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHanlder} />
                <main className={classes.Content}> {/* adding margin with respect to its parent; all
                wrapper and components done in react do not add style in the project; we add style directly in
                html elements */}
                    {this.props.children}
                </main>
            </Aux>
        )

    }
}

export default Layout