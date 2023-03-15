import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { savePaymentQuery, getPaymentQuery } from "../../database/payment.js";
import { getTokenDetails } from "../../helpers/jwt.js";

export const createStripePayment = async () => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'usd',
      amount: 1000
    });

    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      message: "Stripe success",
      data: {
        clientSecret: paymentIntent.client_secret
      }
    }
  } catch(err) {
    console.log("error", err)
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      message: "Stripe error",
      data: err.message
    }
  }
}

export const savePayment = async (httpRequest) => {
  try {
    // get user info from token
    const tokenDetails = getTokenDetails(httpRequest.headers.authorization);
    
    const res = await savePaymentQuery({
      userId: tokenDetails.userId,
      email: tokenDetails.email,
      ...httpRequest.body
    });

    if(res) {
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        message: "User paid successfully.",
        data: {}
      }
    }
  } catch(err) {
    console.log("save payment error", err)
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      message: "Stripe error",
      data: err.message
    }
  }
}

export const getPaymentDetails = async (httpRequest) => {
  try {
    // get user info from token
    const tokenDetails = getTokenDetails(httpRequest?.headers?.authorization);
    
    const res = await getPaymentQuery({
      userId: tokenDetails.userId,
    });

    if(res) {
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        success: true,
        message: "Payment fetched successfully.",
        data: res
      }
    }
  } catch(err) {
    console.log("save payment error", err)
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      message: "Get payment error",
      data: err.message
    }
  }
}