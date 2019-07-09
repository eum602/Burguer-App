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
                value: 'Erick',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                valueType:'name'
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street',
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                valueType:'Street Name'
            },
            zipCode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP CODE',
                },
                value: '',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false,
                valueType:'ZipCode'
            },
            country: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country',
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                valueType:'Country name'
            },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail',
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                valueType:'email'
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
                value: 'fastest',//adding this initial because otherwise if user do not
                //select then this default will be sent to the db
                valid:true
            },
        },
        formIsValid: false,
        loading:false
    }

    checkValidity = (value,rules) => {
        //determining the inputs in the form are valid or not
        let isValid =  true
        if(rules.required){
            isValid = value.trim() !=='' && isValid //trim (deleting withespacings at the beginning
            //or at the end)
        }
        //here you can add more rules as you require
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.maxLength){
            isValid = value.length <=rules.maxLength &&  isValid
        }

        return isValid
    }

    orderHandler = e =>{
        e.preventDefault()
        this.setState({loading:true})
        const formData = {}
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value
            //creating key-value pairs (eg. name:'Erick')
        }
        const order = {
            ingredients: this.props.ingredients,
            price:this.props.price,
            orderData:formData //passing all data about the user for the database
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
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedFormElement
        let formIsValid = true
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({orderForm:updatedOrderForm, formIsValid})
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
                        <form onSubmit={this.orderHandler}>{/*moving the handler to the form */}
                            {formElementsArray.map(formElement=>{
                                const {elementType, elementConfig,value, valid,validation,valueType} = formElement.config
                                return (
                                    <Input
                                        key={formElement.id}
                                        elementType={elementType}
                                        elementConfig={elementConfig}
                                        value={value}
                                        invalid={!valid}/**for checking validity after checkValidity verifies
                                        the conditions of the filled data in the input */
                                        shouldValidate = {validation}/**shouldValidate to simply
                                        check if that input is validable or not(e. select input is not validable
                                            in our example) */
                                        touched={formElement.config.touched} /**touched is when Input loaded
                                        as FALSE so input is not shown in red from the beggining but
                                        after user enters some values and abandone that input*/
                                        valueType={valueType}
                                        changed={e=>this.inputChangeHandler(e,formElement.id)}
                                    />
                                )
                            })}
                            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                        </form>
                    </Aux>}
            </div>
        )
    }
}

export default ContactData