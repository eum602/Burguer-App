import React, {Component} from 'react'
import CheckoutSummary from'../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
class Checkout extends Component{
    state={
        ingredients:null,
        totalPrice:0
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack() //takes you back to the previous page
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data') //replaces the path url, then will go
        //again to the parent(app.js) to find routes that matches partially or exactly with
        //"/checkout/contact-data", at this point it only found /checkout on parent and thus renders it 
        //again
    }
    componentDidMount(){
        const ingredients={}
        let price = 0
        const query = new URLSearchParams(this.props.location.search);       
        for (let param of query.entries()) {
            //['salad','1']
            if(param[0]==='price'){
                price=param[1]
            }else{
                ingredients[param[0]]=+param[1]//using + to convert string to number
            }            
        }
        this.setState({ingredients, totalPrice:price})
    }
    render(){
        const checkoutSummary = this.state.ingredients?
            <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled= {this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
            />:null
        return(
            <div>
                {checkoutSummary}                
                <Route path={`${this.props.match.path}/contact-data`} render={props=>(
                    <ContactData                        
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        {...props} //passing the props that comes from Route through its render
                        //method os that ContactData component can use that to for instance redirect
                    />)}
                />{/*By using render instead of component we are able to PASS PROPS */}
            </div>
        )
    }    
}
export default Checkout