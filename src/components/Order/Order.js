import React from 'react';
import classes from './Order.module.css';

const Order =(props) => {
    console.log('props in Order:', props);

    const ingredientArray = [];
    for (let ingredientName in props.ingredients){
        ingredientArray.push({name: ingredientName, amount: props.ingredients[ingredientName]}
            ); 
    }

    const ingredientOutput = ingredientArray.map(ingredient => {
        return <span style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border:'1px solid #ccc', padding: '5px'}} 
                     key={ingredient.name}> 
                     {ingredient.name} ({ingredient.amount})
               </span> 
    });

        return (
            <div className={classes.Order}>
                <p>Your burger:{ingredientOutput}</p>
                <p>Total price: {Number.parseFloat(props.price).toFixed(2)}</p>
            </div>
        );
};
export default Order; 