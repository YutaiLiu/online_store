import { LockOutlined } from "@mui/icons-material";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "./loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyUserInfoQuery, useLoginMutation } from "../../api/accountApi";

export default function LoginForm() {
    const [sendLoginRequest, { isLoading }] = useLoginMutation();
    const [fetchUserInfo] = useLazyUserInfoQuery();
    const location = useLocation();
    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema),
    });

    const navigate = useNavigate();

    const onSubmit = async (data: LoginSchema) => {
        try {
            await sendLoginRequest(data).unwrap();
            // redundant request to get user info
            // in order to fix the timing issue
            // before the user is redirected to the page
            // be sure the user info is fetched
            // this is a workaround for the issue
            await fetchUserInfo().unwrap();
            // navigate to the page user came from
            navigate(location.state?.from || "/catalog");
        }
        catch {
            // error.data.detail === "Failed"
            setError("email", { message: "Your email might be wrong. Please try again." });
            setError("password", { message: "Your password might be wrong. Please try again." });
        }
    }

    return (
        <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
            <Box display={"flex"} flexDirection="column" alignItems="center" marginTop={8}>
                <LockOutlined sx={{ fontSize: 40, mt: 3, color: 'secondary.main' }} />
                <Typography variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
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
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ""}
                    />
                    <Button variant="contained" type="submit" disabled={isLoading || !isValid}>
                        Sign in
                    </Button>
                    <Typography sx={{ textAlign: "center" }}>
                        Don't have an account?
                        <Typography component={Link} to='/register' color="secondary.primary" sx={{ ml: 1 }}>Register here</Typography>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}