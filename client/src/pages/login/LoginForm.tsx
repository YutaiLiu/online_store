import { LockOutlined } from "@mui/icons-material";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "./loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../../api/accountApi";

export default function LoginForm() {
    const [ sendLoginrequest, {isLoading} ] = useLoginMutation();
    const {register, handleSubmit, formState: {errors}} = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        await sendLoginrequest(data);
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
                    <Button variant="contained" type="submit" disabled={isLoading || !!errors.email || !!errors.password}>
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