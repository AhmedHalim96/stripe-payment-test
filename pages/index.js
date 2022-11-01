import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import useApi from "../hooks/useApi";
import StripeProvider from "../components/StripeProvider";
import StripeCheckoutForm from "../components/StripeCheckoutForm";
import endpoints from "../api/endpoints";

export default function Home() {
	const [clientSecret, setClientSecret] = useState();
	const { data, fetch, loading } = useApi();
	const getClientSecret = () => {
		// sending to checkout with a static order
		setClientSecret(null);
		fetch(
			{
				url: endpoints.checkout,
				data: {
					email: "test@test.com",
					order: {
						sale_order_line: [
							{
								qty: 1,
								is_subscription: false,
								product: 10,
							},
						],
					},
				},
				method: "POST",
			},
			(error, res) => {
				if (error) return console.log(error.response.data);
				console.log(res.data.client_secret);
				setClientSecret(res.data.client_secret);
			}
		);
	};
	return (
		<div className={styles.container}>
			<Head>
				<title> Stripe Payment Element Test</title>
			</Head>

			<main className={styles.main}>
				<button className="btn" onClick={getClientSecret}>
					Show payment element
				</button>

				{loading && <span>loading ...</span>}
				{clientSecret && (
					<StripeProvider clientSecret={clientSecret}>
						<StripeCheckoutForm clientSecret={clientSecret} />
					</StripeProvider>
				)}
			</main>
		</div>
	);
}
