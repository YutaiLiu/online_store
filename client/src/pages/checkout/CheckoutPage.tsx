import { Grid2, Typography } from "@mui/material"
import OrderSummary from "../../components/OrderSummary"
import CheckoutStepper from "./CheckoutStepper"
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { useEffect, useMemo, useRef } from "react";
import { useCreatePaymentIntentMutation } from "../../api/checkoutApi"
import { useAppSelector } from "../../store/store"
import { useShoppingCart } from "../../lib/hooks/useShoppingCart"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function CheckoutPage() {
    const {shoppingCart} = useShoppingCart();
    const [createPaymentIntent, {isLoading}] = useCreatePaymentIntentMutation();
    const created = useRef(false);
    const isDarkMode = useAppSelector(state => state.ui.isDarkMode)
    
    useEffect(() => {
        if (!created.current) createPaymentIntent();
        created.current = true;
    }, [createPaymentIntent])

    const options: StripeElementsOptions | undefined = useMemo(() => {
        if (!shoppingCart?.clientSecret) return undefined
        return {
            clientSecret: shoppingCart.clientSecret,
            appearance: {
                labels: 'floating',
                theme: isDarkMode ? 'night' : 'stripe'
            }
        }
    }, [shoppingCart?.clientSecret, isDarkMode]);

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