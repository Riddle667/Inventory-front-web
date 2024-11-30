import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ImageIcon from '@mui/icons-material/Image';
import HideImageIcon from '@mui/icons-material/HideImage';
import { useThemeContext } from "@/context/themes/themesContext";
import { themes } from "@/context/themes/themes" // Ajusta esta importación si es necesario
import { AppStore } from "@/redux/store";
import { useSelector } from "react-redux";

export const PrimarySearchAppBar: React.FC = () => {
  const { theme, hasImage, toggleTheme, toggleImage, toggleCollapse } = useThemeContext();
  const user = useSelector((store: AppStore) => store.user);


  return (
    <AppBar position="static" style={{ backgroundColor: themes[theme].sidebar.backgroundColor, color: themes[theme].sidebar.color }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={ toggleCollapse}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Dashboard
        </Typography>

        {/* Barra de búsqueda */}
        <div
          style={{
            position: "relative",
            borderRadius: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            marginRight: "16px",
            marginLeft: 10,
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
          <InputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} style={{ color: "inherit", paddingLeft: "48px", width: "100%" }} />
        </div>

        {/* Sección de acciones */}
        <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Cambiar tema */}
          <IconButton color="inherit" aria-label="change theme" onClick={toggleTheme}>
            {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* Imagen del producto */}
          <IconButton color="inherit" aria-label="toggle image" onClick={toggleImage}>
            <Badge color="secondary">
              {hasImage ? <HideImageIcon /> : <ImageIcon />}
            </Badge>
          </IconButton>

          {/* Imagen de usuario */}
          <IconButton color="inherit" aria-label="User Image">
            {
              user.image ? <Avatar alt="User Image" src={user.image} /> : <Avatar alt="User Image" src="src/assets/user.png" />
            }
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};
