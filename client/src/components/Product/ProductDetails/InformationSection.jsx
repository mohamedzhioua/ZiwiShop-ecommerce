import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { Box } from "@mui/material";


const InformationSection = (props) => {
    const { description } = props
    const [value, setValue] = useState("description");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        < >
            <Box m="20px 0">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="DESCRIPTION" value="description" />
                    <Tab label="REVIEWS" value="reviews" />
                </Tabs>
            </Box>
            <Box display="flex" flexWrap="wrap" gap="15px">
                {value === "description" && (
                    <div>{description}</div>
                )}
                {value === "reviews" && <div>reviews</div>}
            </Box>
        </>
    )
}
InformationSection.propTypes = {
    description: PropTypes.string.isRequired,
};
export default InformationSection