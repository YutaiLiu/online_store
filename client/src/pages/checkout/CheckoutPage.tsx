import { Grid2, Typography } from "@mui/material"
import OrderSummary from "../../components/OrderSummary"
import CheckoutStepper from "./CheckoutStepper"
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { useFetchShoppingCartQuery } from "../../api/shoppingCartApi";
import { useEffect, useMemo, useRef } from "react";
import { useCreatePaymentIntentMutation } from "../../api/checkoutApi"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function CheckoutPage() {
    const { data: shoppingCart } = useFetchShoppingCartQuery();
    const [createPaymentIntent, {isLoading}] = useCreatePaymentIntentMutation();
    const created = useRef(false);
    
    useEffect(() => {
        if (!created.current) createPaymentIntent();
        created.current = true;
    }, [createPaymentIntent])

    const options: StripeElementsOptions | undefined = useMemo(() => {
        if (!shoppingCart?.clientSecret) return undefined
        return {
            clientSecret: shoppingCart.clientSecret
        }
    }, [shoppingCart?.clientSecret]);

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={8}>
                {(!stripePromise || !options || isLoading) ? (
                    <Typography variant="h6">Loading checkout page ...</Typography>
                ) : (
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutStepper />
                    </Elements>
                )}
            </Grid2>
            <Grid2 size={4}>
                <OrderSummary />
            </Grid2>
        </Grid2>
    )
}