import { LockOutlined } from "@mui/icons-material";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Link } from "react-router";

export default function LoginForm() {
    return (
        <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
            <Box display={"flex"} flexDirection="column" alignItems="center" marginTop={8}>
                <LockOutlined sx={{ fontSize: 40, mt: 3, color: 'secondary.main' }} />
                <Typography variant="h5">
                    Sign in
                </Typography>
                <Box
                    component={"form"}
                    width={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={3}
                    marginY={3}
                >
                    <TextField
                        label="Email"
                        fullWidth
                        autoFocus
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                    />
                    <Button variant="contained">
                        Sign in
                    </Button>
                    <Typography sx={{ textAlign: "center" }}>
                        Don't have an account? 
                        <Typography component={Link} to='/register' color="secondary.primary" sx={{ml: 1}}>Sign up</Typography>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}