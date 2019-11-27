import React from 'react';
import Burger from '../../Burger/Burger'; 
import Button from '../../UI/Button/Button'; 

import classes from '../CheckoutSum/CheckoutSum.module.css'; 

const CheckoutSum = (props) => {
    return (
        <div className={classes.CheckoutSum}>
            <h1>Your burger:</h1>
            <div style={{width: '100%', margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/>
            </div>

            <Button
            btnType="Danger"
            clicked={props.cancelOrder}
            >Cancel</Button>

            <Button
            btnType="Success"
            clicked={props.continueOrder}
            >Order</Button>
        </div>
    )

}
export default CheckoutSum; 