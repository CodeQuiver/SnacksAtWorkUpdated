import React from "react";
import "./ShoppingCart.css";
import "../../../../utils/API";
import "../../../../materialize.css";
import globdata from "../../../globdata";
import API from "../../../../utils/API";
import snacks from "../../../../snacks.json"

/*FILE DESCRIPTION
This file contains the Shopping Cart module.
Shopping cart will be the top section of the Checkout page.

Shopping Cart will receive the list of item ids and quantities selected from the Storefront/Checkout as a prop.
    e.g. <ShoppingCart items={ordered:[
        {id: 12345, quantity: 1},
        {id: 75234, quantity: 5},
        {id: 99876, quantity: 3},
        {id: 22333, quantity: 2},
        {id: 08087, quantity: 2}
    ]} />

Features:
    1) get item details by id from database & display each SnackItem
        a. allow user to remove item from cart
        b. allow user to update quantity

    2) calculate
        a. item total cost (quantity * unit price)- DONE, stores in state
        b. subtotal of all cart items
        c. final order total (adding tax, no delivery fee)

    3) store in state (for now)
        a. array of items in cart, including: id, name, quantity
        b. order subtotal
        c. final order total

TODO- once this module is complete, modify so Checkout page will manage the state of the order (lift cart's state up)

TODO- research sessions so cart data persists

*/


function RenderASnack(item1) {
    console.log("RenderASnack - Begin");
    var item = item1.value;
    return (<SnackItem name={item.name}
    image={item.image} 
    quantity={item.quantity}
    unitPrice={item.unitPrice} 
    calcPrice={item.calcPrice} 
    id={item.id} key={ "SnackItem_" + item.id.toString()} />);
};


//SnackItem 
//single line entry component
class SnackItem extends React.Component {

    render() {
      return (
        <tr className="SnackItem row">
            <td className="col s5">
                <div className="row">
                    <div className="col" width="auto">
                        <img className="responsive-img" src={"./assets/images/" + this.props.image} alt={this.props.name} />
                    </div>

                    <div className="col">
                        {this.props.name}
                    </div>
                </div>
                
                
            </td>
            <td className="col s2">
                <input type="number" name="itemCount" defaultValue={this.props.quantity} />
            </td>
            <td className="col s2"> 
                ${this.props.unitPrice.toFixed(2)}
            </td>
            <td className="col s2 bold"> 
                ${this.props.calcPrice.toFixed(2)}
                {/* toFixed forces display as string with 2 decimal places, ensuring the $0.00 format */}
            </td>
            <td className="col s1">
                {/* TODO- make this button remove the entry from display and from state */}
                <button>X</button>
            </td>
        </tr>
      );
    }
  }
//END SnackItem 


//Shopping Cart
//assembled component, contains multiple line entries, imports array of selected items as state
class ShoppingCart extends React.Component {
    
    formatSnackData(rawSnackInfo){
        /*
        Raw snack info looks like this (from snacks.json):
        {
            "id": 2,
            "name": "Donuts",
            "price": 6.99,
            "currency": "USD",
            "image": "donuts.jpg",
            "quantity": 6 //in stock
        },
        We want it to look like this:
        {
            id: new_id, 
            name: "Chocolate Strawberries",
            image: "choc.jpg",
            quantity: 1 // assume, customer only wants one of anything until we fix form
            unitPrice: 4.50,
            calcPrice: null
        }
        */
        let formattedSnackInfo = {id: rawSnackInfo.id, name: rawSnackInfo.name, image: rawSnackInfo.image,
            quantity: 1, calcPrice: null, unitPrice: rawSnackInfo.price};
        return formattedSnackInfo;
    }

    findSnackById(id) {
        for (let i = 0; i < snacks.length; i++) {
            if (snacks[i].id == id) {
                return this.formatSnackData(snacks[i]);
            }
        }
        console.log("ShoppingCart.findSnackById: Unable to find information for item with id " + id.toString());
        return null;
    }

