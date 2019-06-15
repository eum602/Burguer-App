import classes from './Modal.css'
import React, {Component} from 'react'
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
//Modal converted from presentational to stateful component:
class Modal extends Component {
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show!==this.props.show //condition to render or not.
    }

    componentWillUpdate(){//if updates it runs
        console.log('[Modal] Will update')
    }
    render() {
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)':'translateY(-100vh)',
                    opacity : this.props.show ? '1':'0'
                }}//vh is view port high... is a special unit
                >
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal