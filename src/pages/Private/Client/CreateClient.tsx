import { themes } from "@/context/themes/themes";
import { useThemeContext } from "@/context/themes/themesContext";
import { AppSidebar, PrimarySearchAppBar } from "@/layout";
import { AppStore } from "@/redux/store";
import { CreateClientUseCase } from "@/useCase";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Client, PrivateRoutes } from "@/models";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ResponseAPI } from "@/utilities";
import { resetUser } from "@/redux";

export const CreateClient = () => {
  const { theme } = useThemeContext();
  const user = useSelector((store: AppStore) => store.user);
  const token = user?.session_token ?? "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Client>({
    id: 0, // or a default value
    name: "",
    lastName: "",
    phone: "",
    address: "",
    rut: "",
    isBlackList: false, // or a default value
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.lastName.trim() &&
      formData.phone.trim() &&
      formData.address.trim() &&
      formData.rut.trim()
    );
  };

  if (!token) {
    alert("Sesión expirada. Por favor, inicie sesión nuevamente.");
    dispatch(resetUser());
    navigate("/", { replace: true });
    return;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      await CreateClientUseCase(formData, token);
      alert("El cliente se ha creado.");
      setTimeout(() => {
        navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.VIEW_CLIENTS}`);
      }, 1500);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      if (e.message) {
        alert(`Error: ${e.message}`);
      } else {
        alert("Error al crear el cliente. Por favor, intente de nuevo.");
      }
      if (e.message === "No token provided" || e.message === "token expired") {
        dispatch(resetUser());
        navigate("/", { replace: true });
      }
    }

    // Aquí puedes agregar la lógica para enviar los datos a la API
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AppSidebar />
      <main
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <PrimarySearchAppBar />
        <Box
          sx={{
            backgroundColor: themes[theme].sidebar.backgroundColor,
            color: themes[theme].sidebar.color,
            padding: "2rem",
            borderRadius: "8px",
            maxWidth: "500px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            marginTop: "2rem",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: themes[theme].menu.icon }}
          >
            Crear Cliente
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre del Cliente"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              id="client-name"
              aria-label="Nombre del Cliente"
              value={formData.name}
              onChange={handleInputChange}
              InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: themes[theme].menu.icon },
                  "&:hover fieldset": {
                    borderColor: themes[theme].menu.hover.backgroundColor,
                  },
                },
              }}
            />
            <TextField
              label="Apellido"
              variant="outlined"
              fullWidth
              margin="normal"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: themes[theme].menu.icon },
                  "&:hover fieldset": {
                    borderColor: themes[theme].menu.hover.backgroundColor,
                  },
                },
              }}
            />
            <TextField
              label="Teléfono"
              type="tel"
              variant="outlined"
              fullWidth
              margin="normal"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: themes[theme].menu.icon },
                  "&:hover fieldset": {
                    borderColor: themes[theme].menu.hover.backgroundColor,
                  },
                },
              }}
            />
            <TextField
              label="Dirección"
              variant="outlined"
              fullWidth
              margin="normal"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: themes[theme].menu.icon },
                  "&:hover fieldset": {
                    borderColor: themes[theme].menu.hover.backgroundColor,
                  },
                },
              }}
            />
            <TextField
              label="RUT"
              variant="outlined"
              fullWidth
              margin="normal"
              name="rut"
              value={formData.rut}
              onChange={handleInputChange}
              InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: themes[theme].menu.icon },
                  "&:hover fieldset": {
                    borderColor: themes[theme].menu.hover.backgroundColor,
                  },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: themes[theme].menu.hover.backgroundColor,
                color: themes[theme].menu.hover.color,
                marginTop: "1rem",
                "&:hover": {
                  backgroundColor: themes[theme].menu.hover.color,
                  color: themes[theme].sidebar.backgroundColor,
                },
              }}
            >
              Crear Cliente
            </Button>
          </form>
        </Box>
      </main>
    </div>
  );
};

export default CreateClient;
