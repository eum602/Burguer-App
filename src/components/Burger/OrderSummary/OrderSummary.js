import React, {useEffect} from 'react'
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button'

const orderSummary = props =>{

    useEffect(()=>{
        console.log('[OrderSummary] rendering...')
    })//useEffect runs only when mounting and unmounting and everytime this component HAS BEEN rendered.

    const ingredientSummary = Object.keys(props.ingredients).map(igKey=>{
        return (
            <li key={igKey}>
                <span style={{textTransform:'capitalize'}}>
                    {igKey}
                </span>
                : {props.ingredients[igKey]}
            </li>
            )
    })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger  with the following ingredients </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            {/*Reusing Buttons */}
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
}
export default React.memo(orderSummary)//React.memo is the analogous to shouldComponentUpdate
                                        //but for functional components