import React from "react";
//npm i jquery --save - install jquery and import
import $ from 'jquery'; 
import "../forms.css";

//The Billing form
class Billing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           formFields:{
                name: '',
                billingAddress: '',
                creditCardNumber: '',
                expiresOn: '',
                securityCode: '',
            }, 
                errors:{}   
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
    };
    



    // ====Formatting the credit card fields=====================================================
    //Regular expression to format the credit card field
    _handleKeyPress = (e) => {
            $('#creditCardNumber').val(this.addCommas($('#creditCardNumber').val()));
    };
     
     addCommas(x) {
        return x.replace(/,/g,'').replace(/(\d{4})/g, "$1-")
    }

    //Regular expression to format the expiration field
    _handleExpiration = (e) => {
        $('#expiresOn').val(this.addSlash($('#expiresOn').val()));
    };
 
     addSlash(x) {
        var cleaned = ('' + x).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{2})(\d{4})$/)
        if (match) {
          return   match[1] + '/ ' + match[2] 
        }
        return null
    }
    // ===========================================================================================


    //=======Validation=========================================================================

     // When any field value changed
 handleChange(event) {
    let formFields = this.state.formFields;
    formFields[event.target.name] = event.target.value;
    this.setState({
    formFields
    });
    }
    
    // To validate all form fields
    validate() {
    let formFields = this.state.formFields;
    let errors = {};
    let IsValid = true;
    
    if (!formFields["name"]) {
    IsValid = false;
    errors["name"] = "Enter Your Full Name";
    }
    
    if (!formFields["billingAddress"]) {
    IsValid = false;
    errors["billingAddress"] = "Enter Your Billing Address";
    }
    
    if (!formFields["creditCardNumber"]) {
    IsValid = false;
    errors["creditCardNumber"] = "Field cannot be blank";
    }
    
    if (!formFields["expiresOn"]) {
    IsValid = false;
    errors["expiresOn"] = "Field cannot be blank";
    }

    if (!formFields["securityCode"]) {
        IsValid = false;
        errors["securityCode"] = "Field cannot be blank";
        }
    
    this.setState({
    errors: errors
    });
    return IsValid;
    }
    
    // When user submits the form after validation
    handleSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
    let formFields = {};
    formFields["name"] = "";
    formFields["billingAddress"] = "";
    formFields["creditCardNumber"] = "";
    formFields["expiresOn"] = "";
    formFields["securityCode"] = "";
    this.setState({ formFields: formFields });
    }
    }
    // ========End of Validation==================================================================



    // =======The Form================================================================================================================================
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col m10 offset-m1 s12">
                        <h2 className="teal-text">BILLING FORM</h2>
                    <div className="row">
                       <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            {/* Credit Card Holder's Name */}
                            <div className="input-field col12">
                            <label htmlFor="name">Name</label>
                            <input className="name"
									 type="text" 
									 name="name"
									 value={this.state.formFields.name}
                                     onChange={this.handleChange} />
                                     {this.state.errors.name &&
                                     <div className="alert alert-danger">
                                     {this.state.errors.name}
                                     </div>
                                     }
                            </div>
                            <br/>
                            {/*Credit Card Holder's Billing Address */}
                            <div className="input-field col12">
                            <label htmlFor="billingAddress">Billing Address</label>
                            <input className="billingAddress"
									 type="text" 
									 name="billingAddress"
									 value={this.state.formFields.billingAddress}
                                     onChange={this.handleChange} />
                                     {this.state.errors.billingAddress &&
                                     <div className="alert alert-danger">
                                     {this.state.errors.billingAddress}
                                     </div>
                                     }
                            </div>
                            <br/>
                            {/*Credit Card Number */}
                            <div className="input-field col12">
                            <label htmlFor="creditCardNumber">Credit Card Number</label>
                            <input id="creditCardNumber" 
                                   type="text" 
                                   name="creditCardNumber"
                                   value={this.state.formFields.creditCardNumber}
                                   onChange={this.handleChange} 
                                   onBlur={this._handleKeyPress}/>
                                   {this.state.errors.creditCardNumber &&
                                   <div className="alert alert-danger">
                                   {this.state.errors.creditCardNumber}
                                   </div>
                                   }                            
                            </div>
                            <br/>
                            {/*Credit Card Expiration Date*/}
                            <div className="input-field col12">
                            <label htmlFor="expiresOn">Expires On</label>
                            <input id="expiresOn" 
                                   type="text" 
                                   name="expiresOn"
                                   value={this.state.formFields.expiresOn}
                                   onChange={this.handleChange} 
                                   onBlur={this._handleExpiration}/>
                                   {this.state.errors.expiresOn &&
                                   <div className="alert alert-danger">
                                   {this.state.errors.expiresOn}
                                   </div>
                                   }            
                            </div>
                            <br/>
                            {/*Credit Card Security Code*/}
                            <div className="input-field col12">
                            <label htmlFor="securityCode">CVC</label>
                            <input id="securityCode" 
                                   type="number"
                                   name="securityCode"
                                   value={this.state.formFields.securityCode}
                                   onChange={this.handleChange} 
                                   onBlur={this._handleExpiration}/>
                                   {this.state.errors.securityCode &&
                                   <div className="alert alert-danger">
                                   {this.state.errors.securityCode}
                                   </div>
                                   }               
                            </div>
                            <br/>
                            <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>                         
                            </div>
                       </form>
                        </div>                
                    </div>
                </div>
            </div>    
                
           
     )
    
    }
};
                                                   
// ========End of Form=============================================================================================================================================
 
export default Billing;