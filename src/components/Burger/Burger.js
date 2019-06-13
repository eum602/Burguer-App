import React from 'react'
import classes from './Burger.css'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = props => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey=>{//igKey: ingredient key => each key obtained in an array by using Object.keys
        //console.log('igKey:' , igKey)//somthing like salad, bacon and so on.
        return [...Array(props.ingredients[igKey])].map((_,i)=>{            
            return <BurgerIngredient key={igKey+i} type={igKey}/>
        })
    })
    .reduce((arr,el)=>{//arr=previous value ; el= current value; [] = initial value so arr is at
        //the beginning []        
        return arr.concat(el)
    },[])

    if(transformedIngredients.length===0){
        transformedIngredients = <p>Please start adding  ingredients!</p>
    }
    console.log('transformedIngredients: ',transformedIngredients)
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}

export default burger