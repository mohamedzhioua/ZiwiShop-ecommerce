import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

const useTheme = () => useContext(ThemeContext);

export default useTheme;
