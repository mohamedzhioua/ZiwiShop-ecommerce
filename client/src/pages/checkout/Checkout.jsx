import { useSelector } from "react-redux";
import {
    Box, Stepper, Step, StepLabel, Unstable_Grid2 as Grid,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { checkoutInitialValues, checkoutSchema } from "../../components/checkout/CheckoutFormValidation";
import CustomButton from "../../components/ui/CustomButton";
import Billing from "../../components/checkout/Billing";
import ContactInfo from "../../components/checkout/ContactInfo";
import PaymentMethod from "../../components/checkout/PaymentMethod";
import { CheckoutSummary } from "../../components/checkout/CheckoutSummary";

// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51LgU7yConHioZHhlAcZdfDAnV9643a7N1CMpxlKtzI1AUWLsRyrord79GYzZQ6m8RzVnVQaHsgbvN1qSpiDegoPi006QkO0Mlc"
// );

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const cart = useSelector((state) => state.cart.cart);
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;
    const isThirdStep = activeStep === 2;
    const isFourthStep = activeStep === 3;

    const handleFormSubmit = async (values, actions) => {
        if (isFirstStep) {
            localStorage.setItem("billingInfo", JSON.stringify(values));
        } else if (isSecondStep) {
            localStorage.setItem("billingInfo", JSON.stringify(values));
        }
        else if (isThirdStep) {
            localStorage.setItem("billingInfo", JSON.stringify(values));
        }
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
        initialValues: JSON.parse(localStorage.getItem("billingInfo")) || checkoutInitialValues,
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
                    <StepLabel>Contact Info</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Payment </StepLabel>
                </Step>
                <Step>
                    <StepLabel>Place Order </StepLabel>
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
                        <ContactInfo
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                        />
                    )}
                    {isThirdStep && (
                        <PaymentMethod
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                        />
                    )}
                    {isFourthStep && (
                        < CheckoutSummary />
                    )
                    }
                    <Grid container spacing={3}>
                        <Grid xs={12} md={6} >
                            {!isFirstStep && (
                                <CustomButton
                                    fullWidth
                                    color="primary"
                                    variant="contained"
                                    sx={{
                                        boxShadow: "none",
                                        borderRadius: 0,
                                        padding: "15px 40px",
                                    }}
                                    onClick={() => setActiveStep(activeStep - 1)}
                                >
                                    Back
                                </CustomButton>
                            )}
                        </Grid>
                        <Grid xs={12} md={6} >
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
                                {!isFourthStep ? "Next" : "Place Order"}
                            </CustomButton>
                        </Grid>
                    </Grid>
                </form>

            </Box>
        </Box>
    );
};



export default Checkout;
