import classes from './Modal.css'
import React from 'react'
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const modal =  props => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div 
        className={classes.Modal}
        style={{
            transform: props.show ? 'translateY(0)':'translateY(-100vh)',
            opacity : props.show ? '1':'0'
        }}//vh is view port high... is a special unit
        >       
            {props.children}
        </div>
    </Aux>    
)

export default modal 