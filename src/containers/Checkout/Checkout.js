import React, {Component} from 'react';
import CheckoutSum from '../../components/Order/CheckoutSum/CheckoutSum'; 
import {Route} from 'react-router-dom';
import Contact from '../../containers/Checkout/Contact/Contact'; 

import { connect } from 'react-redux';

class Checkout extends Component {
   // state = {
    //    ingredients: {},
    //    price: 0
    //}

    cancelOrderHandler = () => {
        this.props.history.goBack(); 
    }
    continueOrderHandler = () => {
        this.props.history.replace('/checkout/contact-data'); 
    }
    //componentWillMount() {  
      //  console.log("checkout:", this.props); 
      //  const query = new URLSearchParams(this.props.location.search);
      //  const ingredients = {}; 
       // let price = 0; 
       // for (let param of query.entries()){
       //     if(param[0] === 'price') {
        //        price = param[1]
        //    }
        //    else {
         //       ingredients[param[0]] = +param[1]; 
         //   }
         //   console.log('param in checkout:', param); 
         //   console.log('ingredients passed to checkout: ',ingredients);
        //}
        //this.setState({ingredients: ingredients}); 
        //this.setState({price: price})
    //}

    render(){
        return (
            <div>
                <CheckoutSum ingredients={this.props.ingredientsProps}
                cancelOrder={this.cancelOrderHandler}
                continueOrder={this.continueOrderHandler}
                />
               <Route 
               path={this.props.match.path + '/contact-data'}
               component={Contact}/>
            </div>
             
               //render={(props)=>(<Contact 
               //ingredients={this.state.ingredients}
               //price={this.state.price}
               //{...props}
               ///>)}/>           
    
        )
    }

}
const mapStateToProps = state => {
    return {
        ingredientsProps: state.burger.ingredients,
        totalPriceProps: state.burger.totalPrice,
    };
};
export default connect(mapStateToProps)(Checkout); 