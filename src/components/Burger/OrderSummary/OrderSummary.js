import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button'; 

class OrderSummary extends Component {
    //This could be a functional component, change to class just to add componentWillUpdate
    componentWillUpdate() {
        console.log('[OrderSummary] WillUpdate');
    }
    render () {
        console.log('ordersummary-props:', this.props); 
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
        return (
            <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}> {igKey} </span>: {this.props.ingredients[igKey]}
            </li>
        );    
        });
        return (
        <Aux>
            <h3>Your orders:</h3>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price:</strong> {this.props.price.toFixed(2)}</p>
            <p>Check out?</p>
            <Button btnType="Danger" clicked={this.props.cancelPurchase}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.continuePurchase}>ORDER</Button>
        </Aux>
        ); 

    }
}
export default OrderSummary; 