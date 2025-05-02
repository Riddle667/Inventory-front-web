import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ArrowBack, Visibility } from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { themes, useThemeContext } from "@/context";
import { Order, PrivateRoutes, Product } from "@/models";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@/redux/store";
import { GetProductUseCase } from "@/useCase";
import { AxiosError } from "axios";
import { ResponseAPI } from "@/utilities";
import { resetUser } from "@/redux";

export const DetailsProduct = () => {
  const navigate = useNavigate();
  const { theme } = useThemeContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [product, setProduct] = useState<Product>({} as Product);
  const [orders, setOrders] = useState<Order[]>([]);
  const user = useSelector((store: AppStore) => store.user);
  const token = user?.session_token ?? "";
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  // Cargar datos del producto y sus órdenes
  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const { data } = await GetProductUseCase(Number(id), token); // API para obtener producto
        //const ordersData = await fetchOrdersByProductId(id); // API para obtener órdenes relacionadas

        const product = data as Product;
        console.log(product);
        setProduct(product);
        for (let i = 0; i < product.orders.length; i++) {
          const order = product.orders[i].order;
          if (order) {
            setOrders((prevOrders) => [...prevOrders, order]);
          }
        }
      } catch (error) {
        const e = error as AxiosError & ResponseAPI;
        if (
          e.message === "No token provided" ||
          e.message === "token expired"
        ) {
          dispatch(resetUser());
          navigate("/", { replace: true });
        }
        setError(e.message ?? "Error al cargar detalles del producto");
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: themes[theme].sidebar.backgroundColor,
        color: themes[theme].sidebar.color,
        padding: "2rem",
        borderRadius: "12px",
        width: "90%",
        margin: "2rem auto",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        overflowY: "auto",
      }}
    >
      {/* Título y botón de retroceso */}
      <Box sx={{ position: "relative", mb: 3 }}>
        <IconButton
          onClick={() =>
            navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.VIEW_PRODUCTS}`)
          }
          sx={{ position: "absolute", left: 0 }}
        >
          <ArrowBack sx={{ color: themes[theme].menu.icon }} />
        </IconButton>
        <Typography variant="h4" align="center" color={themes[theme].menu.icon}>
          Detalles del Producto
        </Typography>
      </Box>

      {/* Cargando o Error */}
      {loading && (
        <Box textAlign="center">
          <CircularProgress />
          <Typography mt={1}>Cargando detalles del producto...</Typography>
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Detalles del producto */}
      {!loading && !error && product && (
        <>
          {/* Carrusel de imágenes */}
          <Box sx={{ mb: 4 }}>
            <Carousel showThumbs dynamicHeight={false} autoPlay infiniteLoop>
              {product.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.url}
                    alt={`Imagen ${index + 1}`}
                    style={{
                      maxHeight: "400px",
                      objectFit: "contain",
                      borderRadius: "12px",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </Box>

          {/* Información del producto */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Información del Producto
            </Typography>
            <Box component="ul" sx={{ pl: 2, listStyle: "none" }}>
              <li>
                <strong>Nombre:</strong> {product.name}
              </li>
              <li>
                <strong>Descripción:</strong> {product.description}
              </li>
              <li>
                <strong>Precio:</strong> ${product.price}
              </li>
              <li>
                <strong>Stock:</strong> {product.stock}
              </li>
              <li>
                <strong>Categoría:</strong> {product.category?.name}
              </li>
            </Box>
          </Box>
        </>
      )}

      {/* Tabla de órdenes */}
      {!loading && !error && (
        <>
          <Typography variant="h5" gutterBottom>
            Órdenes Relacionadas
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: themes[theme].sidebar.backgroundColor,
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {["ID Orden", "Comprador", "Fecha", "Total", "Acciones"].map(
                    (header) => (
                      <TableCell
                        key={header}
                        sx={{ color: themes[theme].menu.icon }}
                        align={header === "Acciones" ? "center" : "left"}
                      >
                        {header}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell sx={{ color: themes[theme].menu.icon }}>
                      {order.id}
                    </TableCell>
                    <TableCell sx={{ color: themes[theme].menu.icon }}>
                      {order.client?.name} {order.client?.lastName}
                    </TableCell>
                    <TableCell sx={{ color: themes[theme].menu.icon }}>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "Fecha no disponible"}
                    </TableCell>
                    <TableCell sx={{ color: themes[theme].menu.icon }}>
                      ${order.total_price}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          navigate(
                            `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.DETAILS_PRODUCT}/${id}/${PrivateRoutes.DETAILS_ORDER}/${order.id}`
                          )
                        }
                        sx={{
                          color: "#1976d2",
                          backgroundColor: "rgba(25, 118, 210, 0.1)",
                          "&:hover": {
                            backgroundColor: "rgba(25, 118, 210, 0.2)",
                          },
                        }}
                      >
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {!loading && !error && !orders.length && (
        <Typography mt={4}>
          No se encontraron órdenes relacionadas con este producto.
        </Typography>
      )}
    </Box>
  );
};
