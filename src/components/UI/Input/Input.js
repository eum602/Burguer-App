import React from 'react'
import classes from './Input.css'
const input = props => {
    let inputElement=null
    switch(props.inputtype){//inputtipe instead of inputType because warned by react
        case('input'):
            inputElement=<input className={classes.InputElement} {...props}/>/**
            Passing props such as name, type and place holder which comes from parent component */
            break
        case('textarea'):
            inputElement=<textarea className={classes.InputElement} {...props}/>
            break
        default:
            inputElement=<input className={classes.InputElement} {...props}/>
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input