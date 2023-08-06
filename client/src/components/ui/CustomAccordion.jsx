 import { Accordion, AccordionSummary, AccordionDetails, Typography, SvgIcon } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useState } from 'react';
import PropTypes from 'prop-types';


const CustomAccordion = (props) => {
 const {tabIndex, question, answer}=props
 
const [activeTab, setActiveTab] = useState(0);

    const toggleTab = (tab) => {
        if (activeTab === tab) {
            setActiveTab(0);
        } else {
            setActiveTab(tab);
        }
    };
 
  return (

    <Accordion
    key={tabIndex}
    expanded={activeTab === tabIndex}
    onChange={() => toggleTab(tabIndex)}
    elevation={activeTab === tabIndex ? 1 : 0}
>
    <AccordionSummary
        expandIcon={<SvgIcon>{activeTab === tabIndex ? <ExpandMoreIcon /> : <ExpandMoreIcon />}</SvgIcon>}
    >
        <Typography variant="h5" fontWeight='bold' sx={{ letterSpacing: '0.15px !important' }}>
            {question}
        </Typography>
    </AccordionSummary>
    <AccordionDetails>
        <Typography variant="h5" sx={{ letterSpacing: '0.15px !important' , lineHeight: 1.8}}>{answer}</Typography>
    </AccordionDetails>
</Accordion>
)
}
CustomAccordion.propTypes = {
    tabIndex: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
};

export default CustomAccordion