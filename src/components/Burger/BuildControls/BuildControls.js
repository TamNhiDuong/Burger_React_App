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
    {controls.map(ctrl => (
        <BuildControl 
        key ={ctrl.label} 
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        remove={() => props.ingredientRemove(ctrl.type)}
        disabled={props.disabled[ctrl.type]} 
        />
    ))}
</div>
);
export default buildControls; 