    //constructor builds state, state includes list of selected items from database
    constructor(props) {
        super(props);
        console.log("ShoppingCart.constructor: this is my data: " + JSON.stringify(globdata));
        this.state = {
            cartItems: [],
            /*
            cartItemsOld:[
                {   
                    id: 9,
                    name: "Chocolate Strawberries",
                    image: "choc.jpg",
                    quantity: 2,
                    unitPrice: 2.50,
                    calcPrice: null
                },
                {
                    id: 9,
                    name: "Chocolate Strawberries",
                    image: "choc.jpg",
                    quantity: 3,
                    unitPrice: 4.00,
                    calcPrice: null
                },
                {
                    id: 9,
                    name: "Chocolate Strawberries",
                    image: "choc.jpg",
                    quantity: 1,
                    unitPrice: 3.25,
                    calcPrice: null
                },
                {
                    id: 9,
                    name: "Chocolate Strawberries",
                    image: "choc.jpg",
                    quantity: 5,
                    unitPrice: 4.50,
                    calcPrice: null
                }
            
            ],
            */
            
            //calculated cart subtotal and total after tax, both initialized as 0
            subtotalPrice: 0,
            finalTotalPrice: 0
        }

        // populate state from global cart data
        for (let i = 0; i < globdata.cartItems.length; i++) {
            const new_id = globdata.cartItems[i].id;
            // query api for the rest of the data of the id
            //let productData = API.getProduct(new_id);
            //alert("Product Data: " + JSON.stringify(productData) );
            let newSnackData = this.findSnackById(new_id);
            if (null == newSnackData) {
                continue;
            }
            // then add to this.state.cartItems
            this.state.cartItems.push(newSnackData);
        }
        
        // LINE PRICE (calcPrice) calculation
        //calculate and store total price (calcPrice) for each item in state
        for (let i = 0; i < this.state.cartItems.length; i++) {
            const item = this.state.cartItems[i];
            item.calcPrice = this.calcPriceHandler(item.unitPrice, item.quantity);
        }
        // END LINE PRICE (calcPrice) calculation

        // SUBTOTAL Calculation
        let newSubTotal = this.state.cartItems.reduce(
            function (accumulator, item) {
                // convert decimals to integers (*100) to avoid imprecise float calculations
                let localPrice = item.calcPrice * 100;
                // add to accumulator
                let localTotalPrice = accumulator + localPrice;

                return localTotalPrice;
            }, 0);
            // console.log("newSubTotal: " + newSubTotal);

        this.state.subtotalPrice = newSubTotal / 100; //convert total back to decimals by dividing again by 100 before updating state value

            // console.log("new subtotal state value: " + this.state.subtotalPrice);
        // END SUBTOTAL Calculation

        //TOTAL ORDER PRICE Calculation
        this.state.finalTotalPrice = this.state.subtotalPrice + (this.TAX_PERCENT * this.state.subtotalPrice); //version not trying to avoid floats- gave up as it introduced too many new errors

        // convert each value to an integer, then divide by 1,000 as equivalent to dividing by 100 twice
            // this returns the original values to correct decimals and also divides the final value by 100 to finish the percentage calculation
        // console.log("Subtotal before tax: " + this.state.subtotalPrice);        
        
        // let taxCalcVar = (TAX_PERCENT * (this.state.subtotalPrice * 100) ) / 100;
        // taxCalcVar = (this.state.subtotalPrice * 100) + (taxCalcVar * 100);
        // taxCalcVar = taxCalcVar / 100;
        // this.state.finalTotalPrice = taxCalcVar;

        // console.log("Total with tax: " + taxCalcVar);
        

        // END TOTAL ORDER PRICE Calculation

    }
    //END constructor

    TAX_PERCENT = 0.06; //constant value TAX_PERCENT holds sales tax rate as an integer for use in later calculations
    //Using Sales tax for northern Virginia area of 6%, our hypothetical business is located here


