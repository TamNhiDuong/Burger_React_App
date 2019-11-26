import React from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient'; 
import './Burger.css'; 

const burger = (props) => {
    //only return array of string of ingredients
    console.log("props in Burger:", props ); 
    let transformedIngredients = Object.keys(props.ingredients)
    
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
        }); 
    })
    //tranform the array of arrays to one single array
    .reduce((arr, el) => {
        //connecting elements
        return arr.concat(el)
        },[]);
    console.log(transformedIngredients);
    if(transformedIngredients == 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className="Burger"> 
        <BurgerIngredient type="bread-top"/>
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom"/>
    
        </div>
    );

};
export default burger; 