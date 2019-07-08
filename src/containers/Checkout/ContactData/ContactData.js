import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Aux from '../../../hoc/Aux/Aux';
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component{
    state={
        orderForm:{
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name',
                },
                value: 'Erick'
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street',
                },
                value: ''
            },
            zipCode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP CODE',
                },
                value: ''
            },
            country: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country',
                },
                value: ''
            },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail',
                },
                value: ''
            },
            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                    options:[
                        {//options only examples; in this case for my elivery method setup
                            value:'fastest',
                            displayValue:'Fastest'
                        },
                        {
                            value:'cheapest',
                            displayValue:'Cheapest'
                        }
                    ]
                },
                value: ''
            },
        },
        loading:false
    }

    orderHandler = e =>{
        e.preventDefault()
        this.setState({loading:true})
        const order = {
            ingredients: this.props.ingredients,
            price:this.props.price            
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

    inputChangeHandler=(event,inputIdentifier)=>{
        const updatedOrderForm = {...this.state.orderForm} //making a true clone of orderForm
        const updatedFormElement =  {...updatedOrderForm[inputIdentifier]} /*as each element if the 
        orderForm is an object then each element on the cloned updatedFormElemet will be a POINTER
        and NOT A TRUE CLONE so we are taking a true copy of that element by using spread operator 
        again. We do all of this in order to not to modify the state directly(withouyt this.setState)*/
        updatedFormElement.value = event.target.value
        updatedOrderForm[inputIdentifier] = updatedFormElement
        this.setState({orderForm:updatedOrderForm})
    }

    render(){
        const formElementsArray = []
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        return(
            <div className={classes.ContactData}>
                {this.state.loading?
                    <Spinner/>:
                    <Aux>
                        <h4>Enter your Contact Data</h4>
                        <form>                            
                            {formElementsArray.map(formElement=>{
                                const {elementType, elementConfig} = formElement.config
                                return (
                                    <Input
                                        key={formElement.id}
                                        elementType={elementType}
                                        elementConfig={elementConfig}
                                        value={formElement.value}
                                        changed={e=>this.inputChangeHandler(e,formElement.id)}
                                    />
                                )
                            })}
                            <Button clicked= {this.orderHandler} btnType="Success">ORDER</Button>
                        </form>
                    </Aux>}
            </div>
        )
    }
}

export default ContactData