    //calcPriceHandler helper function - gives quantity * price result for each line 
    calcPriceHandler = (localPrice, localQuant) => {
        let localTotalPrice;
        // convert decimals to integers (*100) to avoid imprecise float calculations
        localPrice = localPrice * 100;
        // multiply unit price by quantity
        localTotalPrice = localPrice * localQuant;
        // convert back to decimals (/100)
        localTotalPrice = localTotalPrice / 100;
        return localTotalPrice;
    }
    //END calcPriceHandler helper function



    // RENDER LINE ITEM
    // function to render the listing for each snack being ordered
    // renderItem = (array, i) => {

    //     // return <SnackItem 
    //     // name={array[i].name}
    //     // image={array[i].image} 
    //     // quantity={array[i].quantity}
    //     // unitPrice={array[i].unitPrice} 
    //     // calcPrice={array[i].calcPrice} 
    //     // id={array[i].id} key={i}
    //     // />;
    // }
    // END RENDER LINE ITEM


    renderOneSnackItem = (item) => {
        console.log("renderOneSnackItem " + item.toString());
        return (<SnackItem name={item.name}
        image={item.image} 
        quantity={item.quantity}
        unitPrice={item.unitPrice} 
        calcPrice={item.calcPrice} 
        id={item.id} key={item.id.toString()} />);
    }

    //RENDER ALL ITEMS
    renderAllItems = () => {
        const listItems = this.state.cartItems.map( (item) => 
                <RenderASnack key={item.id.toString()} value={item}/>
        );
        console.log("renderAllItems: hello again");
        console.log("renderAllItems: " + listItems.length);
        if (listItems.length == 0) { 
            return (<tr><td></td></tr>);
        }
        //return this.renderOneSnackItem(this.state.cartItems[0]);
        return (<tr>{listItems}></tr>);
    }


    //RENDER ALL ITEMS
    /*renderAllItems = () => {
        for (let i = 0; i < this.state.cartItems.length; i++) {
            console.log("ShoppingCart.renderAllItems " + i.toString());
            const item = this.state.cartItems[i];
            return <SnackItem name={item.name}
            image={item.image} 
            quantity={item.quantity}
            unitPrice={item.unitPrice} 
            calcPrice={item.calcPrice} 
            id={item.id} key={i} />
        }
    }*/
    //END RENDER ALL ITEMS


    // MAIN ShoppingCart RENDER SECTION
    render() {
        return (
    
            <div className="ShoppingCart">
                <h3 className="page-header">Your Order:</h3>
                <table className="highlight">
                    <tbody>
                        <tr className="row">
                            <th className="col s5 cart-header">
                                Snack
                            </th>
                            <th className="col s2 cart-header">
                                Quantity
                            </th>
                            <th className="col s2 cart-header">
                                x Price for Each =
                            </th>
                            <th className="col s2 cart-header">
                                Total
                            </th>
                            <th className="col s1 cart-header">
                                {/* blank because above cart remove button column */}
                            </th>
                        </tr>
                    
                        {/* Each row will be a "dumb component" item listing, receiving props from ShoppingCart */}
                        {/* TODO- update this section to map/loop through all items in the cart array instead of being hard-coded with the indexes */}

                        {/* {this.renderItem(0)}
                        {this.renderItem(1)}
                        {this.renderItem(2)}
                        {this.renderItem(3)} */}
                        {this.renderAllItems()}

                    </tbody>

                </table>

                <div className="row">
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col">
                    Subtotal: {this.state.subtotalPrice.toFixed(2)} <br />
                        Tax: {this.TAX_PERCENT * 100}%<br />
                        Delivery: FREE!
                    </div>

                    <div className="col">
                        <h5>Total: {this.state.finalTotalPrice.toFixed(2)}</h5>
                    </div>
                </div>
            </div>
        );
    }
    // END MAIN ShoppingCart RENDER SECTION

}

export default ShoppingCart;
