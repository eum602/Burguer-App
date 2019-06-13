import React from 'react'
import burgerLogo from "../../assets/burger-logo.png" //importing logo
import classes from './Logo.css'
const logo = props => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger"/> {/*Getting the logo from elsewhere Webpack put that 
        when rendered on the client side*/}
    </div>
)
export default logo