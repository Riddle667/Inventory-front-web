import { themes } from "@/context/themes/themes";
import { useThemeContext } from "@/context/themes/themesContext";
import { AppSidebar, PrimarySearchAppBar } from "@/layout";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Delete, Upload } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { Category, Image, Product } from "@/models";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@/redux/store";
import { AxiosError } from "axios";
import { ResponseAPI } from "@/utilities";
import { resetUser } from "@/redux";
import {
  GetProductUseCase,
  UpdateProductUseCase,
  ViewCategoriesUseCase,
} from "@/useCase";

export const UpdateProduct = () => {
  const { theme } = useThemeContext();
  const [formData, setFormData] = useState<Product | null>(null);
  const [images, setImages] = useState<Image[]>([]); // Almacena las URLs de las imágenes existentes
  const [newImages, setNewImages] = useState<File[]>([]); // Almacena las nuevas imágenes seleccionadas
  const [categories, setCategories] = useState<Category[]>([]); // Almacena las categorías del producto
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const user = useSelector((store: AppStore) => store.user);
  const token = user?.session_token ?? "";

  // Simulación de obtención de datos del producto
  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await GetProductUseCase(Number(id), token);
      const product = data as Product;
      console.log("Datos del producto:", data);
      setFormData(product);
      setImages(product.images);
    } catch (error) {
      console.error("Error al obtener los datos del producto:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await ViewCategoriesUseCase(token);
      setCategories(data as Category[]);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages([...newImages, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveImage = (imageId: number) => {
    setImages(images.filter((img) => img.id !== imageId));
  };
  

  const handleRemoveNewImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData ||
      !formData.name ||
      !formData.price ||
      !formData.category_id
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      const updatedProduct = { ...formData, newImages }; // Incluye nuevas imágenes
      const { data } = await UpdateProductUseCase(updatedProduct, token);
      console.log("Producto actualizado:", data);
      navigate("/productos"); // Redirige después de actualizar
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      console.error("Error al actualizar el producto:", e);
      if (e.message === "No token provided" || e.message === "token expired") {
        dispatch(resetUser());
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", direction: "ltr" }}>
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
            marginBottom: "2rem",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: themes[theme].menu.icon }}
          >
            Actualizar Producto
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Campos del producto */}
            <TextField
              label="Nombre del Producto"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={formData?.name || ""}
              onChange={handleInputChange}
              InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: themes[theme].menu.icon,
                  },
                  "&:hover fieldset": {
                    borderColor: themes[theme].menu.hover.backgroundColor,
                  },
                },
              }}
            />
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              margin="normal"
              name="description"
              value={formData?.description || ""}
              onChange={handleInputChange}
              InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: themes[theme].menu.icon,
                  },
                  "&:hover fieldset": {
                    borderColor: themes[theme].menu.hover.backgroundColor,
                  },
                },
              }}
            />
            <TextField
              label="Precio"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="price"
              value={formData?.price || ""}
              onChange={handleInputChange}
              InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: themes[theme].menu.icon,
                  },
                  "&:hover fieldset": {
                    borderColor: themes[theme].menu.hover.backgroundColor,
                  },
                },
              }}
            />
            <TextField
              label="Cantidad"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="quantity"
              value={formData?.stock || ""}
              onChange={handleInputChange}
              InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: themes[theme].menu.icon,
                  },
                  "&:hover fieldset": {
                    borderColor: themes[theme].menu.hover.backgroundColor,
                  },
                },
              }}
            />
            <FormControl fullWidth margin="normal">
              <Select
                name="category_id"
                value={formData?.category_id || ""}
                onChange={(e) =>
                  handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
                }
                displayEmpty
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: themes[theme].menu.icon },
                    "&:hover fieldset": {
                      borderColor: themes[theme].menu.hover.backgroundColor,
                    },
                  },
                }}
              >
                <MenuItem value="">
                  <em>Selecciona una categoría</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Manejo de imágenes */}
            <Typography
              variant="h6"
              sx={{ marginTop: "1rem", color: themes[theme].menu.icon }}
            >
              Imágenes del Producto
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {/* Imágenes existentes */}
              {images.map((image) => (
                <Box
                  key={image.id}
                  sx={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <img
                    src={image.url}
                    alt="Producto"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(image.id)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "#fff",
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}

              {/* Nuevas imágenes */}
              {newImages.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Nueva"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={() => handleRemoveNewImage(index)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "#fff",
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
            </Box>

            {/* Botón para subir imágenes */}
            <Button
              variant="outlined"
              component="label"
              startIcon={<Upload />}
              sx={{
                marginTop: "1rem",
                color: themes[theme].menu.icon,
                borderColor: themes[theme].menu.icon,
              }}
            >
              Subir Imágenes
              <input
                hidden
                accept="image/*"
                type="file"
                multiple
                onChange={handleImageUpload}
              />
            </Button>

            {/* Botón para actualizar producto */}
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
              Actualizar Producto
            </Button>
          </form>
        </Box>
      </main>
    </div>
  );
};
