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
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Estilos para el carrusel
import { AppSidebar, PrimarySearchAppBar } from "@/layout";
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
        const {data} = await GetProductUseCase(Number(id), token); // API para obtener producto
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
            marginBottom: "2rem",
            overflowY: "auto",
          }}
        >
          {/* Encabezado con retroceso y título */}
          <Box
            sx={{
              position: "relative",
              marginBottom: "1rem",
            }}
          >
            <IconButton
              onClick={() => navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.VIEW_PRODUCTS}`)}
              sx={{
                position: "absolute",
                left: 0,
              }}
            >
              <ArrowBack sx={{ color: themes[theme].menu.icon }} />
            </IconButton>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                color: themes[theme].menu.icon,
              }}
            >
              Detalles del Producto
            </Typography>
          </Box>

          {/* Información del producto */}
          {loading && (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress />
              <Typography>Cargando detalles del producto...</Typography>
            </Box>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          {!loading && !error && product && (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2rem",
                  marginBottom: "1rem",
                }}
              >
                {/* Carrusel de imágenes */}
                <Carousel
                  showThumbs={true}
                  dynamicHeight={false}
                  autoPlay={true}
                  infiniteLoop={true}
                >
                  {product.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image.url}
                        alt={`Imagen ${index + 1}`}
                        style={{ maxHeight: "400px", objectFit: "contain" }}
                      />
                    </div>
                  ))}
                </Carousel>

                {/* Detalles del producto */}
                <Box>
                  <Typography variant="h5">Información del Producto</Typography>
                  <Typography>
                    <strong>Nombre:</strong> {product.name}
                  </Typography>
                  <Typography>
                    <strong>Descripción:</strong> {product.description}
                  </Typography>
                  <Typography>
                    <strong>Precio:</strong> ${product.price}
                  </Typography>
                  <Typography>
                    <strong>Stock:</strong> {product.stock}
                  </Typography>
                  <Typography>
                    <strong>Categoría:</strong> {product.category?.name}
                  </Typography>
                </Box>
              </Box>
            </>
          )}

          {/* Tabla de órdenes */}
          {!loading && !error && (
            <>
              <Typography variant="h5" marginBottom="1rem">
                Órdenes relacionadas
              </Typography>
              <TableContainer
                component={Paper}
                sx={{
                  backgroundColor: themes[theme].sidebar.backgroundColor,
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: themes[theme].menu.icon }}>
                        ID Orden
                      </TableCell>
                      <TableCell sx={{ color: themes[theme].menu.icon }}>
                        Comprador
                      </TableCell>
                      <TableCell sx={{ color: themes[theme].menu.icon }}>
                        Fecha
                      </TableCell>
                      <TableCell sx={{ color: themes[theme].menu.icon }}>
                        Total
                      </TableCell>
                      <TableCell align="center" sx={{ color: themes[theme].menu.icon }}>
                        Acciones
                      </TableCell>
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
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Fecha no disponible"}
                        </TableCell>
                        <TableCell sx={{ color: themes[theme].menu.icon }}>
                          ${order.total_price}
                        </TableCell>
                        <TableCell
                      align="center"
                      sx={{
                        color: themes[theme].menu.icon,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      
                        <IconButton
                          onClick={() => {
                            navigate(
                              `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.DETAILS_PRODUCT}/${id}/${PrivateRoutes.DETAILS_ORDER}/${order.id}`
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
            <Typography marginTop="30px">
              No se encontraron órdenes relacionadas con este producto.
            </Typography>
          )}
        </Box>
      </main>
    </div>
  );
};
