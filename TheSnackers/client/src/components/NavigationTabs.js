import React from "react";
import { Link} from "react-router-dom";

const NavigationTabs = () => (
    <ul className="nav nav-tabs">
        <li className="nav-item">
            <Link to="/" className="nav-link active">Home</Link>
        </li>
        <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
        </li>
        <li className="nav-item">
            <Link to ="/snacks" className="nav-link">Snacks</Link>
        </li>
        <li className="nav-item">
            <Link to ="/cart" className="nav-link">Cart</Link>
        </li>




    </ul>

)








/* const NavigationTabs = props => ( */
      
//         <ul className="nav nav-tabs">
//             <li className="nav-item">
//             <a className="nav-link active" onClick={() => props.handlePageChange("Home")} >Home </a>
//             </li>
//             <li className="nav-item"> 
//             <a  className="nav-link" onClick={() => props.handlePageChange("About")} >About </a></li>
//             <li  className="nav-item"> <a  className="nav-link" onClick={() => props.handlePageChange("Project")} >Project </a>
//             </li>
//         </ul>

// );

export default NavigationTabs;