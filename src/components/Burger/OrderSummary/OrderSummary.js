import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'; 

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return (
            <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}> {igKey} </span>: {props.ingredients[igKey]}
            </li>
        );    
    });
    
        
    return (
        <Aux>
            <h3>Your orders:</h3>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Check out?</p>
            <Button btnType="Danger" clicked={props.cancelPurchase}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continuePurchase}>ORDER</Button>
        </Aux>

    )

}
export default orderSummary; 