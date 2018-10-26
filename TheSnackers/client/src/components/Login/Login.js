
 import React from "react"
 import "../forms.css";
 import "../../materialize.css";


	 const formValid = ({ formErrors, ...rest }) => {
    	let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };
	
		

 	//login
	class Login extends React.Component {

		constructor(props) {
		//Call the parent by passing in the super
 		super(props);
		this.state = {
 			email: "",
			 password: "",
			 formErrors: {
				 email: "",
				 password: ""
			 },
			
		 };	
		}
		 
    	//=======VALIDATION======================================================================    
        
	 	handleSubmit = (event, validationCallBack) =>{
			 //Prevents form from submitting by itself
			 event.preventDefault();
             let formErrors = this.state.formErrors;
            //  let formValid = this.formValid;
			 if (validationCallBack(formErrors)){
				 console.log(
					"Email" +this.state.email + "Password" + this.state.password
				 )
			 }else {
				 console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
			 }
         };
         
		 handleChange = (event) =>{
			 event.preventDefault();
			 //Regular expression for the correct format of an email
			 const emailRegex = RegExp(
				/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
			  );	
			 const { name, value } = event.target;
			 let formErrors = this.state.formErrors;

			switch (name) {
			//If Regex equals true, it should pass. Otherwise it will give an error message
			case "email":
			 formErrors.email = emailRegex.test(value)
			   ? ""
			   : "Invalid email address";
			 break;
		   	case "password":
			 formErrors.password =
			   value.length < 6 ? "minimum 6 characaters required" : "";
			 break;
		   default:
			 break;
			 }

			 this.setState({ formErrors, [name]: value }, () => console.log(this.state));
		 };
		 
		 //======VALIDATION==================================================================================
	 

		//========FORM=======================================================================================
 		render() {
			const { formErrors } = this.state;

 		return  (
 			<div id="login" className="col s12">
 				<form onSubmit={() => this.handleSubmit(this.formValid)} noValidate>
 					<div className="form-container">
 						<h3 className="teal-text">LOGIN</h3>
 						<div className="row"> 
						 	{/* Enter in E-mail */}
 							<div className="input-field col s12">
							 <label htmlFor="email">E-mail</label>
							  <input className={formErrors.email.length > 0 ? "error" : null} 
									 type="email" 
									 name="email"
									 noValidate
									 onChange={this.handleChange}
 							/>
							 {formErrors.email.length > 0 && (
               				 <span className="errorMessage">{formErrors.email}</span>
             				 )}
							</div>
 						<br/>
 						<br/>
						 	{/* Enter in the Password */}
							<div className="input-field col s12">
							 <label htmlFor="password">Password</label>
							 <input  className={formErrors.password.length > 0 ? "error" : null} 
									 type="password" 
									 name="password"
									 noValidate
									 onChange={this.handleChange}
 							/>
							 {formErrors.password.length > 0 && (
               				 <span className="errorMessage">{formErrors.password}</span>
              				 )}
							</div>
 						<br/>
 						<br/>
                         <button className="btn waves-effect waves-light" type="submit" name="action">Sign In</button>
						 <br/>
						 <br/>
						 <button className="btn waves-effect waves-light" type="submit" name="action">Sign Up</button>

						</div>
					</div>
 				</form>
			 </div>		
 		);
	 };	 
	}
 


 //=========FORM===============================================================================================================

 export default Login;






