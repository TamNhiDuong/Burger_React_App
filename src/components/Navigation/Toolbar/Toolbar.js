import React from 'react';
import classes from '../Toolbar/Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggler from '../SideDrawer/SideDrawerToggler/SideDrawerToggler'; 

const toolbar = (props) => (
    <header className={classes.Toolbar}>
       <SideDrawerToggler clicked={props.sideDrawerToggleHandler}/>
       <div className={classes.Logo}>
       <Logo/>
       </div>
        
        <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={props.isAuthenticated}/>
        </nav>
    </header>    
    
);
export default toolbar;

