import React, {Component} from 'react';
import Aux from "../../hoc/Aux/Aux";
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'; 
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}; 

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false, 
        error: false
    }
    //Retrieve data from backend
    componentDidMount() {
        axios.get('https://react-burger-app-d20bc.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState( {ingredients: response.data} ); 
        })
        .catch(error => {
            this.setState({error: true});
    }); 
}
    updatePurchaseState(ingredients) {
        //const ingredients = {
          //  ...this.state.ingredients
        //};
        console.log('testing'); 
        console.log(Object.keys(ingredients));
        console.log(Object.keys(ingredients).map(igkey => {return ingredients[igkey]}));
        const sum = Object.keys(ingredients)
        .map(igkey => {
            return ingredients[igkey];
        })
        .reduce((sum, el)=>{
            return sum + el;
        },0);
        this.setState({purchasable: sum > 0})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };
    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    };
    continuePurchaseHandler = () => {
        console.log("continueOrder props:",this.props); 
        const queryParams = [];
        for (let i in this.state.ingredients) {
            const encodedParams = encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]);
            queryParams.push(encodedParams); 
        }
        const price = 'price=' + this.state.totalPrice; 
        queryParams.push(price);

        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        }); 

        //Change loading to true as orderSummary is about to be shown
       // this.setState({loading: true})
        //alert("You are continuing!")
        //Sending data to Firebase, endpoint: /orders.json. In which 'orders' is random. 
        //order is data object
       // const order = {
          //  ingredients: this.state.ingredients,
           // price: this.state.totalPrice,
           // customer: {
             //   name: 'Yang Yee',
              //  address: {
               //     street: 'Kilonrinne 10 B36',
              //      zipCode: '02610',
               //     country: 'Finland'
               // },
               // email: 'a1801032@myy.haaga-helia.fi'
           // },
           // deliveryMethod: 'Foodora'
        //}
        //axios.post('/orders.json', order)
        //.then( response => {
           // this.setState({loading: false, purchasing: false});
       // })
       // .catch(error =>{
         //   this.setState({loading: false, purchasing: false});
       // });
    }

    addIngredientHandler = (type) => {
        console.log(type); 
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; 
        //Calculate total price
        const priceAddition = INGREDIENT_PRICES[type]; 
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; 
        //Calculate total price
        const priceDeduction = INGREDIENT_PRICES[type]; 
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    

    render() {
        const disabledInfor = {
            ...this.state.ingredients
        };
        //check true/ false, if true then disable the button
        //{salad: true; meat: false,...}
        for (let key in disabledInfor) {
            disabledInfor[key] = disabledInfor[key] <= 0
        }
        let orderSummary =  null; 
        //Having burger when data from backend response, otherwiise app show Spinner
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                 ingredientAdded={this.addIngredientHandler}
                 ingredientRemove={this.removeIngredientHandler}
                 disabled={disabledInfor}
                 purchasable={this.state.purchasable}
                 price={this.state.totalPrice}
                 ordered={this.purchaseHandler}
                 />
            </Aux>
            ); 
            //Burger summary only show when there is response
         orderSummary = <OrderSummary 
            ingredients= {this.state.ingredients}
            cancelPurchase={this.cancelPurchaseHandler}
            continuePurchase={this.continuePurchaseHandler}
            price={this.state.totalPrice}
            />
        }
        //Show spinner or OrderSummary? False or true?
        if (this.state.loading) {
            orderSummary = <Spinner/> ; 
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} cancelPurchase={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        ); 
    }

}
export default withErrorHandler(BurgerBuilder, axios); 