import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, SvgIcon, Divider } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Box, Container } from "@mui/system";
import Heading from "../components/ui/Heading";


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
    const [activeTab, setActiveTab] = useState(0);

    const toggleTab = (tab) => {
        if (activeTab === tab) {
            setActiveTab(0);
        } else {
            setActiveTab(tab);
        }
    };
    const createAccordion = (tabIndex, question, answer) => (
        <Accordion
            key={tabIndex}
            expanded={activeTab === tabIndex}
            onChange={() => toggleTab(tabIndex)}
            elevation={activeTab === tabIndex ? 1 : 0}
        >
            <AccordionSummary
                expandIcon={<SvgIcon>{activeTab === tabIndex ? <ExpandMoreIcon /> : <ExpandMoreIcon />}</SvgIcon>}
            >
                <Typography variant="h5" fontWeight='bold'>
                    {question}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="h5">{answer}</Typography>
            </AccordionDetails>
        </Accordion>
    );
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
                <Box sx={{ marginX: 'auto', marginTop: 3}}>
                    {faqData.map((item, index) => createAccordion(index + 2 , item.question, item.answer))}
                </Box>
            </Container >

        </>
    )
}

export default FAQ