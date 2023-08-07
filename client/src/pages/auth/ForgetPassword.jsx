import { Divider } from "@mui/material"
import Forgetpassword from "../../components/auth/ForgetPassword"
import Heading from "../../components/ui/Heading"
import { Box, Container } from "@mui/system"

function ForgetPassword() {
    return (
        <>
            <Container maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginLeft: '1rem',
                        marginRight: '1rem',
                        marginTop:'5rem'
                    }}
                >
                    <Heading
                        titleStyle='h4'
                        title="Forgot password"
                        description="Lost your password? Please enter your email address. You will receive a link to create a new password via email."
                    />
                </Box>
                <Divider
                    sx={{
                        marginY: 2,
                        
                    }} />
                <Forgetpassword />
            </Container>
        </>
    );
}

export default ForgetPassword;
