import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, withRouter, Redirect} from 'react-router-dom';
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
    let routers = (
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    )
    if(this.props.isAuthenticated) {
      routers = (
        <Switch>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/orders' component={OrderContainer}/>
        <Route path='/auth' component={Auth}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
        </Switch>
      )
    }
   
    return (
      <div>
        <BrowserRouter>
        <Layout>
          {routers}    
        </Layout>   
        </BrowserRouter>
            
      </div>
    );
  }
}
//Protect authenticated route '/order'
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null, 
  }

}
const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState : () => dispatch(actionCreator.authCheckState()), 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
