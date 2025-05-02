import { themes } from "@/context/themes/themes";
import { useThemeContext } from "@/context/themes/themesContext";
import { AppStore } from "@/redux/store";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetCLientUseCase, UpdateClientUseCase } from "@/useCase/client"; // Asegúrate de importar correctamente este caso de uso
import { Client } from "@/models/client"; // Ajusta según tu modelo de cliente
import { resetUser } from "@/redux";
import { PrivateRoutes } from "@/models";
import { AxiosError } from "axios";
import { ResponseAPI } from "@/utilities";

export const UpdateClient = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useThemeContext();
  const user = useSelector((store: AppStore) => store.user);
  const token = user?.session_token ?? "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Client | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        const { data } = (await GetCLientUseCase(Number(id), token)) as {
          data: Client;
        };
        setFormData(data);
      } catch (error) {
        const e = error as AxiosError & ResponseAPI;
        if (
          e.message === "No token provided" ||
          e.message === "token expired"
        ) {
          dispatch(resetUser());
          navigate("/", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id, token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cliente actualizado:", formData);
    // Aquí puedes agregar la lógica para actualizar el cliente en la API
    try {
      await UpdateClientUseCase(formData as Client, token);
      alert("El Cliente se ha actualizado.");
      navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.VIEW_CLIENTS}`);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      if (e.message === "No token provided" || e.message === "token expired") {
        dispatch(resetUser());
        navigate("/", { replace: true });
      }
      setError(e.message ?? "Ha ocurrido un error");
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
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
        Actualizar Cliente
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del Cliente"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formData?.name || ""}
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
          value={formData?.lastName || ""}
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
          value={formData?.phone || ""}
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
          value={formData?.address || ""}
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
          value={formData?.rut || ""}
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
          Actualizar Cliente
        </Button>
      </form>
    </Box>
  );
};
