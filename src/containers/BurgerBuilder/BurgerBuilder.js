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
        //alert('You continue!')
        this.setState({loading:true})
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
        .then(response=>{
            this.setState({loading:false,purchasing:false})
            this.props.history.push('/checkout')
        })//purchasing:false to not to show modal anymore
        //loading to turn off sping by switching to <OrderSummary> =>see orderSummary variable in render
        .catch(e=>this.setState({loading:false,purchasing:false}))
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