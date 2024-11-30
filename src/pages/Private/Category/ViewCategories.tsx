import { themes } from "@/context/themes/themes";
import { useThemeContext } from "@/context/themes/themesContext";
import { AppSidebar, PrimarySearchAppBar } from "@/layout";
import { Category } from "@/models";
import { resetUser } from "@/redux";
import { AppStore } from "@/redux/store";
import { ViewCategoriesUseCase } from "@/useCase/category/ViewCategoriesUseCase";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ResponseAPI } from "@/utilities";

export const ViewCategories: React.FC = () => {
  const { theme } = useThemeContext(); // Obtener el tema actual del contexto
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]); // Estado de categorías
  const user = useSelector((store: AppStore) => store.user);
  const token = user?.session_token ?? "";
  const [filters, setFilters] = useState({
    id: "",
    name: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await ViewCategoriesUseCase(token); // Llama al caso de uso para obtener las categorías
        setCategories(data as Category[]); // Asigna las categorías obtenidas al estado
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

    fetchCategories(); // Llama a la función de obtención de categorías al montar el componente
  }, []);

  const handleDeleteCategory = (id: number) => {
    console.log("Eliminar categoria:", id);

    // Aquí podrías llamar a un caso de uso para eliminar la categoría
  }

  const handleEditCategory = (id: number) => {
    console.log("Editar categoria:", id);
    // Aquí podrías redirigir al usuario a la página de edición de categoría
  }

  // Manejar cambios en los filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value || "", // Asegura que siempre sea una cadena
    }));
  };

  const filteredCategories = categories.filter((category) =>
    Object.keys(filters).every((key) => {
      const filterValue = filters[key as keyof typeof filters].toLowerCase();
      const categoryValue =
        category[key as keyof Category]?.toString().toLowerCase() ?? "";
      return categoryValue.includes(filterValue);
    })
  );

  const handleAddCategory = () => {
    console.log("Agregar Categoria");
    navigate("/private/create-category", { replace: true });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        direction: "ltr",
      }}
    >
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
            width: "90%",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            marginTop: "2rem",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: themes[theme].menu.icon }}
          >
            Lista de Categorias
          </Typography>
          <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
            <div>
              <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                Ingresa el ID o nombre de la categoria para filtrar.
              </p>
            </div>
            <button
              type="button"
              className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
              onClick={handleAddCategory}
            >
              Agregar Categoria
            </button>
          </div>
          <TableContainer
            className="mt-8"
            component={Paper}
            sx={{ backgroundColor: themes[theme].sidebar.backgroundColor }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {["ID", "Nombre"].map((label, index) => (
                    <TableCell key={index}>
                      <TextField
                        label={`Filtrar ${label}`}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        name={label.toLowerCase()}
                        value={
                          filters[label.toLowerCase() as keyof typeof filters]
                        }
                        onChange={handleFilterChange}
                        InputLabelProps={{
                          style: { color: themes[theme].menu.icon },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: themes[theme].menu.icon,
                            },
                            "&:hover fieldset": {
                              borderColor:
                                themes[theme].menu.hover.backgroundColor,
                            },
                          },
                          color: themes[theme].menu.icon,
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: themes[theme].menu.icon }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ color: themes[theme].menu.icon }}>
                    Nombre
                  </TableCell>
                  <TableCell sx={{ color: themes[theme].menu.icon }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell sx={{ color: themes[theme].sidebar.color }}>
                      {category.id}
                    </TableCell>
                    <TableCell sx={{ color: themes[theme].sidebar.color }}>
                      {category.name}
                    </TableCell>
                    <TableCell sx={{ color: themes[theme].sidebar.color }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          justifyContent: "center",
                        }}
                      >
                        {/* Botón de editar */}
                        <IconButton
                          onClick={() => {handleEditCategory(category.id)}}
                          sx={{
                            color: "#1976d2",
                            backgroundColor: "rgba(25, 118, 210, 0.1)",
                            "&:hover": {
                              backgroundColor: "rgba(25, 118, 210, 0.2)",
                            },
                          }}
                        >
                          <EditIcon />
                        </IconButton>

                        {/* Botón de eliminar */}
                        <IconButton
                          onClick={() => {handleDeleteCategory(category.id)}}
                          sx={{
                            color: "#d32f2f",
                            backgroundColor: "rgba(211, 47, 47, 0.1)",
                            "&:hover": {
                              backgroundColor: "rgba(211, 47, 47, 0.2)",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </main>
    </div>
  );
};
