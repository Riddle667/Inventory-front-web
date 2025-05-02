import { themes } from "@/context/themes/themes";
import { useThemeContext } from "@/context/themes/themesContext";
import { Box, Button, Typography } from "@mui/material";

export const DeleteProduct = () => {
  const { theme } = useThemeContext();

  const handleDelete = () => {
    console.log("Producto eliminado");
    // Lógica para eliminar el producto desde la API
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
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: themes[theme].menu.icon }}
      >
        Eliminar Producto
      </Typography>
      <Typography variant="body1" gutterBottom>
        ¿Estás seguro de que deseas eliminar este producto?
      </Typography>
      <Button
        onClick={handleDelete}
        variant="contained"
        sx={{
          backgroundColor: "red",
          color: themes[theme].sidebar.backgroundColor,
          marginTop: "1rem",
          "&:hover": {
            backgroundColor: "#ff4d4d",
          },
        }}
      >
        Confirmar Eliminación
      </Button>
    </Box>
  );
};
