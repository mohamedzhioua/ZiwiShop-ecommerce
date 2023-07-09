import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useState } from 'react';
import { categoryApi } from '../api/categoryApi';
import { toast } from 'react-hot-toast';


const CategoryContext = createContext();

export function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);

    const getCategories = useCallback(async () => {
        try {
            toast.promise(
                categoryApi.GetCategories(),
                {
                    loading: 'Fetching data...',
                    error: 'Error while fetching data',
                },
                { id: 'fetching', success: { style: { display: 'none' } } }
            )
                .then((response) => {
                    setCategories(response);

                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    return (
        <CategoryContext.Provider value={{categories,setCategories}}>
            {children}
        </CategoryContext.Provider>
    );


}
CategoryProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export default CategoryContext;
