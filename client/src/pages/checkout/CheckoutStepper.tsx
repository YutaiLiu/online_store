import { Box, Button, Checkbox, FormControlLabel, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Review from "./Review";
import { useFetchAddressQuery, useUpdateAddressMutation } from "../../api/accountApi";
import { ConfirmationToken, StripeAddressElementChangeEvent, StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { useShoppingCart } from "../../lib/hooks/useShoppingCart";
import { useNavigate } from "react-router";
import { useCreateOrderMutation } from "../../api/orderApi";

const steps = ['Address', 'Payment', 'Review'];

export default function CheckoutStepper() {
    const { data, isLoading } = useFetchAddressQuery();
    const [updateAddress] = useUpdateAddressMutation();
    const [createOrder] = useCreateOrderMutation();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const {shoppingCart, clearShoppingCart} = useShoppingCart();
    const [activeStep, setActiveStep] = useState(0);
    const [saveAddressChecked, setSaveAddressChecked] = useState(false);
    const [addressComplete, setAddressComplete] = useState(false);
    const [paymentComplete, setPaymentComplete] = useState(false);
    const [confirmationToken, setConfirmationToken] = useState<ConfirmationToken | null>(null)
    const [submitting, setSubmitting] = useState(false);

    let name, address;

    if (isLoading) return <Typography variant="h6">Loading address page ...</Typography>

    if (!isLoading && data) {
        ({ name, ...address } = data)
    } else {
        name = '';
        address = undefined;
    }

    const handleNext = async () => {
        if (activeStep === 0 && saveAddressChecked && elements) {
            const address = await getStripeAddress();
            if (address) await updateAddress(address);
            setSaveAddressChecked(false);
        }
        if (activeStep === 1) {
            if (!elements || !stripe) return;
            const result = await elements.submit();
            if (result.error) return toast.error(`Failed to submit payment info: ${result.error.message}`);

            const stripeResult = await stripe.createConfirmationToken({elements});
            if (stripeResult.error) return toast.error(`Failed to receive payment confirmation token: ${stripeResult.error.message}`);
            setConfirmationToken(stripeResult.confirmationToken);
        }
        setActiveStep(step => step + 1);
    }

    const getStripeAddress = async () => {
        const addressElement = elements?.getElement('address');
        if (!addressElement) return null;
        const { value: { name, address } } = await addressElement.getValue();
        if (name && address) return { ...address, name };
        return null;
    }

    const handleBack = () => {
        setActiveStep(step => step - 1);
    }

    const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
        setAddressComplete(event.complete);
    }

    const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
        setPaymentComplete(event.complete)
    }

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            if (!confirmationToken || !shoppingCart?.clientSecret) throw new Error('Unable to process your payment');
            
            const orderModel = await createOrderModel();
            const orderResult = await createOrder(orderModel);

            const paymentResult = await stripe?.confirmPayment({
                clientSecret: shoppingCart.clientSecret,
                redirect: 'if_required',
                confirmParams: {
                    confirmation_token: confirmationToken.id
                }
            });

            if (paymentResult?.paymentIntent?.status === 'succeeded') {
                navigate('/checkout/success', {state: orderResult});
                clearShoppingCart();
            } else if (paymentResult?.error) {
                throw new Error('Found error in Stripe payment processing');
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
            setActiveStep(1);
        } finally {
            setSubmitting(false);
        }
    }

    const createOrderModel = async () => {
        const shippingAddress = await getStripeAddress();
        const paymentSummary = confirmationToken?.payment_method_preview.card;
        if (!shippingAddress || !paymentSummary) throw new Error('Failed to create order');
        return {shippingAddress, paymentSummary};
    }

    return (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    return (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <Box sx={{ mt: 2 }}>
                <Box sx={{ display: activeStep === 0 ? 'block' : 'none' }}>
                    <AddressElement
                        options={{
                            mode: 'shipping',
                            defaultValues: {
                                name: name,
                                address: address,
                            }
                        }}
                        onChange={handleAddressChange}
                    />
                    <FormControlLabel
                        sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}
                        control={<Checkbox
                            checked={saveAddressChecked}
                            onChange={e => setSaveAddressChecked(e.target.checked)}
                        />}
                        label='Save as default address'
                    />
                </Box>
                <Box sx={{ display: activeStep === 1 ? 'block' : 'none' }}>
                    <PaymentElement onChange={handlePaymentChange} />
                </Box>
                <Box sx={{ display: activeStep === 2 ? 'block' : 'none' }}>
                    <Review confirmationToken={confirmationToken} />
                </Box>
            </Box>
            <Box display='flex' paddingTop={2} justifyContent='space-between'>
                <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                <Button
                    onClick={activeStep === 2 ? handleSubmit : handleNext}
                    disabled={
                        (activeStep === 0 && !addressComplete) ||
                        (activeStep === 1 && !paymentComplete) ||
                        (activeStep === 2 && submitting)
                    }
                    loading={submitting}
                >
                    {activeStep === 2 ? 'Submit Order' : 'Next'}
                </Button>
            </Box>
        </Paper>
    )
}