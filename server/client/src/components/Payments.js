import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="EMAILER"
        description="Add 5 email credits for $5"
        amount={500} // $5 --> cents
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn" id="PaymentButton">
          ADD CREDITS
        </button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
