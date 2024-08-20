"use client";
import React, { useState, useEffect } from "react";
import "./Register.css";
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
import { RegisterUseCase } from "@/useCase";
import { PrivateRoutes, User } from "@/models";
import { useDispatch } from "react-redux";
import { createUser } from "@/redux";
import { useNavigate } from "react-router-dom";

type RegisterProps = {
  name: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC = () => {
  const [registerData, setRegisterData] = useState<RegisterProps>({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState<[] | string | null>();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=> {
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, {replace: true});
  },[]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    const { name, lastname, phone, email, password, confirmPassword } = registerData;

    if (!name || !lastname || !phone || !email || !password || !confirmPassword) {
      setErrorMessage("Todos los campos son obligatorios.");
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const handleSubmit  = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (!validateForm()) {
        return;
      }
  
      const user: User = {
        name: registerData.name,
        lastname: registerData.lastname,
        phone: registerData.phone,
        email: registerData.email,
        password: registerData.password,
      };
  
      try {
        const response = await RegisterUseCase(user);
        console.log("Registro exitoso:", response);
        dispatch(createUser(response.data));
        navigate(`/${PrivateRoutes.PRIVATE}`, {replace:true})
        // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito
      } catch (error:any) {
        // Si el error tiene un arreglo `errors`, los procesamos
        if (error.errors && Array.isArray(error.errors)) {
            const errorMessages = error.errors
                .map((err: { msg: string }) => err.msg)
                .join(", "); // Unir todos los mensajes de error en una cadena separada por comas

            setErrorMessage(`Ocurrió un error al registrar: ${errorMessages}`);
        } else {
            // Si no hay un arreglo de errores, muestra el mensaje genérico
            setErrorMessage(`Ocurrió un error al registrar: ${error.message || error}`);
        }

        // Log del error para depuración
        console.log("Error:", error);
    }
  }

  

  return (
    <div className="root">
      <Container component="main" maxWidth="xs" className="container">
        <Paper className="paper" elevation={3}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            component="form"
            onSubmit={handleSubmit}
          >
            <Typography component="h2" variant="h5" color="white">
              Welcome to Inventory Management
            </Typography>
            <Typography variant="body2">
              Please fill in the details to create an account.
            </Typography>
            <TextField
              margin="dense"
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              className="input"
              required
              fullWidth
              variant="filled"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="lastname"
              label="Lastname"
              name="lastname"
              type="text"
              autoComplete="lastname"
              autoFocus
              className="input"
              required
              fullWidth
              variant="filled"
              onChange={handleChange}
            />
            <TextField 
              margin="dense"
              id="phone"
              label="Phone"
              name="phone"
              type="tel"
              autoComplete="phone"
              className="input"
              required
              fullWidth
              variant="filled"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              className="input"
              required
              fullWidth
              variant="filled"
              onChange={handleChange}
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
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="dense"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="current-password"
              className="input"
              required
              fullWidth
              variant="filled"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errorMessage && (
              <Typography variant="body2" color="error" marginTop={1}>
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              sx={{
                bgcolor: "#fff",
                color: "black",
                ":hover": { bgcolor: "#dfdfdf" },
                marginTop: 1,
              }}
              variant="contained"
              className="button"
            >
              REGISTER
            </Button>
            <Link
              href="/"
              variant="body2"
              color="white"
              underline="hover"
              marginTop={2}
            >
              Already have an account? Sign in
            </Link>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
