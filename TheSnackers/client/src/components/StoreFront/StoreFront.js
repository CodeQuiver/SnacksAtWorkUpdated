import React from "react";
import Checkout from "./Checkout/Checkout.js";
import "../../materialize.css";

class StoreFront extends React.Component {
    render() {
        return (
            <div className = "StoreFront">
                <Checkout />
            </div>
        );
    }

}

export default StoreFront;