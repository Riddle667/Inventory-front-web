import { themes } from "@/context/themes/themes";
import { useThemeContext } from "@/context/themes/themesContext";
import { PrivateRoutes, Product } from "@/models";
import { AppStore } from "@/redux/store";
import { ViewProductsUseCase } from "@/useCase";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ResponseAPI } from "@/utilities";
import { resetUser } from "@/redux";
import GenericConfirmationModal from "@/components/modals/GenericConfirmationModal";
import { DeleteProductUseCase } from "@/useCase/product";

// Cambios en el componente ViewProducts
export const ViewProducts: React.FC = () => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const user = useSelector((store: AppStore) => store.user);
  const token = user?.session_token ?? "";
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    name: "",
    description: "",
    category: "all", // Nuevo filtro para categoría (ejemplo)
    minPrice: "",
    maxPrice: "",
    inStock: "all", // Nuevo filtro para disponibilidad de stock
  });
  const [openModal, setOpenModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: number;
    name: string;
    type: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = (id: number, name: string, type: string) => {
    setItemToDelete({ id, name, type });
    setOpenModal(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      setLoading(true); // Muestra un estado de carga
      try {
        await DeleteProductUseCase(itemToDelete.id, token);

        console.log(
          `Elemento eliminado: ${itemToDelete.id} - ${itemToDelete.name}`
        );
        // Aquí puedes actualizar la lista de elementos en la UI.
        fetchProducts();
      } catch (error) {
        alert("No se pudo eliminar el elemento. Intenta de nuevo.");
      } finally {
        setLoading(false);
        setOpenModal(false);
        setItemToDelete(null);
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setItemToDelete(null);
  };

  const fetchProducts = async () => {
    try {
      const { data } = await ViewProductsUseCase(token);
      if (Array.isArray(data)) {
        setProducts(data as Product[]);
      } else {
        console.warn("Los datos obtenidos no son un arreglo:", data);
        setProducts([]);
      }
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      if (e.message === "No token provided" || e.message === "token expired") {
        dispatch(resetUser());
        navigate("/", { replace: true });
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredProducts = products.filter((product) => {
    const matchesFilters =
      (product.name?.toLowerCase() || "").includes(
        filters.name.toLowerCase()
      ) &&
      (product.description?.toLowerCase() || "").includes(
        filters.description.toLowerCase()
      ) &&
      (filters.category === "all" ||
        product.category.name === filters.category) &&
      (filters.minPrice === "" ||
        product.price >= parseFloat(filters.minPrice)) &&
      (filters.maxPrice === "" ||
        product.price <= parseFloat(filters.maxPrice)) &&
      (filters.inStock === "all" ||
        (filters.inStock === "yes" && product.stock > 0) ||
        (filters.inStock === "no" && product.stock === 0));

    return matchesFilters;
  });

  const handleAddProduct = () => {
    navigate("/private/create-product", { replace: true });
  };

  return (
    <Box
      sx={{
        backgroundColor: themes[theme].sidebar.backgroundColor,
        color: themes[theme].sidebar.color,
        padding: "2rem",
        borderRadius: "8px",
        width: "90%",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        marginTop: "2rem",
        marginBottom: "2rem",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: themes[theme].menu.icon }}
      >
        Lista de Productos
      </Typography>
      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
        <div>
          <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Ingresa algunos valores para filtrar productos.
          </p>
        </div>
        <button
          type="button"
          className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
          onClick={handleAddProduct}
        >
          Agregar Producto
        </button>
      </div>

      {/* Filtros fuera de la tabla */}
      <Box
        sx={{
          display: "flex",
          marginTop: "1rem",
          backgroundColor: themes[theme].sidebar.backgroundColor,
          padding: "0.5rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          borderRadius: "8px",
          gap: "1rem",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          label="Nombre"
          name="name"
          value={filters.name}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
        />
        <TextField
          label="Descripción"
          name="description"
          value={filters.description}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
        />
        <TextField
          label="Precio mínimo"
          name="minPrice"
          type="number"
          value={filters.minPrice}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
        />
        <TextField
          label="Precio máximo"
          name="maxPrice"
          type="number"
          value={filters.maxPrice}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleSelectChange}
          style={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            borderRadius: "4px",
            color: themes[theme].menu.icon,
            backgroundColor: themes[theme].sidebar.backgroundColor,
          }}
        >
          <option value="all">Todas las categorías</option>
          {/* Aquí se deberían mapear las categorías dinámicamente */}
          <option value="categoría 1">Categoría 1</option>
          <option value="categoría 2">Categoría 2</option>
        </select>
        <select
          name="inStock"
          value={filters.inStock}
          onChange={handleSelectChange}
          style={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            borderRadius: "4px",
            color: themes[theme].menu.icon,
            backgroundColor: themes[theme].sidebar.backgroundColor,
            fontWeight: "normal",
          }}
        >
          <option value="all">Todos</option>
          <option value="yes">En stock</option>
          <option value="no">Agotado</option>
        </select>
      </Box>
      {/* Tabla */}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: themes[theme].sidebar.backgroundColor,
          marginTop: "1rem",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "ID",
                "Nombre",
                "Descripción",
                "Precio",
                "Stock",
                "Categoría",
                "Acciones",
              ].map((label, index) =>
                label === "Acciones" ? (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ color: themes[theme].menu.icon }}
                  >
                    {label}
                  </TableCell>
                ) : (
                  <TableCell
                    key={index}
                    sx={{ color: themes[theme].menu.icon }}
                  >
                    {label}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell sx={{ color: themes[theme].sidebar.color }}>
                  {product.id}
                </TableCell>
                <TableCell sx={{ color: themes[theme].sidebar.color }}>
                  {product.name}
                </TableCell>
                <TableCell sx={{ color: themes[theme].sidebar.color }}>
                  {product.description}
                </TableCell>
                <TableCell sx={{ color: themes[theme].sidebar.color }}>
                  {product.price}
                </TableCell>
                <TableCell sx={{ color: themes[theme].sidebar.color }}>
                  {product.stock}
                </TableCell>
                <TableCell sx={{ color: themes[theme].sidebar.color }}>
                  {product.category.name}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: themes[theme].menu.icon,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        navigate(
                          `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.DETAILS_PRODUCT}/${product.id}`
                        );
                      }}
                      sx={{
                        color: "#1976d2",
                        backgroundColor: "rgba(25, 118, 210, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(25, 118, 210, 0.2)",
                        },
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        navigate(
                          `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.UPDATE_PRODUCT}/${product.id}`
                        );
                      }}
                      sx={{
                        color: "#388e3c",
                        backgroundColor: "rgba(56, 142, 60, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(56, 142, 60, 0.2)",
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleDeleteClick(product.id, product.name, "product");
                      }}
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
      <GenericConfirmationModal
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        message={
          loading
            ? "Eliminando... Por favor, espera."
            : `¿Estás seguro de que deseas eliminar "${itemToDelete?.name}"? Esta acción no se puede deshacer.`
        }
        confirmButtonText="Eliminar"
        cancelButtonText="Cancelar"
      />
    </Box>
  );
};
