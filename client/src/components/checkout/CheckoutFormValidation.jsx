import * as Yup from "yup";

export const checkoutInitialValues = {
  shippingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
  paymentMethod: "",
  itemsPrice:"",
  shippingPrice:"",
  totalPrice:"",
  orderItems:""
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const checkoutSchema = [
  Yup.object().shape({
    shippingAddress: Yup.object().shape({
      firstName: Yup.string().required("First name is required").min(2, "First name must be at least 2 characters"),
      lastName: Yup.string().required("Last name is required").min(2, "Last name must be at least 2 characters"),
      city: Yup.string().required("City is required"),
      street1: Yup.string().required("Street address is required").min(5, "Street address must be at least 5 characters"),
      street2: Yup.string(),
      country: Yup.string().required("country is required"),
      state: Yup.string().required("State is required"),
      zipCode: Yup
        .number()
        .typeError("Zip code must be a number")
        .required("Zip code is required")
        .min(10000, "Zip code must be at least 5 digits")
        .max(999999, "Zip code cannot be more than 6 digits"),
    }),
   
  }),
  Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone number is required"),
  }),
    Yup.object().shape({
      paymentMethod: Yup.string().required("Payment method is required"),

  }),
 ];