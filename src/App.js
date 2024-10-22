import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom'
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (//Using custom Layout
      <Layout>        
        <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path= "/checkout" component= {Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route render={()=><h1>PAGE NOT FOUND</h1>}/>
        </Switch>
      </Layout>
    )
  }
}

export default App;
