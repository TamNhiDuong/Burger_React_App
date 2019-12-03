import React, {Component} from 'react';
import Aux from "../../hoc/Aux/Aux";
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'; 
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from '../../store/actionTypes'; 
import { connect } from 'react-redux'; 

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}; 

class BurgerBuilder extends Component {
    state = {
        //ingredients: null,
        //totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false, 
        error: false
    }
    //Retrieve data from backend
    componentDidMount() {
        //axios.get('https://react-burger-app-d20bc.firebaseio.com/ingredients.json')
        //.then(response => {
          //  this.setState( {ingredients: response.data} ); 
       // })
        //.catch(error => {
          //  this.setState({error: true});
   // }); 
}
    updatePurchaseState(ingredients) {
        console.log("Object.keys:",Object.keys(ingredients));
        console.log(Object.keys(ingredients).map(igkey => {return ingredients[igkey]}));
        const sum = Object.keys(ingredients)
        .map(igkey => {
            return ingredients[igkey];
        })
        .reduce((sum, el)=>{
            return sum + el;
        },0);
        return sum > 0; 
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
    }

    addIngredientHandler = (type) => {
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
        //use for: Internal state
        //const disabledInfor = {
          //  ...this.state.ingredients
        //};
        const disabledInfor = {
            ...this.props.ingredientsProps
        };
        //check true/ false, if true then disable the button
        //{salad: true; meat: false,...}
        for (let key in disabledInfor) {
            disabledInfor[key] = disabledInfor[key] <= 0
        }
        let orderSummary =  null; 
        //Having burger when data from backend response, otherwiise app show Spinner
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if (this.props.ingredientsProps) {
            burger = (
            <Aux>
                <Burger ingredients={this.props.ingredientsProps}/>
                <BuildControls
                 ingredientAdded={this.props.onAddIngredients}
                 ingredientRemove={this.props.onRemoveIngredients}
                 disabled={disabledInfor}
                 purchasable={this.updatePurchaseState(this.props.ingredientsProps)}
                 price={this.props.totalPriceProps}
                 ordered={this.purchaseHandler}
                 />
            </Aux>
            ); 
            //Burger summary only show when there is response
         orderSummary = <OrderSummary 
            ingredients= {this.props.ingredientsProps}
            cancelPurchase={this.cancelPurchaseHandler}
            continuePurchase={this.continuePurchaseHandler}
            price={this.props.totalPriceProps}
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
// REDUX
const mapStateToProps = state => {
    return {
        ingredientsProps: state.ingredients,
        totalPriceProps: state.totalPrice,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients: (ingType) => dispatch({ type: actionTypes.ADD_INGREDIENTS, ingType: ingType }),
        onRemoveIngredients: (ingType) => dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingType: ingType}), 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)); 