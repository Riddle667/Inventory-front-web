import React, { useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  MenuItemStyles,
  menuClasses,
} from "react-pro-sidebar";
import { useThemeContext } from "@/context/themes/themesContext";
import { themes, hexToRgba } from "@/context/themes/themes";
import {
  Dashboard,
  Inventory,
  People,
  Category,
  BarChart,
} from "@mui/icons-material";
import { SidebarHeader, Typography } from "@/components";
import { PrivateRoutes } from "@/models";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

export const AppSidebar: React.FC = () => {
  const { theme, hasImage, collapsed, toggled, setToggled } = useThemeContext();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Ocultar sidebar en móvil cuando cambies de ruta (opcional, pero buena UX)
  useEffect(() => {
    if (!isMobile) {
      setToggled(false);
    }
  }, [isMobile]);

  const menuItemStyles: MenuItemStyles = {
    root: { fontSize: "13px", fontWeight: 400 },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: { color: "#b6b7b9" },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(
              themes[theme].menu.menuContent,
              hasImage && !collapsed ? 0.4 : 1
            )
          : "transparent",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          hasImage ? 0.8 : 1
        ),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({ fontWeight: open ? 600 : undefined }),
  };

  return (
    <Sidebar
      collapsed={!isMobile && collapsed}
      toggled={isMobile ? toggled : true}
      onBackdropClick={() => setToggled(false)}
      image={
        hasImage
          ? "https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
          : undefined
      }
      rtl={false}
      breakPoint="md"
      backgroundColor={hexToRgba(
        themes[theme].sidebar.backgroundColor,
        hasImage ? 0.9 : 1
      )}
      rootStyles={{ color: themes[theme].sidebar.color }}
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <SidebarHeader
          rtl={false}
          style={{ marginBottom: "24px", marginTop: "16px" }}
        />
        <div style={{ flex: 1, marginBottom: "32px" }}>
          <div style={{ padding: "0 24px", marginBottom: "8px" }}>
            <Typography
              variant="body2"
              fontWeight={600}
              style={{
                opacity: collapsed && !isMobile ? 0 : 0.7,
                letterSpacing: "0.5px",
              }}
            >
              General
            </Typography>
          </div>
          <Menu menuItemStyles={menuItemStyles}>
            <MenuItem icon={<Dashboard />} component={<Link to="/" />}>
              Dashboard
            </MenuItem>
            <MenuItem
              icon={<Inventory />}
              component={
                <Link
                  to={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.VIEW_PRODUCTS}`}
                />
              }
            >
              Productos
            </MenuItem>
            <MenuItem
              icon={<People />}
              component={
                <Link
                  to={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.VIEW_CLIENTS}`}
                />
              }
            >
              Clientes
            </MenuItem>
            <MenuItem
              icon={<Category />}
              component={
                <Link
                  to={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.VIEW_CATEGORIES}`}
                />
              }
            >
              Categorías
            </MenuItem>
            <SubMenu label="Estadísticas" icon={<BarChart />}>
              <MenuItem>Clientes con Deuda</MenuItem>
              <MenuItem>Productos con Bajo Stock</MenuItem>
              <MenuItem>Productos Más Vendidos</MenuItem>
              <MenuItem>Ventas por Categoría</MenuItem>
            </SubMenu>
          </Menu>
        </div>
      </div>
    </Sidebar>
  );
};
