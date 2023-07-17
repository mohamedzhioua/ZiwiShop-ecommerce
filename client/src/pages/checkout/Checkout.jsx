import { useSelector } from "react-redux";
import { Box,  Stepper, Step, StepLabel } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
 import Payment from "../../components/checkout/Payment";
import { checkoutInitialValues, checkoutSchema } from "../../components/checkout/CheckoutFormValidation";
import CustomButton from "../../components/ui/CustomButton";
import Billing from "../../components/checkout/Billing";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51LgU7yConHioZHhlAcZdfDAnV9643a7N1CMpxlKtzI1AUWLsRyrord79GYzZQ6m8RzVnVQaHsgbvN1qSpiDegoPi006QkO0Mlc"
// );

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const cart = useSelector((state) => state.cart.cart);
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;

    const handleFormSubmit = async (values, actions) => {
        setActiveStep(activeStep + 1);
        // if (isSecondStep) {
        //   makePayment(values);
        // }

        actions.setTouched({});
    };

    //   async function makePayment(values) {
    //     const stripe = await stripePromise;
    //     const requestBody = {
    //       userName: [values.firstName, values.lastName].join(" "),
    //       email: values.email,
    //       products: cart.map(({ id, count }) => ({
    //         id,
    //         count,
    //       })),
    //     };

    //     const response = await fetch("http://localhost:2000/api/orders", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(requestBody),
    //     });
    //     const session = await response.json();
    //     await stripe.redirectToCheckout({
    //       sessionId: session.id,
    //     });
    //   }
    const formik = useFormik({
        onSubmit: handleFormSubmit,
        initialValues: checkoutInitialValues,
        validationSchema: checkoutSchema[activeStep]
    });

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
     } = formik;

    return (
        <Box width="80%" m="100px auto">
            <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
                <Step>
                    <StepLabel>Billing</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Payment</StepLabel>
                </Step>
            </Stepper>
            <Box>

                <form onSubmit={handleSubmit} noValidate>
                    {isFirstStep && (
                        <Billing
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                         />
                    )}
                    {isSecondStep && (
                        <Payment
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                         />
                    )}
                    <Box display="flex" justifyContent="space-between" gap="50px">
                        {!isFirstStep && (
                            <CustomButton
                                fullWidth
                                color="primary"
                                variant="contained"
                                sx={{
                                    boxShadow: "none",
                                    color: "white",
                                    borderRadius: 0,
                                    padding: "15px 40px",
                                }}
                                onClick={() => setActiveStep(activeStep - 1)}
                            >
                                Back
                            </CustomButton>
                        )}
                        <CustomButton
                            fullWidth
                            type="submit"
                            color="primary"
                            variant="contained"
                            sx={{
                                boxShadow: "none",
                                 borderRadius: 0,
                                padding: "15px 40px",
                                
                            }}
                        >
                            {!isSecondStep ? "Next" : "Place Order"}
                        </CustomButton>
                    </Box>
                </form>

            </Box>
        </Box>
    );
};



export default Checkout;
