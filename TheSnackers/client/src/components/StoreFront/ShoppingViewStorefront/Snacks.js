import React, {Component} from "react"
import SnackItem from "./SnackItem";
import API from "../../../utils/API";
import snacks from "../../../snacks.json";
import globdata from "../../globdata";


class Snacks extends Component {
    state = {
      snacks
    };
  
    componentDidMount() {
      //this.loadSnacks();
    }
  
    loadSnacks = () => {
      API.getProducts()
        .then(res => this.setState({ products: res.data }))
        .catch(err => console.log(err));
    };

    addToCart(id) {
      console.log("Snacks.addToCart: added to cart " + id.toString());
      globdata.cartItems.push({id: id});
    }

    render() {
      return (
        <div>
          {this.state.snacks.map(product => (

            <SnackItem addToCartFunc={this.addToCart} quantity={product.quantity} key={product.id} id={product.id} image={product.image} price={product.price} name={product.name} />

          ) )};
                 
       </div>
      );
    }
  }


export default Snacks;