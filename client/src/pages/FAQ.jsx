import { Box, Container } from "@mui/system";
import Heading from "../components/ui/Heading";
import { Divider } from "@mui/material";
import CustomAccordion from "../components/ui/CustomAccordion";


const faqData = [
    {
        question: 'What is your return policy?',
        answer: `If you're not satisfied with your purchase, we accept returns within 30 days of delivery. To initiate a return, please email us at ziwiShop@gmail.com with your order number and a brief explanation of why you're returning the item.`,
    },
    {
        question: 'How do I track my order?',
        answer: `You can track your order by clicking the tracking link in your shipping confirmation email, or by logging into your account on our website and viewing the order details.`,
    },
    {
        question: 'How do I contact customer support?',
        answer: `You can contact our customer support team by emailing us at ziwiShop@gmail.com, or by calling us at (555) 123-4567 between the hours of 9am and 5pm EST, Monday through Friday.`,
    },
    {
        question: 'Can I change or cancel my order?',
        answer: `Unfortunately, once an order has been placed, we are not able to make changes or cancellations. If you no longer want the items you've ordered, you can return them for a refund within 30 days of delivery.`,
    },
    {
        question: 'Do you offer international shipping?',
        answer: `Currently, we only offer shipping within the United States.`,
    },
    {
        question: 'What payment methods do you accept?',
        answer: `We accept Visa, MasterCard, PayPal payment methods. We also have a cash on delivery system.`,
    },
];
function FAQ() {

    return (

        <>
            <Container maxWidth='xl' >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginLeft: '1rem',
                        marginRight: '1rem',
                    }}
                >
                    <Heading title='faq' description='Frequently Asked Questions' />
                </Box>
                <Divider
                    sx={{
                        marginY: 2,
                        marginLeft: '1rem',
                        marginRight: '1rem',
                    }} />
                <Box sx={{ marginX: 'auto', marginTop: 3 }}>
                    {faqData.map((item, index) => (
                        <CustomAccordion
                            key={index}
                            tabIndex={index + 2}
                            question={item.question}
                            answer={item.answer}
                        />
                    ))}
                </Box>
            </Container >

        </>
    )
}

export default FAQ