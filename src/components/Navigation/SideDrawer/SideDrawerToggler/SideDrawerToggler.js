import React from 'react';
import classes from './SideDrawerToggler.module.css'; 
//First, pass clicked to Toolbar. 
//Then Function for toggler is in Layout
//Then put the reference from Toolbar.js to Toolbar in Layout

const SideDrawerToggler = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>

);
export default SideDrawerToggler; 