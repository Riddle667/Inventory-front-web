import GenericConfirmationModal from "@/components/modals/GenericConfirmationModal";
import { themes, useThemeContext } from "@/context";
import { Order, OrderProduct, PrivateRoutes } from "@/models";
import { resetUser } from "@/redux";
import { AppStore } from "@/redux/store";
import { PayInstallmentOrderUseCase, PayOrderUseCase } from "@/useCase";
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
  Button,
  Tooltip,
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
  const [paymentType, setPaymentType] = useState<"full" | "installment" | null>(
    null
  );
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [installmentId, setInstallmentId] = useState(0);

  const fetchOrder = async () => {
    try {
      const { data } = await GetOrderUseCase(Number(id), token);
      setOrderDetails(data as Order);
      console.log(data);
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

  const handleOpenPaymentModal = (type: "full" | "installment") => {
    setPaymentType(type);
    setOpenPaymentModal(true);
  };

  const handleConfirmPayment = async (installmentId?: number) => {
    if (paymentType === "full") {
      try {
        if (orderDetails?.id !== undefined) {
          const response = await PayOrderUseCase(token, orderDetails.id);
          console.log(response);
        } else {
          console.error("Order ID is undefined");
        }
      } catch (error) {
        console.error("Error al pagar la orden:", error);
      }
    } else if (paymentType === "installment") {
      if (installmentId !== undefined) {
        try {
          if (orderDetails?.id !== undefined) {
            const response = await PayInstallmentOrderUseCase(
              token,
              orderDetails.id,
              installmentId
            );
            console.log(response);
          } else {
            console.error("Order ID is undefined");
          }
        } catch (error) {
          console.error("Error al pagar la cuota:", error);
        }
      } else {
        console.error("Installment ID is undefined");
      }
    }
    setOpenPaymentModal(false);
    window.location.reload();
  };

  return (
    <Box
      sx={{
        backgroundColor: themes[theme].sidebar.backgroundColor,
        padding: "2rem",
        borderRadius: "12px",
        width: "90%",
        margin: "2rem auto",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
        overflowY: "auto",
      }}
    >
      {/* Encabezado */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={handleBack}>
          <ArrowBack sx={{ color: themes[theme].menu.icon }} />
        </IconButton>
        <Typography
          variant="h5"
          sx={{ ml: 2, fontWeight: 600, color: themes[theme].menu.icon }}
        >
          Detalles de la Orden
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Información de la orden */}
      <Paper
        sx={{
          padding: "1.5rem",
          backgroundColor: themes[theme].sidebar.backgroundColor,
          color: themes[theme].sidebar.color,
          mb: 3,
          borderRadius: "12px",
        }}
      >
        <Typography variant="body1">
          <strong>ID:</strong> {orderDetails?.id}
        </Typography>
        <Typography variant="body1">
          <strong>Total:</strong> ${total_price}
        </Typography>
        <Typography variant="body1">
          <strong>Método de Pago:</strong>{" "}
          {pay_method === "cash"
            ? "Efectivo"
            : pay_method === "card"
            ? "Tarjeta"
            : pay_method === "transfer"
            ? "Transferencia"
            : "Otro"}
        </Typography>
        <Typography variant="body1">
          <strong>Fecha:</strong>{" "}
          {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
        </Typography>

        <Typography variant="body1">
          <strong>¿Con cuotas?:</strong> {is_installment ? "Sí" : "No"}
        </Typography>
        <Typography variant="body1">
          <strong>Pagada:</strong> {paid ? "Sí" : "No"}
        </Typography>

        {/* 🔧 Agregado: Botón para pagar la orden si no es con cuotas y no está pagada */}
        {!is_installment && !paid && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenPaymentModal("full")}
            sx={{ mt: 2 }}
          >
            Pagar Orden
          </Button>
        )}
      </Paper>

      {/* Información del cliente */}
      <Paper
        sx={{
          padding: "1.5rem",
          backgroundColor: themes[theme].card.backgroundColor,
          color: themes[theme].card.textColor,
          mb: 3,
          borderRadius: "12px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Cliente
        </Typography>
        <Typography variant="body1">
          <strong>Nombre:</strong> {client?.name} {client?.lastName}
        </Typography>
        <Typography variant="body1">
          <strong>RUT:</strong> {client?.rut ?? "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>Teléfono:</strong> {client?.phone}
        </Typography>
        <Typography variant="body1">
          <strong>Dirección:</strong> {client?.address}
        </Typography>
      </Paper>

      {/* Productos */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Productos
        </Typography>
        <Grid container spacing={2}>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((orderProduct: OrderProduct) => (
              <Grid item xs={12} sm={6} md={4} key={orderProduct.id}>
                <Paper
                  sx={{
                    padding: "1rem",
                    borderRadius: "12px",
                    backgroundColor: themes[theme].card.backgroundColor,
                    color: themes[theme].card.textColor,
                  }}
                >
                  <Typography variant="body1">
                    <strong>Producto:</strong> {orderProduct.product?.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Descripción:</strong>{" "}
                    {orderProduct.product?.description}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Activo:</strong>{" "}
                    {orderProduct.product?.is_active ? "Sí" : "No"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Cantidad:</strong> {orderProduct.quantity}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Precio Total:</strong> ${orderProduct.total_price}
                  </Typography>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              No hay productos asociados a esta orden.
            </Typography>
          )}
        </Grid>
      </Box>

      {/* Cuotas */}
      {is_installment &&
        orderDetails?.installments &&
        orderDetails.installments.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Cuotas
            </Typography>
            <Grid container spacing={2}>
              {orderDetails.installments.map((installment, index) => {
                // Verifica si alguna cuota anterior no ha sido pagada
                const previousUnpaid = orderDetails?.installments
                  ?.slice(0, index)
                  ?.some((prev) => !prev.paid);

                return (
                  <Grid item xs={12} sm={6} md={4} key={installment.id}>
                    <Paper
                      sx={{
                        padding: "1rem",
                        borderRadius: "12px",
                        backgroundColor: themes[theme].card.backgroundColor,
                        color: themes[theme].card.textColor,
                      }}
                    >
                      <Typography variant="body2">
                        <strong>Cuota N°:</strong>{" "}
                        {installment.installment_number}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Monto:</strong> ${installment.amount.toString()}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Fecha Vencimiento:</strong>{" "}
                        {new Date(installment.due_date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Pagada:</strong>{" "}
                        {installment.paid ? "Sí" : "No"}
                      </Typography>

                      {/* 🔒 Botón de pago bloqueado si hay cuotas anteriores impagas */}
                      <Tooltip
                        title={
                          previousUnpaid
                            ? "Debes pagar las cuotas anteriores primero"
                            : installment.paid
                            ? "Ya se encuentra pagada la cuota"
                            : ""
                        }
                        arrow
                      >
                        <span>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              handleOpenPaymentModal("installment");
                              setInstallmentId(installment.id);
                            }}
                            disabled={previousUnpaid || installment.paid}
                            sx={{ mt: 1, minWidth: "140px" }}
                          >
                            Pagar Cuota
                          </Button>
                        </span>
                      </Tooltip>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      <GenericConfirmationModal
        open={openPaymentModal}
        onClose={() => setOpenPaymentModal(false)}
        onConfirm={() => handleConfirmPayment(installmentId)}
        title={
          paymentType === "full"
            ? "¿Confirmar pago completo?"
            : "¿Confirmar pago en cuotas?"
        }
        message={
          paymentType === "full"
            ? "Estás a punto de realizar el pago total de este pedido. ¿Deseas continuar?"
            : "Este pedido se pagará en cuotas. ¿Deseas continuar con esta opción?"
        }
        confirmButtonText="Confirmar pago"
        cancelButtonText="Cancelar"
      />
    </Box>
  );
};
