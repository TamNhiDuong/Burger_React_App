import React, {Component} from 'react'; 
import Aux from '../Aux/Aux'; 
import './layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'; 
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import {connect} from 'react-redux'; 
//statefull class to set true false for having Backdrop or not

class Layout extends Component {
    state = {  
        sideDrawerOpen: false
    }
    sideDrawerCloseHandler = () => {
        this.setState({sideDrawerOpen: false})
    };
    //Do not write: this.state({sideDrawerOpen: !this.state.sideDrawerOpen})
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    }
    render() {
        return (
    <Aux>
        <SideDrawer 
        open={this.state.sideDrawerOpen} 
        close={this.sideDrawerCloseHandler}
        isAuthenticated= {this.props.isAuthenticatedProps} />
        <Toolbar 
        sideDrawerToggleHandler={this.sideDrawerToggleHandler}
        isAuthenticated= {this.props.isAuthenticatedProps}     
        />
        <div>Toolbar, Side drawer, Backdrop</div>
        <main className="Content">
              {this.props.children}
        </main>
    </Aux>

        )
    }
}

const fromStateToProps = (state) => {
    return {
        isAuthenticatedProps: state.auth.token !== null, 
    }
}
export default connect(fromStateToProps)(Layout); 