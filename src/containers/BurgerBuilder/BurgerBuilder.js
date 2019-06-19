import React , {Component} from 'react'
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders' //importing our own custom instance of axios

const INGREDIENTS_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component {
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false
    }

    updatePurchaseState = ingredients =>{//function to enable or disable purchase Button in 
                                            //BuildControls component by using map reduce
        //const ingredients = {...this.state.ingredients}
        const sum = Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey]
        })
        .reduce((sum,el)=>{
            return sum + el
        },0)//zero is the initial value of the sum

        this.setState({purchasable:sum > 0})
    }
    //Adding and removing ingredients
    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount +1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice
        const newPrice =  oldPrice + priceAddition
        this.setState({totalPrice: newPrice , ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        if(oldCount<=0)return
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice
        const newPrice =  oldPrice - priceDeduction
        this.setState({totalPrice: newPrice , ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () =>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () =>{
        //alert('You continue!')
        const order = {
            ingredients: this.state.ingredients,
            price:this.state.totalPrice,
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
        .then(response=>console.log(response))
        .catch(e=>console.log(e))
    }

    render(){
        const disabledInfo = {...this.state.ingredients}
        for(let key in disabledInfo){//in for object
            console.log('key',key)
            disabledInfo[key]= disabledInfo[key]<=0
        }
        return(
            <Aux>                
                <Modal 
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}
                >
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}//props to manage click buttons
                    purchaseContinued={this.purchaseContinueHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>                
                <BuildControls
                ingredientAdded ={this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}/>
            </Aux>            
        )
    }
}

export default BurgerBuilder