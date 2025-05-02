import { themes } from "@/context/themes/themes";
import { useThemeContext } from "@/context/themes/themesContext";
import { PrivateRoutes } from "@/models";
import { resetUser } from "@/redux";
import { AppStore } from "@/redux/store";
import { CreateCategoryUseCase } from "@/useCase";
import { ResponseAPI } from "@/utilities";
import { Box, Button, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CreateCategory = () => {
  const { theme } = useThemeContext();
  const user = useSelector((store: AppStore) => store.user);
  const token = user?.session_token ?? "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false); // Nuevo estado

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Evitar múltiples envíos
    if (isSubmitting) return;

    setIsSubmitting(true); // Marcar el envío como en progreso
    try {
      await CreateCategoryUseCase(formData.name, token);
      navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.VIEW_CATEGORIES}`, {
        replace: true,
      });
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      if (e.message === "No token provided" || e.message === "token expired") {
        dispatch(resetUser());
        navigate("/", { replace: true });
      }
    } finally {
      setIsSubmitting(false); // Restablecer el estado del botón
    }
  };

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
        marginBottom: "2rem",
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: themes[theme].menu.icon }}
      >
        Crear Categoría
      </Typography>
      <TextField
        label="Nombre de la categoría"
        variant="outlined"
        fullWidth
        margin="normal"
        name="name"
        id="create-category-name"
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
        disabled={isSubmitting} // Deshabilitar mientras se procesa
      >
        {isSubmitting ? "Procesando..." : "Crear Categoría"}
      </Button>
    </Box>
  );
};
