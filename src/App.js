import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'; 
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'; 
import {BrowserRouter, Route, Switch, NavLink, Redirect} from 'react-router-dom';


class App extends Component {
  render() {
    
    return (
      <div>
        <BrowserRouter>
        <Layout>
        <Switch>
        <Route path='/burger' component={BurgerBuilder}/>
        <Route path='/checkout' component={Checkout}/>
        <Redirect from='/' to='/burger'/>
        <Route render={() => (<h1>Page not found</h1>)}/>
        </Switch>       
        </Layout>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
