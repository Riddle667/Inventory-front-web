import { themes } from "@/context/themes/themes";
import { useThemeContext } from "@/context/themes/themesContext";
import { AppSidebar, PrimarySearchAppBar } from "@/layout";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import { ViewCategoriesUseCase } from "@/useCase/category/ViewCategoriesUseCase";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@/redux/store";
import { Category, Product } from "@/models";
import { CreateProductUseCase } from "@/useCase/product/CreateProductUseCase";
import { UploadUseCase } from "@/useCase";
import { AxiosError } from "axios";
import { ResponseAPI } from "@/utilities";
import { resetUser } from "@/redux";
import { useNavigate } from "react-router-dom";

export const CreateProduct = () => {
  const { theme } = useThemeContext();
  const user = useSelector((store: AppStore) => store.user);
  const token = user?.session_token ?? "";
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category_id: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await ViewCategoriesUseCase(token);
        setCategories(data as Category[]);
      } catch (error) {
        const e = error as AxiosError & ResponseAPI;
        if (
          e.message === "No token provided" ||
          e.message === "token expired"
        ) {
          dispatch(resetUser());
          navigate("/", { replace: true });
        }
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 5) {
      alert("Solo puedes subir un máximo de 5 imágenes.");
      return;
    }
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = (await CreateProductUseCase(
        formData.name,
        formData.description,
        formData.price,
        formData.stock,
        formData.category_id,
        token
      )) as { data: Product };

      if (images.length > 0) {
        const response = await UploadUseCase(images, data.id, token);
        alert("Producto creado exitosamente");
        //const data = await UploadUseCase(images, id, token);
      alert("Producto creado exitosamente");
      console.log("Respuesta del servidor:", data, response);
        return;
      }else{
        alert("Producto creado exitosamente");
        console.log("Respuesta del servidor:", data);
      }

      
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Ocurrió un error al crear el producto.");
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
            Crear Producto
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre del Producto"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
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
              label="Descripción"
              variant="outlined"
              fullWidth
              margin="normal"
              name="description"
              value={formData.description}
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
              label="Precio"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="price"
              value={formData.price}
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
              label="Cantidad"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="stock"
              value={formData.stock}
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
            <FormControl fullWidth margin="normal">
              <Select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
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
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                marginTop: "1rem",
                backgroundColor: themes[theme].button.backgroundColor,
                color: themes[theme].button.color,
                "&:hover": {
                  backgroundColor: themes[theme].button.backgroundColor,
                  color: themes[theme].button.hoverColor,
                },
              }}
            >
              Subir Imágenes
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
              {images.length} de 5 imágenes seleccionadas
            </Typography>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={categories.length === 0}
              sx={{
                backgroundColor: themes[theme].button.backgroundColor,
                color: themes[theme].button.color,
                marginTop: "1rem",
                "&:hover": {
                  backgroundColor: themes[theme].button.backgroundColor,
                  color: themes[theme].button.hoverColor,
                },
              }}
            >
              Crear Producto
            </Button>
          </form>
        </Box>
      </main>
    </div>
  );
};
