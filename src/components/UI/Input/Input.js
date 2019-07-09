import React from 'react'
import classes from './Input.css'
const input = props => {
    let inputElement=null
    const inputClasses =  [classes.InputElement]
    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.valueType}!</p>;
    }
    if(props.invalid && props.shouldValidate && props.touched){/**these props
        has been expalined in ContactData parent component - all of this is for conditional styling
        not only during the filling process of this input but also at the beggining so that 
        it is user friendly whilst not shown in red from the beggining of the loading 
        of this custom INPUT */
        inputClasses.push(classes.Invalid)
    }
    switch(props.elementType){//we use again elementType (camelCase) because this not goes to
        //directly to an input html element but only for the switch
        case('input'):
            inputElement=<input 
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />/**
            Passing props such as name, type and place holder which comes from parent component */
            break
        case('textarea'):
            inputElement=<textarea 
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />
            break
        case('select'):
            inputElement = (
                <select                    
                    className={inputClasses.join(' ')}
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
                className={inputClasses.join(' ')}
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
            {validationError}
        </div>
    )
}

export default input