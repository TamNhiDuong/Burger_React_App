import React from 'react';
import classes from '../BuildControls/BuildControls.css';
import BuildControl from './BuildControl/BuildControl'; 

const controls = [
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'}
];

const buildControls = (props) => (
<div className='BuildControls'>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
        <BuildControl 
        key ={ctrl.label} 
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        remove={() => props.ingredientRemove(ctrl.type)}
        disabled={props.disabled[ctrl.type]} 
        />
    ))}
    <button className='OrderButton' 
    disabled={!props.purchasable}
    >ORDER NOW</button>
</div>
);
export default buildControls; 