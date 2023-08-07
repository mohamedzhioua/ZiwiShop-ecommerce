import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useState } from 'react';
import { categoryApi } from "../api/categoryApi";


const CategoryContext = createContext();

export function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [categoryParents,setCategoryParents]=useState([])

    const GetCategoryParents = useCallback(async () => {
        try {
          const response = await categoryApi.GetCategoryParents()
          setCategoryParents(response);
        } catch (error) {
          console.error(error);
        }
      }, []);
      
      useEffect(() => {
        GetCategoryParents();
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [children]);
      
    const saveCategories = (updatedCategories) => {
        setCategories(updatedCategories);
    };
   

    return (
        <CategoryContext.Provider value={{ categories, saveCategories ,categoryParents}}>
            {children}
        </CategoryContext.Provider>
    );


}
CategoryProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export default CategoryContext;
