import React from 'react'
import classes from './Burger.css'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = props => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey=>{
        console.log('igKey:' , igKey)
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            console.log(igKey+i)
            console.log(<BurgerIngredient key={igKey+i}type={igKey}/>)
            return <BurgerIngredient key={igKey+i}type={igKey}/>
        })//[,]
    })
    .reduce((arr,el)=>{//array es un object array
        console.log(typeof(arr),'arr',arr,'el',el)
        return arr.concat(el)
    },[] //arr=previous value ; el= current value; [] = initial value

    )

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