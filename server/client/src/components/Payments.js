import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions'


class Payments extends Component {
    render () {

        // debugger;
        return (
            <StripeCheckout


                name="Emaily"
                description="Add 5 credits to your account"
                //DEFAULT USD in cents
                amount={500} //$5

                //token handler -> expects callback funcition that will be triggered 
                //when the user submits cc info and a successful authorization 
                //token has been received from the stripe api
                token={token =>{
                    this.props.handleToken(token) 
                    // console.log(token)
                }}

                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
            <button className="btn">Add Credits</button>
            </StripeCheckout>
        )
    }
}

// export default Payments
export default connect(null, actions)(Payments)