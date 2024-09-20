// author: Parth Patel
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import ButtonThemeWrapper from "../components/ui/ButtonThemeWrapper";

type FormValues = {
  token: string,
  password: string,
  confirmPassword: string
};

const ResetPassword = () => {
  const form = useForm<FormValues>();
  const [error, setError] = useState("");
  const { register, watch, handleSubmit, formState } = form;
  const { errors } = formState;
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    console.log("Reset password on submit called.")
    const response = await fetch(`${(import.meta as any).env.VITE_BASE_API_URL}/api/v1/reset-password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "password": data.password, "token": localStorage.getItem("token") })
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error)
      setSuccess("")

    } else {
      setError("")
      setSuccess(result.message)

      navigate("/login")
    }

  }

  return (
    <>
      <div className="h-[10px]">
        <Header />
      </div>
      <ButtonThemeWrapper>
        <Container maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              mt: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Reset Password</Typography>
            <Box sx={{ mt: 1 }}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {error && (
                  <Typography variant="body2" color={"red"}>{error}</Typography>)}
                {success && (
                  <Typography variant="body2" color={"green"}>{success}</Typography>)}
                <TextField
                  fullWidth
                  label="Password *"
                  type="password"
                  id="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required."
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
                      message: "Password length must be between 8 and 15.Password must contain atleast 1 digit, 1 lowercase and 1 uppercase character."
                    }
                  })}
                />
                <TextField
                  fullWidth
                  label="Confirm Password *"
                  type="password"
                  id="confirmpassword"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  {...register("confirmPassword", {

                    required: {
                      value: true,
                      message: "Confirm Password is required."
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
                      message: "Password length must be between 8 and 15.Password must contain atleast 1 digit, 1 lowercase and 1 uppercase character."
                    },
                    validate: (value) => value === watch('password') || "Your passwords do not match."
                  })}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="ochre">
                  Reset Password
                </Button>
              </form>
            </Box>
          </Box>
        </Container>
      </ButtonThemeWrapper>
      <div className="mt-16">
        <Footer />
      </div>

    </>

  )


}

export default ResetPassword;
