import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";

let stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

const StripeProvider = ({ children, clientSecret }) => {
	return (
		<Elements stripe={stripe} options={clientSecret ? { clientSecret } : {}}>
			{children}
		</Elements>
	);
};

export default StripeProvider;
