
import React, { Component } from 'react';
import NavigationTabs from "./components/NavigationTabs";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./components/Nav/Home";
import About from "./components/Nav/About";
import Snacks from "./components/StoreFront/ShoppingViewStorefront/Snacks";
import Cart from "./components/Nav/Cart";
import ProductList from "./components/ProductList";
import globdata from "./components/globdata";

// class App extends Component {
//   render() {
//     return (

const App = () => {
    return (
       <div className = "container">  {/* <removed container class because formatting was way too narrow */}
            <div className="row">
                <div className="col-md-12">
                    <h1>Welcome to Snacks-2-Go</h1>
                </div>
            </div>
            {/* <div className="row"> */}
                {/* <div className="col-md-8">
                    <ProductList />
                </div> */}
                {/* <div className="col-md-4">
                    <Cart />
                </div> */}
            {/* </div> */}

            {/* <footer>
                <small>
                &copy; The Snackers 2018
                </small>
            </footer> */}


        {/* <ConditionalRenderer /> */}

        <Router>
            <div>
            <NavigationTabs/>
                <div className="switch">
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} /> 
                <Route exact path="/snacks" component={Snacks} />
                <Route exact path="/cart" component={Cart} />
                </div>
            </div>
        </Router>

   
          {/* <h1 className="App-title">Snacks-2-Go</h1>  
        </header>
        <p className="App-intro"> */}
        

        {/* </p> */}
      </div>
    );
  }


export default App;
