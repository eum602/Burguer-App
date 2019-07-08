import React from 'react'
import classes from './Input.css'
const input = props => {
    let inputElement=null
    switch(props.elementType){//we use again elementType (camelCase) because this not goes to
        //directly to an input html element but only for the switch
        case('input'):
            inputElement=<input 
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />/**
            Passing props such as name, type and place holder which comes from parent component */
            break
        case('textarea'):
            inputElement=<textarea 
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />
            break
        case('select'):
            inputElement = (
                <select                    
                    className={classes.InputElement}
                    value={props.value}
                    onChange={props.changed}
                >       
                    {props.elementConfig.options.map(option=>(
                        <option 
                            value={option.value}
                            key={option.value}
                        >
                        {option.displayValue}
                        </option>
                    ))}
                </select>
                )
            
            break

        default:
            inputElement=<input 
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />
    }
    return(
        <div 
            className={classes.Input}>
     
           <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input