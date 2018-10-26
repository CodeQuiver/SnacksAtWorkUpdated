import React from "react";
import "../../../materialize.css";
import ShoppingCart from "./ShoppingCart/ShoppingCart.js";
import Delivery from "./Delivery/Delivery.js";
import Billing from "./Billing/Billing.js";

/*FILE DESCRIPTION
This file contains the Checkout module.
Checkout will:
    1) render the entire order checkout page:
        a. skeleton for page such as section dividers, page title, Submit button
        b. ShoppingCart module
        c. Delivery module
        d. Billing module

    2) manage behavior for
        a. order submission (everything that happens when "Submit Order" is clicked)
        b. "go to checkout" button- everything below the ShoppingCart module will be hidden until this button clicked.
            - also will need button to cancel checkout and return to shopping cart view

    3) track all data from the sub-modules in its state to be sent upon order submission
        - for now these are being coded stand-alone, but will update to have them managed at this level later
    
    //this or a higher-level module will add any item from the storefront to the state.cartItems array when "add to cart" is clicked

*/

class Checkout extends React.Component {
    render() {
        return (
            <div className = "Checkout">
                <ShoppingCart  />
                {/* TODO- add Delivery form component here */}
                <Delivery />
                {/* TODO- add Billing form component here */}
                <Billing />
            </div>
        );
    }

}

export default Checkout;