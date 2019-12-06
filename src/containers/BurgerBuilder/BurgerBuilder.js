import React, {Component} from 'react';
import Aux from "../../hoc/Aux/Aux";
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'; 
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'; 
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionCreator from '../../store/actions/index'; 
import { connect } from 'react-redux'; 

////const INGREDIENT_PRICES = {
    ////salad: 0.5,
    ////cheese: 0.4,
    ////meat: 1.3,
    ////bacon: 0.7
////}; 

class BurgerBuilder extends Component {
    state = {
        //ingredients: null,
        //totalPrice: 4,
        //purchasable: false,
        purchasing: false,
        loading: false, 
        //error: false
    }
    //Retrieve data from backend
    componentDidMount() {
        this.props.onFetchIngredients(); 
     
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
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }
        else{
            this.props.history.push('/auth'); 
        }
    };
    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    };
    continuePurchaseHandler = () => {
        //console.log("continueOrder props:",this.props); 
        //const queryParams = [];
        //for (let i in this.state.ingredients) {
        //    const encodedParams = encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]);
        //    queryParams.push(encodedParams); 
        //}
        //const price = 'price=' + this.state.totalPrice; 
        //queryParams.push(price);

       // const queryString = queryParams.join('&');
       // this.props.history.push({
           // pathname: '/checkout',
          //  search: '?' + queryString
       // }); 
       this.props.history.push('/checkout'); 
    }

    //addIngredientHandler = (type) => {
        //const oldCount = this.state.ingredients[type];
        //const updatedCount = oldCount + 1;
        //const updatedIngredients ={
        //    ...this.state.ingredients
        //};
        //updatedIngredients[type] = updatedCount; 
        //Calculate total price
        //const priceAddition = INGREDIENT_PRICES[type]; 
        //const oldPrice = this.state.totalPrice;
        //const newPrice = oldPrice + priceAddition;
        //this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        //this.updatePurchaseState(updatedIngredients);
    //}
    //removeIngredientHandler = (type) => {
       // const oldCount = this.state.ingredients[type];
       // if(oldCount <= 0) {
       //     return;
       // }
       // const updatedCount = oldCount - 1;
       // const updatedIngredients ={
       //     ...this.state.ingredients
       // };
       // updatedIngredients[type] = updatedCount; 
        //Calculate total price
       // const priceDeduction = INGREDIENT_PRICES[type]; 
       // const oldPrice = this.state.totalPrice;
       // const newPrice = oldPrice - priceDeduction;
       // this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
       // this.updatePurchaseState(updatedIngredients);
    //}
    

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
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
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
                 isAuth = {this.props.isAuthenticated}
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
        ingredientsProps: state.burger.ingredients,
        totalPriceProps: state.burger.totalPrice,
        error: state.burger.error,
        isAuthenticated: state.auth.token !== null, 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients: (ingType) => dispatch(actionCreator.addIngredients(ingType)),
        onRemoveIngredients: (ingType) => dispatch(actionCreator.removeIngredients(ingType)), 
        onFetchIngredients: () => dispatch(actionCreator.initIngredients())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));  