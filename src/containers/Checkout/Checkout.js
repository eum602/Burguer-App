import React, {Component} from 'react'
import CheckoutSummary from'../../components/Order/CheckoutSummary/CheckoutSummary'
class Checkout extends Component{
    state={
        ingredients:{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }
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
        const query = new URLSearchParams(this.props.location.search);       
        for (let param of query.entries()) {
            //['salad','1']
            ingredients[param[0]]=+param[1]//using + to convert string to number
        }
        this.setState({ingredients})
    }
    render(){        
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled= {this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    />
            </div>
        )
    }    
}
export default Checkout