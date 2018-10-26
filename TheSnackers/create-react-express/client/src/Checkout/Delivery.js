import React from "react";
import "../forms.css";
import $ from 'jquery'; 




 class Delivery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                address: '',
                phone: '',
                deliveryNotes: '',
                deliveryTime: ''
            }
        }
    };

    _handleKeyPress = (e) => {
        console.log()
        $('#phone').val(this.formatPhoneNumber($('#phone').val()));
    };
 
 

     formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
      }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col m10 offset-m1 s12">
                        <h2 className="teal-text">DELIVERY FORM</h2>
                    <div className="row">
                       <form className="col s12">
                        <div className="row">
                            <div className="input-field col12">
                            {/* Customer's Name */}
                            <input id="name" type="text" className="validate"/>
                            <label htmlFor="name">Name</label>
                            </div>
                            <br/>
                            {/*Customer's Address */}
                            <div className="input-field col12">
                            <input id="address" type="text" className="validate"/>
                            <label htmlFor="address">Address</label>
                            </div>
                            <br/>
                            {/*Customer's Phone */}
                            <div className="input-field col12">
                            <input id="phone" type="text" className="validate" onBlur={this._handleKeyPress} />
                            <label htmlFor="phone">Phone</label>
                            </div>
                            <br/>
                            {/*Delivery Notes*/}
                            <div className="input-block textarea">
                            <label htmlFor="">Delivery Notes</label>
                            <textarea rows="3" type="text" className="form-control"></textarea>
                            </div>
                            <br/>
                            {/*Delivery Time - Need to create to radio nuttons for choice 1=ASAP AND CHOICE2 = time input field*/}
                            <div className="input-field col12">
                            <label htmlFor="time">Current Time</label>
	                        <input id="time" type="text" className="timepicker"/>   
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

 
export default Delivery;