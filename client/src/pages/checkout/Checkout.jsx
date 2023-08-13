import { useSelector } from "react-redux";
import {
    Box, Stepper, Step, StepLabel, Unstable_Grid2 as Grid, Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { checkoutInitialValues, checkoutSchema } from "../../components/checkout/CheckoutFormValidation";
import CustomButton from "../../components/ui/CustomButton";
import Billing from "../../components/checkout/Billing";
import ContactInfo from "../../components/checkout/ContactInfo";
import PaymentMethod from "../../components/checkout/PaymentMethod";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";
import { toast } from "react-hot-toast";
import { useMounted } from "../../hooks/use-mounted";
import { orderApi } from "../../api/orderApi";
import { useNavigate } from "react-router-dom";

 

const Checkout = () => {
    const isMounted = useMounted()
    const navigate = useNavigate();
    const initialStep = JSON.parse(localStorage.getItem("step")) || 0
    const [activeStep, setActiveStep] = useState(initialStep);
    const cart = useSelector((state) => state.cart.cart);
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;
    const isThirdStep = activeStep === 2;
    const isFourthStep = activeStep === 3;

    const handleFormSubmit = async (values, actions) => {
        localStorage.setItem("billingInfo", JSON.stringify(values));
        localStorage.setItem("step", JSON.stringify(activeStep));

        setActiveStep(activeStep + 1);
        if (isFourthStep) {
            placeOrderHandler(values, actions);
        }

        actions.setTouched({});
    };

    const placeOrderHandler = async (values, actions) => {
        try {
           const  response = await orderApi.CreateOrder(values);
             if (isMounted()) {
                actions.setStatus({ success: true });
                actions.setSubmitting(false);
                localStorage.removeItem('cartItems');
                localStorage.removeItem('billingInfo');
                localStorage.removeItem('step');
                toast.success('Order Created');
                navigate(`/order/${response._id}`);
            }
        } catch (error) {
            if (isMounted()) {
                actions.setStatus({ success: false });
                actions.setErrors(error);
                actions.setSubmitting(false);
             }
        }
    };
    const handleEditStep = (step) => {
        setActiveStep(step);
    };
  
    const formik = useFormik({
        onSubmit: (values, actions) => handleFormSubmit(values, actions, activeStep, isFourthStep), initialValues: JSON.parse(localStorage.getItem("billingInfo")) || checkoutInitialValues,
        validationSchema: checkoutSchema[activeStep]
    });

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
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
                        <CheckoutSummary
                            setFieldValue={formik.setFieldValue}
                            onEditStep={handleEditStep}
                        />
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
                            {cart.length > 0 ? (
                                <CustomButton
                                    fullWidth
                                    type="submit"
                                    color="primary"
                                    disabled={isSubmitting}
                                    variant="contained"
                                    sx={{
                                        boxShadow: "none",
                                        borderRadius: 0,
                                        padding: "15px 40px",

                                    }}
                                >
                                    {!isFourthStep ? "Next" : isSubmitting ? "loading..." : "Place Order"}
                                </CustomButton>
                            ) : (
                                <Typography variant="h5" color="error">Add something to your cart </Typography>
                            )}
                        </Grid>
                    </Grid>
                </form>

            </Box>
        </Box>
    );
};



export default Checkout;
