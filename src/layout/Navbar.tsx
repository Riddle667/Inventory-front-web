import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  CircularProgress,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

import { useThemeContext } from "@/context/themes/themesContext";

// Utility function to format dates
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
import { themes } from "@/context/themes/themes";
import { AppStore } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { GetAlertUseCase } from "@/useCase/alert/GetAlertUseCase";
import { Alert } from "@/models/alert";
import { AxiosError } from "axios";
import { ResponseAPI } from "@/utilities";
import { useNavigate } from "react-router-dom";
import { resetUser } from "@/redux";
import { LogoutUseCase } from "@/useCase/auth/LogoutUseCase";
import { ListItemIcon, ListItemText } from "@mui/material";

export const PrimarySearchAppBar: React.FC = () => {
  const { theme, toggleTheme, toggleCollapse, toggleSidebarMobile } = useThemeContext();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store: AppStore) => store.user);
  const token = user?.session_token ?? "";

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);

  const [anchorAlert, setAnchorAlert] = useState<null | HTMLElement>(null);
  const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const { data } = await GetAlertUseCase(token);
      console.log("data", data);
      setAlerts(data as Alert[]);
    } catch (error) {
      const e = error as AxiosError & ResponseAPI;
      if (e.expired === true) {
        dispatch(resetUser());
        navigate("/", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await LogoutUseCase(token);
      await dispatch(resetUser());
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: themes[theme].sidebar.backgroundColor,
        color: themes[theme].sidebar.color,
      }}
    >
      <Toolbar>
        {/* Botón menú */}
        <IconButton
      edge="start"
      color="inherit"
      onClick={isMobile ? toggleSidebarMobile : toggleCollapse}
    >
      <MenuIcon />
    </IconButton>

        {/* Título */}
        <Typography
          variant="h6"
          noWrap
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Dashboard
        </Typography>

        {/* Barra de búsqueda */}
        <div
          style={{
            position: "relative",
            borderRadius: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            marginLeft: 10,
            marginRight: 16,
            width: "100%",
            maxWidth: "300px",
          }}
        >
          <div
            style={{
              padding: "0 16px",
              height: "100%",
              position: "absolute",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Buscar…"
            inputProps={{ "aria-label": "search" }}
            style={{ color: "inherit", paddingLeft: "48px", width: "100%" }}
          />
        </div>

        {/* Elementos del lado derecho */}
        <div
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >
          {/* Notificaciones */}
          <IconButton
            color="inherit"
            onClick={(e) => setAnchorAlert(e.currentTarget)}
            aria-controls={anchorAlert ? "alert-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={anchorAlert ? "true" : undefined}
          >
            <Badge badgeContent={alerts.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Menu
            id="alert-menu"
            anchorEl={anchorAlert}
            open={Boolean(anchorAlert)}
            onClose={() => setAnchorAlert(null)}
            MenuListProps={{ "aria-labelledby": "alert-button" }}
            sx={{ minWidth: 300 }}
          >
            {loading ? (
              <MenuItem>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Cargando alertas...
              </MenuItem>
            ) : alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <MenuItem
                  key={index}
                  onClick={() => setAnchorAlert(null)}
                  sx={{
                    backgroundColor:
                      alert.priority === "HIGH"
                        ? "#ff6961"
                        : alert.priority === "MEDIUM"
                        ? "warning.light"
                        : "inherit",
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit", minWidth: 32 }}>
                    {alert.priority === "HIGH" ? (
                      <WarningIcon fontSize="small" />
                    ) : (
                      <NotificationsIcon fontSize="small" />
                    )}
                  </ListItemIcon>

                  <ListItemText
                    primary={alert.message}
                    secondary={
                      alert.createdAt
                        ? formatDate(alert.createdAt)
                        : alert.priority === "HIGH"
                        ? "Prioridad alta"
                        : undefined
                    }
                    primaryTypographyProps={{
                      fontSize: 14,
                    }}
                    secondaryTypographyProps={{
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  />
                </MenuItem>
              ))
            ) : (
              <MenuItem onClick={() => setAnchorAlert(null)}>
                No hay alertas
              </MenuItem>
            )}

            {!loading && alerts.length > 0 && (
              <MenuItem disabled divider>
                <Typography
                  variant="caption"
                  sx={{ width: "100%", textAlign: "center" }}
                >
                  Fin de alertas
                </Typography>
              </MenuItem>
            )}
          </Menu>

          {/* Tema claro/oscuro */}
          <IconButton color="inherit" onClick={toggleTheme}>
            {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* Menú de usuario */}
          <IconButton
            color="inherit"
            onClick={(e) => setAnchorUser(e.currentTarget)}
            aria-controls={anchorUser ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={anchorUser ? "true" : undefined}
          >
            <Avatar src={user.image || "src/assets/user.png"} />
          </IconButton>

          <Menu
            id="user-menu"
            anchorEl={anchorUser}
            open={Boolean(anchorUser)}
            onClose={() => setAnchorUser(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            MenuListProps={{ "aria-labelledby": "user-avatar-button" }}
          >
            <MenuItem disableRipple>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Avatar
                  src={user.image || "src/assets/user.png"}
                  sx={{ width: 48, height: 48 }}
                />
                <div>
                  <Typography variant="subtitle1">
                    {user.name} {user.lastname}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </div>
              </div>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => {
              setAnchorUser(null);
              navigate("/private/profile", { replace: true });
            } }>Mi perfil</MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
              }}
            >
              Cerrar sesión
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};
