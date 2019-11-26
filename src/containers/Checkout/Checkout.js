import React, {Component} from 'react';
import CheckoutSum from '../../components/Order/CheckoutSum/CheckoutSum'; 

class Checkout extends Component {
    state = {
        ingredients: {}
    }

    cancelOrderHandler = () => {
        this.props.history.goBack(); 
    }
    continueOrderHandler = () => {
        this.props.history.replace('/checkout/contact-data'); 
    }
    componentDidMount() {
        console.log("checkout:", this.props); 
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}; 
        for (let param of query.entries()){
            console.log(param); 
            ingredients[param[0]] = +param[1]; 
            console.log(ingredients);
        }
        this.setState({ingredients: ingredients}); 
    }

    render(){
        return (
            <div>
                <CheckoutSum ingredients={this.state.ingredients}
                cancelOrder={this.cancelOrderHandler}
                continueOrder={this.continueOrderHandler}/>
            </div>
        )
    }

}
export default Checkout; 