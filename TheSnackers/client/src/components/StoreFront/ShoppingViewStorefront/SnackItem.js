import React from "react"


const SnackItem = (props) => (
    <div>
        <h4 className="page-header">{props.name}</h4>
        <ul>
           
           <li>Price : {props.price}</li>
           <li><img width="200px" height="auto" src={"./assets/images/" + props.image}></img></li>
           <li>Quantity : <input type="number" defaultValue="1" /></li>
           <li><button id={props.id} onClick = {() => { props.addToCartFunc(props.id); } }>Add to Cart</button></li>
        </ul>
    </div>

);

export default SnackItem;