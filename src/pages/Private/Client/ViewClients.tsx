import { useThemeContext } from "@/context/themes/themesContext";
import { themes } from "@/context/themes/themes";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableContainer,
  TextField,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Client, PrivateRoutes } from "@/models";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "@/redux";
import { useNavigate } from "react-router-dom";
import { AddBlackListUseCase, ViewClientsUseCase } from "@/useCase/client";
import { AppStore } from "@/redux/store";
import { AxiosError } from "axios";
import { ResponseAPI } from "@/utilities";

export const ViewClients: React.FC = () => {
  const { theme } = useThemeContext();
  const [filters, setFilters] = useState({
    name: "",
    lastName: "",
    phone: "",
    address: "",
    rut: "",
    isBlackList: "all", // Nuevo filtro para la lista negra
  });
  const [clients, setClients] = useState<Client[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store: AppStore) => store.user);
  const token = user?.session_token ?? "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlackListFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setFilters((prev) => ({ ...prev, isBlackList: value }));
  };

  const handleAddBlackList = async (id: number) => {
    try {
      const { data } = (await AddBlackListUseCase(id, token)) as {
        data: Client;
      };
      if (data.isBlackList) {
        alert("Cliente añadido a la lista negra.");
      } else {
        alert("Cliente eliminado de la lista negra.");
      }
      fetchClients();
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      if (e.message) {
        alert(`Error: ${e.message}`);
      } else {
        alert("Error al crear el cliente. Por favor, intente de nuevo.");
      }
      if (e.message === "No token provided" || e.message === "token expired") {
        dispatch(resetUser());
        navigate("/", { replace: true });
      }
    }
  };

  const fetchClients = async () => {
    try {
      const { data } = await ViewClientsUseCase(token);
      setClients(data as Client[]);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      if (e.message) {
        alert(`Error: ${e.message}`);
      } else {
        alert("Error al crear el cliente. Por favor, intente de nuevo.");
      }
      if (e.message === "No token provided" || e.message === "token expired") {
        dispatch(resetUser());
        navigate("/", { replace: true });
      }
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter((client) => {
    const matchesFilters =
      (client.name?.toLowerCase() || "").includes(filters.name.toLowerCase()) &&
      (client.lastName?.toLowerCase() || "").includes(
        filters.lastName.toLowerCase()
      ) &&
      (client.phone?.toLowerCase() || "").includes(
        filters.phone.toLowerCase()
      ) &&
      (client.address?.toLowerCase() || "").includes(
        filters.address.toLowerCase()
      ) &&
      (client.rut?.toLowerCase() || "").includes(filters.rut.toLowerCase());

    const matchesBlackListFilter =
      filters.isBlackList === "all" ||
      (filters.isBlackList === "yes" && client.isBlackList) ||
      (filters.isBlackList === "no" && !client.isBlackList);

    return matchesFilters && matchesBlackListFilter;
  });

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
        Lista de Clientes
      </Typography>

      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
        <div>
          <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Ingresa algunos de los siguientes datos del cliente para filtrar.
          </p>
        </div>
        <button
          type="button"
          className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
          onClick={() => {
            navigate(
              `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.CREATE_CLIENT}`
            );
          }}
        >
          Agregar Cliente
        </button>
      </div>

      {/* Filtros */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          backgroundColor: themes[theme].sidebar.backgroundColor,
          padding: "0.5rem",
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          marginTop: "1rem",
        }}
      >
        <TextField
          label="Nombre"
          name="name"
          value={filters.name}
          onChange={handleInputChange}
          fullWidth
          sx={{ flex: "1 1 200px" }}
          margin="dense"
          InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
        />
        <TextField
          label="Apellido"
          name="lastName"
          value={filters.lastName}
          onChange={handleInputChange}
          fullWidth
          sx={{ flex: "1 1 200px" }}
          margin="dense"
          InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
        />
        <TextField
          label="Teléfono"
          name="phone"
          value={filters.phone}
          onChange={handleInputChange}
          fullWidth
          sx={{ flex: "1 1 200px" }}
          margin="dense"
          InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
        />
        <TextField
          label="RUT"
          name="rut"
          value={filters.rut}
          onChange={handleInputChange}
          fullWidth
          sx={{ flex: "1 1 200px" }}
          margin="dense"
          InputLabelProps={{ style: { color: themes[theme].menu.icon } }}
        />
        <select
          name="blacklist"
          value={filters.isBlackList}
          onChange={handleBlackListFilterChange}
          style={{
            flex: "1 1 200px",
            height: "55px",
            marginTop: "0.5rem",
            borderRadius: "4px",
            color: themes[theme].menu.icon,
            backgroundColor: themes[theme].sidebar.backgroundColor,
          }}
        >
          <option value="all">Todos</option>
          <option value="yes">En lista negra</option>
          <option value="no">Permitidos</option>
        </select>
      </Box>

      <TableContainer
        className="mt-8"
        component={Paper}
        sx={{
          backgroundColor: themes[theme].sidebar.backgroundColor,
          overflowX: "auto",
          marginTop: "2rem",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ color: themes[theme].menu.icon, fontWeight: "bold" }}
              >
                Nombre
              </TableCell>
              <TableCell
                sx={{ color: themes[theme].menu.icon, fontWeight: "bold" }}
              >
                Apellido
              </TableCell>
              <TableCell
                sx={{ color: themes[theme].menu.icon, fontWeight: "bold" }}
              >
                Teléfono
              </TableCell>
              <TableCell
                sx={{ color: themes[theme].menu.icon, fontWeight: "bold" }}
              >
                Dirección
              </TableCell>
              <TableCell
                sx={{ color: themes[theme].menu.icon, fontWeight: "bold" }}
              >
                Rut
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: themes[theme].menu.icon, fontWeight: "bold" }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow
                key={client.id}
                sx={{
                  backgroundColor: client.isBlackList
                    ? themes[theme].table.disabledBackgroundColor
                    : "inherit",
                  opacity: client.isBlackList ? 0.6 : 1,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                  transition: "background-color 0.2s",
                }}
              >
                <TableCell sx={{ color: themes[theme].menu.icon }}>
                  {client.name}
                </TableCell>
                <TableCell sx={{ color: themes[theme].menu.icon }}>
                  {client.lastName}
                </TableCell>
                <TableCell sx={{ color: themes[theme].menu.icon }}>
                  {client.phone}
                </TableCell>
                <TableCell sx={{ color: themes[theme].menu.icon }}>
                  {client.address}
                </TableCell>
                <TableCell sx={{ color: themes[theme].menu.icon }}>
                  {client.rut}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: themes[theme].menu.icon,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box display="flex" justifyContent="center" gap={1}>
                    <Tooltip title="Ver detalles">
                      <IconButton
                        onClick={() =>
                          navigate(
                            `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.DETAILS_CLIENTS}/${client.id}`
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
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Editar cliente">
                      <IconButton
                        onClick={() =>
                          navigate(
                            `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.UPDATE_CLIENT}/${client.id}`
                          )
                        }
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
                    </Tooltip>

                    <Tooltip
                      title={
                        client.isBlackList
                          ? "Quitar de lista negra"
                          : "Agregar a lista negra"
                      }
                    >
                      <IconButton
                        onClick={() => handleAddBlackList(client.id)}
                        sx={{
                          color: client.isBlackList ? "#616161" : "#d32f2f",
                          backgroundColor: client.isBlackList
                            ? "rgba(97, 97, 97, 0.1)"
                            : "rgba(211, 47, 47, 0.1)",
                          "&:hover": {
                            backgroundColor: client.isBlackList
                              ? "rgba(97, 97, 97, 0.2)"
                              : "rgba(211, 47, 47, 0.2)",
                          },
                        }}
                      >
                        <BlockIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Aquí seguiría tu tabla de clientes como la tienes */}
      {/* ... */}
    </Box>
  );
};
