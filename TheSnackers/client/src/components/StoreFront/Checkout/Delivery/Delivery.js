import React from "react";
import "../../../forms.css";
import $ from 'jquery';

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
  
  
  class Delivery extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: null,
        address: null,
        phone: null,
        deliveryNotes: null,
        deliveryTime: null,
        formErrors: {
            name: '',
            address: '',
            phone: '',
            deliveryNotes: '',
            deliveryTime: ''
        }
      };
    }


    //=============FORMATTING===========================================================
    //Need to fix this formatting for the phone


    // _handleKeyPress = (e) => {
    // console.log()
    // $('#phone').val(this.formatPhoneNumber($('#phone').val()));
    // };



    formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
    }
    //====================================================================================


    //===VALIDATION========================================================================
    handleSubmit = e => {
      e.preventDefault();
  
      if (formValid(this.state)) {
        console.log(`
          --SUBMITTING--
          name: ${this.state.name}
          address: ${this.state.address}
          phone: ${this.state.phone}
          deliveryNotes: ${this.state.deliveryNotes}
          deliveryTime: ${this.state.deliveryTime}
        `);
      } else {
        console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      }
    };
  
    handleChange = e => {
      e.preventDefault();
      const { name, value } = e.target;
      let formErrors = { ...this.state.formErrors };
  
      switch (name) {
        case "name":
          formErrors.name =
            value.length < 3 ? "minimum 3 characaters required" : "";
          break;
        case "address":
          formErrors.address =
            value.length < 6 ? "Invalid Address" : "";
          break;
        case "phone":
          formErrors.phone =  value.length < 6 ? "minimum 10 characaters required" : "";

          break;
        case "deliveryNotes":
          formErrors.deliveryNotes =
            value.length < 6 ? "This field is required" : "";
          break;
        default:
          break;
      }
  
      this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };
    //=====================================================================================

    //=====FORM=============================================================================
    render () {
        const { formErrors } = this.state;


        return (
            <div className="container">
                <div className="row">
                    <div className="col m10 offset-m1 s12">
                        <h2 className="teal-text">DELIVERY FORM</h2>
                    <div className="row">
                       {/* <form className="col s12"> */}
                       <form onSubmit={this.handleSubmit} noValidate>
                        <div className="row">
                            <div className="input-field col12">
                            {/* Customer's Name */}
                            <label htmlFor="name">Name</label>
                            <input 
                            className={formErrors.name.length > 0 ? "error" : null}
                            type="text"
                            name="name"
                            noValidate
                            onChange={this.handleChange}
                            />
                            {formErrors.name.length > 0 && (
                            <span className="errorMessage">{formErrors.name}</span>
                            )}
                            </div>
                            <br/>
                            {/*Customer's Address */}
                            <div className="input-field col12">
                            <label htmlFor="address">Address</label>
                            <input 
                            className={formErrors.address.length > 0 ? "error" : null}
                            type="text"
                            name="address"
                            noValidate
                            onChange={this.handleChange}
                            />
                            {formErrors.address.length > 0 && (
                            <span className="errorMessage">{formErrors.address}</span>
                            )}
                            </div>
                            <br/>
                            {/*Customer's Phone */}
                            <div className="input-field col12">
                            <label htmlFor="phone">Phone</label>
                            <input 
                            className={formErrors.phone.length > 0 ? "error" : null}
                            type="text"
                            name="phone"
                            noValidate
                            onChange={this.handleChange}
                            onBlur={this._handleKeyPress}
                            />
                            {formErrors.phone.length > 0 && (
                            <span className="errorMessage">{formErrors.phone}</span>
                            )}
                            </div>
                            <br/>
                            {/*Delivery Notes*/}
                            <div className="input-block textarea">
                            <label htmlFor="">Delivery Notes</label>
                            <textarea rows="3" 
                            className={formErrors.deliveryNotes.length > 0 ? "error" : null}
                            type="text"
                            name="deliveryNotes"
                            noValidate
                            onChange={this.handleChange}
                            />
                            {formErrors.deliveryNotes.length > 0 && (
                            <span className="errorMessage">{formErrors.deliveryNotes}</span>
                            )}
                            </div>
                            <br/>
                            {/*Delivery Time*/}
                            <div className="input-field col12">
                            <h6>Time:</h6>
                            <div className="radio">
                            <p>
                            <label>
                            <input name="yourchoice" type="radio" checked />
                            <span>ASAP</span>
                            </label>
                            </p>

                            <p>
                            <label>
                            <input name="yourchoice" type="radio" />
                            <span>Select Time</span>     
                            </label>
                            </p>
                            </div>
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
//======================================================================================================================================
 
export default Delivery;