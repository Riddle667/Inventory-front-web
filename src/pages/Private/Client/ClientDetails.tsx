import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
} from "@mui/material";
import { ArrowBack, Add, Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetCLientUseCase } from "@/useCase/client";
import { themes, useThemeContext } from "@/context";
import { Client, Order, PrivateRoutes } from "@/models";
import { AppStore } from "@/redux/store";
import { AxiosError } from "axios";
import { ResponseAPI } from "@/utilities";
import { resetUser } from "@/redux";

export const DetailsClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useThemeContext();
  const user = useSelector((store: AppStore) => store.user);
  const token = user?.session_token ?? "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);
        const { data: clientData } = (await GetCLientUseCase(
          Number(id),
          token
        )) as { data: Client };
        setOrders(clientData.orders ?? []);
        setClient(clientData);
        // Aquí podrías agregar la lógica para obtener las órdenes.
      } catch (error: unknown) {
        const e = error as AxiosError & ResponseAPI;
        if (e.message) {
          alert(`Error: ${e.message}`);
        } else {
          alert("Error al crear el cliente. Por favor, intente de nuevo.");
        }
        if (
          e.message === "No token provided" ||
          e.message === "token expired"
        ) {
          dispatch(resetUser());
          navigate("/", { replace: true });
        }
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [id, token]);

  return (
    <Box
      sx={{
        backgroundColor: themes[theme].sidebar.backgroundColor,
        color: themes[theme].text.paragraph,
        padding: "2rem",
        borderRadius: "8px",
        width: "90%",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        marginTop: "2rem",
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
          onClick={() =>
            navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.VIEW_CLIENTS}`)
          }
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
            color: themes[theme].text.title,
          }}
        >
          Detalles del Cliente
        </Typography>
      </Box>

      {/* Información del cliente */}
      {loading && (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
          <Typography>Cargando detalles del cliente...</Typography>
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && client && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start", // Alinea ambos contenedores en la parte superior
              gap: "2rem", // Espaciado entre la información del cliente y los totales
              marginBottom: "1rem",
            }}
          >
            {/* Información del Cliente */}
            <Box>
              <Typography
                variant="h5"
                sx={{ color: themes[theme].customerDetails.sectionTitle }}
              >
                Información del Cliente
              </Typography>
              <Typography
                sx={{ color: themes[theme].customerDetails.dynamicData }}
              >
                <strong style={{ color: themes[theme].customerDetails.label }}>
                  Nombre:
                </strong>{" "}
                {client.name ?? "No hay nombre"}
              </Typography>
              <Typography
                sx={{ color: themes[theme].customerDetails.dynamicData }}
              >
                <strong style={{ color: themes[theme].customerDetails.label }}>
                  Apellido:
                </strong>{" "}
                {client.lastName ?? "No disponible"}
              </Typography>
              <Typography
                sx={{ color: themes[theme].customerDetails.dynamicData }}
              >
                <strong style={{ color: themes[theme].customerDetails.label }}>
                  Teléfono:
                </strong>{" "}
                {client.phone ?? "No disponible"}
              </Typography>
              <Typography
                sx={{ color: themes[theme].customerDetails.dynamicData }}
              >
                <strong style={{ color: themes[theme].customerDetails.label }}>
                  Dirección:
                </strong>{" "}
                {client.address ?? "No disponible"}
              </Typography>
              <Typography
                sx={{ color: themes[theme].customerDetails.dynamicData }}
              >
                <strong style={{ color: themes[theme].customerDetails.label }}>
                  Rut:
                </strong>{" "}
                {client.rut ?? "No disponible"}
              </Typography>
            </Box>

            {/* Totales de Deuda y Pago */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column", // Mantiene los totales en una columna
                alignItems: "flex-end", // Alinea el contenido a la derecha
                gap: "0.5rem", // Espaciado entre el total pagado y la deuda
              }}
            >
              <Typography
                sx={{ color: themes[theme].customerDetails.totalsValue }}
              >
                <strong
                  style={{
                    color: themes[theme].customerDetails.totalsTitle,
                  }}
                >
                  Total Pagado:
                </strong>{" "}
                ${client.pay}
              </Typography>
              <Typography
                sx={{ color: themes[theme].customerDetails.totalsValue }}
              >
                <strong
                  style={{
                    color: themes[theme].customerDetails.totalsTitle,
                  }}
                >
                  Total Deuda:
                </strong>{" "}
                ${client.debt}
              </Typography>
            </Box>
          </Box>
        </>
      )}

      {/* Tabla de órdenes y botón para agregar */}
      {!loading && !error && (
        <>
          {/* Botón para agregar orden */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start", // Alinea ambos contenedores en la parte superior
              gap: "2rem", // Espaciado entre la información del cliente y los totales
              marginBottom: "1rem",
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: themes[theme].text.subtitle }}
            >
              Órdenes del Cliente
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                navigate(PrivateRoutes.CREATE_ORDER);
              }}
              sx={{
                backgroundColor:
                  themes[theme].customerDetails.addOrderButton.backgroundColor,
                color: themes[theme].customerDetails.addOrderButton.color,
                "&:hover": {
                  backgroundColor: themes[theme].menu.hover,
                },
              }}
            >
              Agregar Orden
            </Button>
          </Box>

          {/* Tabla */}

          <TableContainer
            className="mt-3"
            component={Paper}
            sx={{
              backgroundColor: themes[theme].sidebar.backgroundColor,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: themes[theme].menu.icon }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ color: themes[theme].menu.icon }}>
                    ¿Pagado?
                  </TableCell>
                  <TableCell sx={{ color: themes[theme].menu.icon }}>
                    Precio Total
                  </TableCell>
                  <TableCell sx={{ color: themes[theme].menu.icon }}>
                    Método de Pago
                  </TableCell>
                  <TableCell sx={{ color: themes[theme].menu.icon }}>
                    Fecha
                  </TableCell>
                  <TableCell sx={{ color: themes[theme].menu.icon }}>
                    ¿Cuotas?
                  </TableCell>
                  <TableCell sx={{ color: themes[theme].menu.icon }}>
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
                      {order.paid ? "Sí" : "No"}
                    </TableCell>
                    <TableCell sx={{ color: themes[theme].menu.icon }}>
                      ${order.total_price}
                    </TableCell>
                    <TableCell sx={{ color: themes[theme].menu.icon }}>
                      {order.pay_method === "cash"
                        ? "Efectivo"
                        : order.pay_method === "card"
                        ? "Tarjeta"
                        : order.pay_method === "transfer"
                        ? "Transferencia"
                        : "Otro"}
                    </TableCell>
                    <TableCell sx={{ color: themes[theme].menu.icon }}>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "Fecha no disponible"}
                    </TableCell>
                    <TableCell sx={{ color: themes[theme].menu.icon }}>
                      {order.is_installment ? "Sí" : "No"}
                    </TableCell>
                    <TableCell sx={{ color: themes[theme].menu.icon }}>
                      <IconButton
                        onClick={() => {
                          navigate(
                            `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.DETAILS_CLIENTS}/${id}/${PrivateRoutes.DETAILS_ORDER}/${order.id}`
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
        <Typography
          marginTop="30px"
          sx={{ color: themes[theme].text.paragraph }}
        >
          No se encontraron órdenes para este cliente.
        </Typography>
      )}
    </Box>
  );
};
