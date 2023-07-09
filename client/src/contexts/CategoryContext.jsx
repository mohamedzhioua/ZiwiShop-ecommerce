import PropTypes from "prop-types";
import { createContext, useState } from 'react';


const CategoryContext = createContext();

export function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);


    const saveCategories = (updatedCategories) => {
        setCategories(updatedCategories);
    };


    return (
        <CategoryContext.Provider value={{ categories, saveCategories }}>
            {children}
        </CategoryContext.Provider>
    );


}
CategoryProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export default CategoryContext;
