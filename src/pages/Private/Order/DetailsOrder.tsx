import { themes, useThemeContext } from "@/context";
import { AppSidebar, PrimarySearchAppBar } from "@/layout";
import { Order, OrderProduct, PrivateRoutes } from "@/models";
import { resetUser } from "@/redux";
import { AppStore } from "@/redux/store";
import { GetOrderUseCase } from "@/useCase/order/GetOrderUseCase";
import { ResponseAPI } from "@/utilities";
import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const DetailsOrder = () => {
  const navigate = useNavigate();
  const { theme } = useThemeContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const user = useSelector((store: AppStore) => store.user);
  const token = user?.session_token ?? "";
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const location = useLocation();
  const { idP, idC } = useParams<{ idP?: string; idC?: string }>();

  const fetchOrder = async () => {
    try {
      const { data } = await GetOrderUseCase(Number(id), token);
      setOrderDetails(data as Order);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      if (e.message === "No token provided" || e.message === "token expired") {
        dispatch(resetUser());
        navigate("/", { replace: true });
      }
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const handleBack = () => {
    if (location.pathname.includes(PrivateRoutes.DETAILS_PRODUCT)) {
      navigate(
        `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.DETAILS_PRODUCT}/${idP}`
      );
    } else if (location.pathname.includes(PrivateRoutes.DETAILS_CLIENTS)) {
      navigate(
        `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.DETAILS_CLIENTS}/${idC}`
      );
    } else {
      navigate(`/${PrivateRoutes.PRIVATE}`);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  const {
    paid,
    total_price,
    pay_method,
    createdAt,
    is_installment,
    client,
    products,
  } = orderDetails ?? {};

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AppSidebar />
      <main
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <PrimarySearchAppBar />
        <Box
          sx={{
            backgroundColor: themes[theme].sidebar.backgroundColor,
            padding: "2rem",
            borderRadius: "8px",
            width: "90%",
            margin: "2rem auto",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            overflowY: "auto",
          }}
        >
          {/* Encabezado */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <IconButton onClick={handleBack}>
              <ArrowBack sx={{ color: themes[theme].menu.icon }} />
            </IconButton>
            <Typography
              variant="h5"
              sx={{
                marginLeft: "1rem",
                fontWeight: 600,
                color: themes[theme].menu.icon,
              }}
            >
              Detalles de la Orden
            </Typography>
          </Box>
          <Divider sx={{ marginBottom: "1.5rem" }} />

          {/* Información de la orden */}
          <Box
            component={Paper}
            sx={{
              padding: "1.5rem",
              backgroundColor: themes[theme].sidebar.backgroundColor,
              color: themes[theme].sidebar.color,
              marginBottom: "2rem",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">ID: {orderDetails?.id}</Typography>
            <Typography variant="body1">Total: ${total_price}</Typography>
            <Typography variant="body1">
              Método de Pago: {pay_method}
            </Typography>
            <Typography variant="body1">
              Fecha: {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
            </Typography>
            <Typography variant="body1">
              Pagada: {paid ? "Sí" : "No"}
            </Typography>
            <Typography variant="body1">
              ¿Con cuotas?: {is_installment ? "Sí" : "No"}
            </Typography>
          </Box>

          {/* Información del cliente */}
          <Box
            component={Paper}
            sx={{
              padding: "1.5rem",
              marginBottom: "2rem",
              borderRadius: "8px",
              backgroundColor: themes[theme].card.backgroundColor,
              color: themes[theme].card.textColor,
            }}
          >
            <Typography variant="h6">Cliente</Typography>
            <Typography variant="body1">Nombre: {client?.name}</Typography>
          </Box>

          {/* Productos de la orden */}
          <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
            Productos
          </Typography>
          <Grid container spacing={2}>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((orderProduct: OrderProduct) => (
                <Grid item xs={12} sm={6} md={4} key={orderProduct.id}>
                  <Paper
                    sx={{
                      padding: "1rem",
                      borderRadius: "8px",
                      backgroundColor: themes[theme].card.backgroundColor,
                      color: themes[theme].card.textColor,
                    }}
                  >
                    <Typography variant="body1">
                      Producto: {orderProduct.product?.name}
                    </Typography>
                    <Typography variant="body2">
                      Cantidad: {orderProduct.quantity}
                    </Typography>
                    <Typography variant="body2">
                      Precio: ${orderProduct.total_price}
                    </Typography>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No hay productos asociados a esta orden.
              </Typography>
            )}
          </Grid>
        </Box>
      </main>
    </div>
  );
};
