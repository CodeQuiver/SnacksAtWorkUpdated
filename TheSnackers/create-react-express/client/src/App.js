import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
//pulls the login component from the login
// import  Login from "./Login/Login.js";
// import Delivery from "./Checkout/Delivery.js";
import Billing from "./Checkout/Billing.js";


class App extends Component {
  render() {
    return (
        <div className="App">
        {/* <div className="App-header"> */}
          {/* <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/*Tells to display login component here */}
        {/* <div><Login /> </div> */}
        <div><Billing /></div>

        {/* <div><Delivery /></div> */}
       {/* </div> */}
       </div>
    );
  }
}

export default App;
