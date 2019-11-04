import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux'; //To be able to add reused Backdrop to side-drawer
const sideDrawer = (props) => {
    //Adding attached classes to have animation of close-open SideDrawer, if only assigned css-class-SideDrawer
    //Then the SideDrawer always open
    //join'' to turn the Array to a single string 
    
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]; 
    }
    return (
        <Aux>
        <Backdrop show = {props.open} clicked= {props.close}/>
        <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
        <Logo/>
        </div>  
            <nav>
            <NavigationItems/>
            </nav>
        </div>
        </Aux>
    );
};
export default sideDrawer; 