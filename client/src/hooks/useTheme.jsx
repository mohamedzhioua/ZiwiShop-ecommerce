import { useContext } from 'react';
import ThemeContext from '../contexts/theme/ThemeContext';

const useTheme = () => useContext(ThemeContext);

export default useTheme;
