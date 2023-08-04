import {
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import PropTypes from 'prop-types';
import { useState } from "react";
import CustomButton from "./CustomButton"
import { toast } from "react-hot-toast";

const StripePayment = (props) => {
    const { id, payOrder } = props
    const [isProcessing, setIsProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const handleStripePayment = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsProcessing(true);


        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
            },
            redirect: 'if_required'
        });
         if (result.error) {
            toast.error(result.error.message);
        }
        else if (result.paymentIntent.status === "succeeded") {
            const details = {
                id: result.paymentIntent.id,
                status: result.paymentIntent.status,
                type: "Credit Card",
            };
             await payOrder(id, details);
        }

    setIsProcessing(false);

}
return (
    <form onSubmit={handleStripePayment} style={{ width: '100%' }} >
        <PaymentElement />
        <CustomButton
            style={{ marginTop: '20px' }}
            disabled={isProcessing || !stripe || !elements}
            type="submit"
            size="large"
            fullWidth>
            {isProcessing ? "Processing ... " : "Pay now"}
        </CustomButton>
    </form>
);
};
StripePayment.propTypes = {
    id: PropTypes.string.isRequired,
    payOrder: PropTypes.func.isRequired
}

export default StripePayment;



