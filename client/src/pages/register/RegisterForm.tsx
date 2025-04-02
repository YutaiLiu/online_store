import { LockOutlined } from "@mui/icons-material";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation, useRegisterMutation } from "../../api/accountApi";
import { registerSchema, RegisterSchema } from "./registerSchema";

export default function LoginForm() {
    const [ sendLoginRequest ] = useLoginMutation();
    const [ sendRegisterRequest, {isLoading} ] = useRegisterMutation();
    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterSchema) => {
        try {
            await sendRegisterRequest(data).unwrap();
        }
        catch (error) {
            const errorMessages = (error as { data?: { errors?: Record<string, string[]> } }).data?.errors;
            if (errorMessages &&
                typeof errorMessages === 'object' &&
                Object.values(errorMessages).every(val => Array.isArray(val) && val.every(item => typeof item === "string"))) {
                // Check if the error messages are in the expected format
                // Loop through the error messages and set them in the form
                for (const key in errorMessages) {
                    if (Object.prototype.hasOwnProperty.call(errorMessages, key)) {
                        if (key.includes('Email')) setError("email", {message: errorMessages[key][0]});
                        if (key.includes('password')) setError("password", {message: errorMessages[key][0]});
                    }
                }
            }
            else {
                setError("email", {message: "An unknown error occurred. Please try again."});
            }
            return;
        }

        // After successful registration, automatically log in the user
        try {
            await sendLoginRequest({email: data.email, password: data.password}).unwrap();
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
            <Box display={"flex"} flexDirection="column" alignItems="center" marginTop={8}>
                <LockOutlined sx={{ fontSize: 40, mt: 3, color: 'secondary.main' }} />
                <Typography variant="h5">
                    Register
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
                    <Button variant="contained" type="submit" disabled={isLoading || !isValid} color="secondary" sx={{ mt: 3, mb: 2 }}>
                        Register
                    </Button>
                    <Typography sx={{ textAlign: "center" }}>
                        Already have an account? 
                        <Typography component={Link} to='/login' color="secondary.primary" sx={{ml: 1}}>Login</Typography>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}