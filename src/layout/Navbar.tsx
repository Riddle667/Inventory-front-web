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

interface PrimarySearchAppBarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  hasImage: boolean;
  setHasImage: (hasImage: boolean) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  handleThemeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PrimarySearchAppBar: React.FC<PrimarySearchAppBarProps> = ({
  collapsed,
  setCollapsed,
  hasImage,
  setHasImage,
  theme,
  handleThemeChange,
}) => {
  const toggleTheme = () => {
    const event = {
      target: {
        checked: theme !== "dark",
      },
    };
    handleThemeChange(event as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}>
          Dashboard
        </Typography>
          <div
            style={{
              position: "relative",
              borderRadius: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.25)",
              },
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
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              style={{
                color: "inherit",
                paddingLeft: "48px",
                width: "100%",
              }}
            />
          </div>
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
          <IconButton
            color="inherit"
            aria-label="change theme"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="toggle image"
            onClick={() => setHasImage(!hasImage)}
          >
            <Badge color="secondary">
              {hasImage ? <HideImageIcon /> : <ImageIcon />}
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="User Image"
          >
            <Avatar alt="User Image" src="/path/to/user/image.jpg" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};
