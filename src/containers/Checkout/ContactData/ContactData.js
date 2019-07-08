import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Aux from '../../../hoc/Aux/Aux';
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }

    orderHandler = e =>{
        e.preventDefault()
        this.setState({loading:true})
        const order = {
            ingredients: this.props.ingredients,
            price:this.props.price,
            customer: {
                name: "Erick Pacheco",
                address: {
                    street:'Punta Negra',
                    zipCode: "23",
                    country: "Peru"
                },
                email: "eum602@gmail.com"            
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json',order) //In firebase as we specify
        // orders then that enpoint is created automatically;
        //also using ".json" extension so that we use a non relational db
        .then(response=>{
            this.setState({loading:false})
            this.props.history.push('/')
        })//purchasing:false to not to show modal anymore
        //loading to turn off sping by switching to <OrderSummary> =>see orderSummary variable in render
        .catch(e=>this.setState({loading:false}))
    }
    render(){
        return(            
            <div className={classes.ContactData}>
                {this.state.loading?
                    <Spinner/>:
                    <Aux>
                        <h4>Enter your Contact Data</h4>
                        <form>
                            <Input inputtype="input" type="text" name="name" placeholder="Your Name"></Input> {/**
                            sending all props like text, name and placeholder automatically because of {...props}
                            in Input component */}
                            <Input inputtype="input" type="text" name="email" placeholder="Your Mail"></Input>
                            <Input inputtype="input" type="text" name="street" placeholder="Street"></Input>
                            <Input inputtype="input" type="text" name="postal" placeholder="Postal Code"></Input>
                            <Button clicked= {this.orderHandler} btnType="Success">ORDER</Button>
                        </form>
                    </Aux>}
            </div>
        )
    }
}

export default ContactData