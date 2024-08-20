"use client";
import React, { useEffect, useState } from "react";
import "./Login.css";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoginUseCase } from "@/useCase";
import { useDispatch } from "react-redux";
import { createUser, resetUser } from "@/redux";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "@/models";


type LoginProps = {
  email: string;
  password: string;
};

const Login: React.FC<LoginProps> = () => {
  const [loginData, setLoginData] = useState<LoginProps>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<[] | string | null>();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=> {
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, {replace: true});
  },[]);

  const dataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await LoginUseCase(loginData.email, loginData.password);

      const user = response.userData;
      dispatch(createUser(user));
      navigate(`/${PrivateRoutes.PRIVATE}`, {replace: true});
    } catch (error:any) {
      // Si el error tiene un arreglo `errors`, los procesamos
      if (error.errors && Array.isArray(error.errors)) {
          const errorMessages = error.errors
              .map((err: { msg: string }) => err.msg)
              .join(", "); // Unir todos los mensajes de error en una cadena separada por comas

          setErrorMessage(`Ocurrió un error al registrar: ${errorMessages}`);
      } else {
          // Si no hay un arreglo de errores, muestra el mensaje genérico
          setErrorMessage(`Ocurrió un error al registrar: ${error.error || error}`);
      }
  }
  };

  

  return (
    <div className="root">
      <Container component="main" maxWidth="xs" className="container">
        <div className="header">
          <img src="src/assets/logo.png" alt="icon" />
          <Typography component="h1" variant="h4" className="title">
            Inventory Management
          </Typography>
        </div>
        <Paper className="paper" elevation={3}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            component="form"
            onSubmit={handleSubmit}
          >
            <Typography component="h2" variant="h5" color={"white"}>
              Welcome to Inventory Management
            </Typography>
            <Typography variant="body2">
              Please enter your login credentials to access the system.
            </Typography>
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
              className="input"
              required
              fullWidth
              multiline
              variant="filled"
              onChange={dataLogin}
            />
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="input"
              required
              fullWidth
              variant="filled"
              onChange={dataLogin}
              InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ?  <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {errorMessage && (
              <Typography variant="body2" color="error" marginTop={1}>
                {errorMessage}
              </Typography>
            )}
            <Link
              href="#"
              variant="body2"
              color="#ffff"
              underline="hover"
              marginBottom={1}
            >
              Forgot password?
            </Link>
            <Button
              type="submit"
              fullWidth
              sx={{
                bgcolor: "#fff",
                color: "black",
                ":hover": { bgcolor: "#dfdfdf" },
              }}
              variant="contained"
              className="button"
            >
              LOGIN
            </Button>
            <Link
              href="/register"
              variant="body2"
              color="#ffff"
              underline="hover"
              marginTop={1}
            >
              Don't have an account? Register
            </Link>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
