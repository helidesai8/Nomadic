// author: Parth Patel
import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonThemeWrapper from "../components/ui/ButtonThemeWrapper";
import { useForm } from "react-hook-form";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { getRole } from "../utils/authUtils";

type FormValues = {
  email: string,
  password: string
}

const LoginPage = () => {
  const form = useForm<FormValues>()
  const [error, setError] = useState("");
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();
  const onSubmit = async (data: FormValues) => {
    try {
      setError("")
      const response = await fetch(`${(import.meta as any).env.VITE_BASE_API_URL}/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log("result:::", result);
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify({ userId: result.userDetails.id, email: result.userDetails.email, role:result.userDetails.role }));
        localStorage.setItem('token', result.token);
        localStorage.setItem('role',result.userDetails.role);
        console.log("Role::::",getRole())
        console.log("Login successful.")
        navigate('/')
      }
      else {
        setError(result.error)
      }
      console.log(result.error)
    }
    catch (error) {
      console.log(error)
      setError("An error occurred. Unable to login. Please try again.")
    }
  }

  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //const handleLogin = () => {};

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
            {/* <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar> */}
            <Typography variant="h5">Login</Typography>
            <Box sx={{ mt: 1 }}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {error && <Typography variant="body2" color={"red"}>{error}</Typography>}
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  //name="email"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required"
                    }, pattern: {
                      value: /^[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format"
                    }
                  })
                  }
                //   value={email}
                //   onChange={(e) => setEmail(e.target.value)}
                />
                {/* <p className="error">{errors.email?.message}</p> */}
                <TextField
                  margin="normal"
                  fullWidth
                  id="password"
                  //name="password"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required"
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
                      message: "Password length must be between 8 and 15.Password must contain atleast 1 digit, 1 lowercase and 1 uppercase character."
                    }
                  })}
                //value={password}
                //   onChange={(e) => {
                //     setPassword(e.target.value);
                //   }}
                />
                <Button type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="ochre"
                >
                  Login
                </Button>
              </form>

              <Grid container justifyContent={"space-between"}>
                <Grid item>
                  <Link to="/forgotpassword">Forgot Password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">Don't have an account? Register</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ButtonThemeWrapper>
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
};

export default LoginPage;