import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {NavLink} from 'react-router-dom'; 

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavLink 
         to='/burger' 
         exact
         active>
        <NavigationItem link="/">
            BurgerBuilder
        </NavigationItem>
         </NavLink>

         <NavLink
         to='/checkout'
         active>
         <NavigationItem link="/">
            Checkout
        </NavigationItem>
         </NavLink>
    </ul>

);

export default navigationItems; 