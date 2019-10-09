import React from 'react';
import Aux from '../../../hoc/Aux';

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
        </Aux>

    )

}
export default orderSummary; 