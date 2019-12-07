import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout'; 
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'; 
import OrderContainer from './containers/OrderContainer/OrderContainer'; 
import Auth from './containers/Auth/Auth'; 
import Logout from './containers/Auth/Logout'; 
import * as actionCreator from './store/actions/index'; 


class App extends Component {
  componentDidMount(){
    this.props.onCheckAuthState();  
  }
  render() {
    
    return (
      <div>
        <BrowserRouter>
        <Layout>
        <Switch>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/orders' component={OrderContainer}/>
        <Route path='/auth' component={Auth}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/' exact component={BurgerBuilder}/>
        </Switch>       
        </Layout>   
        </BrowserRouter>
            
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState : () => dispatch(actionCreator.authCheckState()), 
  }
}

export default connect(null, mapDispatchToProps)(App);
