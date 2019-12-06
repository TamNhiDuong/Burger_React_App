import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'; 
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'; 
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import OrderContainer from './containers/OrderContainer/OrderContainer'; 
import Auth from './containers/Auth/Auth'; 
import Logout from './containers/Auth/Logout'; 


class App extends Component {
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

export default App;
