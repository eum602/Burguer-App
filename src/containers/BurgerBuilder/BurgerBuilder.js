import React , {Component} from 'react'
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders' //importing our own custom instance of axios
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component {
    state={
        ingredients:null, //set to null because we are going to query values to db
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false //error if request to db fails
    }

    componentDidMount(){
        //making request to db
        axios.get('https://react-my-burger-21d53.firebaseio.com/ingredients.json')//don't forget adding .json at the end
        .then(response=>this.setState({ingredients:response.data}))
        .catch(e=>{this.setState({error:true})}) //setting error to true if request fails.
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
        const queryParams = []
        for(let i in this.state.ingredients){
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`)
        }
        queryParams.push(`price=${this.state.totalPrice}=`)//passing also the total price as a query parameter
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname:"/checkout",
            search:`?${queryString}`
        })
    }

    render(){
        const disabledInfo = {...this.state.ingredients}
        for(let key in disabledInfo){//in for object            
            disabledInfo[key]= disabledInfo[key]<=0
        }

        let burger = this.state.error?<p>Ingredients can not be found</p>:<Spinner/> //handling errors
        //so instead of spinner we show a message if request to db fails.
        let orderSummary=null
        if(this.state.ingredients){
            burger = (
                <Aux>
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

            orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}//props to manage click buttons
            purchaseContinued={this.purchaseContinueHandler}
            />
        }

        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        return(
            <Aux>                
                <Modal 
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}
                >
                {orderSummary}                    
                </Modal>
                {burger}
            </Aux>            
        )
    }
}

export default withErrorHandler(BurgerBuilder,axios) //Wrapping with the error handler hoc component which manages
                                                //unknown properties see l105