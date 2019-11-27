import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {NavLink} from 'react-router-dom'; 

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
            BurgerBuilder
        </NavigationItem>

         <NavigationItem link="/orders">
            Orders
        </NavigationItem>
    </ul>

);

export default navigationItems; 