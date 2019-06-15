import React, {Component} from 'react'
import Aux from "../../hoc/Aux"
import classes from "./Layout.css"
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer:true
    }
    SideDrawerCloseHanlder = () => {
        this.setState({showSideDrawer:false})
    }
    render(){
        return(
            <Aux>
                <Toolbar/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerCloseHanlder} />
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