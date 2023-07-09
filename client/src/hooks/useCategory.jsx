import  { useContext } from 'react';
import CategoryContext from '../contexts/CategoryContext';
 
const useCategory = () => useContext(CategoryContext);


export default useCategory;


