import React from 'react';
import '../BuildControls/BuildControls.css';
import BuildControl from './BuildControl/BuildControl'; 

const controls = [
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Salad', type: 'salad'},
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
    onClick={props.ordered}
    > {props.isAuth ? 'ORDER NOW' : 'PLEASE LOGIN TO ORDER'}</button>
</div>
);
export default buildControls; 