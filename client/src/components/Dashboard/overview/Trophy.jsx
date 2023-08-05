import Card from '@mui/material/Card'
import { currencyFormatter } from "../../../utils/currencyFormatter";
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import useTheme from '../../../hooks/useTheme'
import DarkTriangle from '../../../assets/overview/triangle-dark.png'
import LightTriangle from '../../../assets/overview/triangle-light.png'
import trophy from '../../../assets/overview/trophy.png'
import CustomButton from '../../ui/CustomButton'
import { useNavigate } from 'react-router-dom'



const Trophy = () => {
     const { theme } = useTheme();
    const imageSrc = theme.palette.mode === 'light' ? LightTriangle : DarkTriangle
    const navigate = useNavigate();

    return (
        <Card sx={{ position: 'relative' }}>
            <CardContent>
                <Typography variant='h5' fontWeight='bold'>Chemise 100% Coton - Marron</Typography>
                <Typography variant='h5' sx={{ letterSpacing: '0.25px' }}>
                    Top Selling Product of the Month
                </Typography>
                <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
                {currencyFormatter.format(42.8)}
                </Typography>
                <CustomButton size='small' variant='contained' onClick={()=>navigate('/dashboard/orders')}>
                    View Sales / Orders
                </CustomButton>
                <img
                    alt='triangle background'
                    style={{
                        right: 0,
                        bottom: 0,
                        height: 170,
                        position: 'absolute'
                    }}
                    src={imageSrc}
                />
                <img
                    alt='trophy'
                    style={{
                        right: 36,
                        bottom: 20,
                        height: 98,
                        position: 'absolute'
                    }}
                    src={trophy}
                />
            </CardContent>
        </Card>
    )
}

export default Trophy
