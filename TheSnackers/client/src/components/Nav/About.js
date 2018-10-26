import React from "react";
import Login from "../Login/Login.js";
import Signup from "../Login/Signup.js";
import "../../materialize.css";

const About = () => (
<div>
  <div className="jumbotron">
    <h3>All About Our Company</h3>
    <p>All About Snacks...</p>
    {/* <p><a className="btn btn-primary btn-lg" href="#" role="button">Go to Snacks</a></p> */}
  </div>

  
<div className="row">
  <div className="col s6">
    <Login />
  </div>

  <div className="col s6">
    <Signup />
  </div>
</div>
  

  

</div>

);

export default About;