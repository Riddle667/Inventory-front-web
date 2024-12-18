import React from "react";
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
import { Dashboard, Inventory, People, Category, ShoppingCart, Money, BarChart, Settings,} from "@mui/icons-material";
import {SidebarHeader, Typography } from "@/components";
import { PrivateRoutes } from "@/models";
import { Link } from "react-router-dom";

export const AppSidebar: React.FC = () => {
  const { theme, hasImage, collapsed } = useThemeContext();

  const menuItemStyles: MenuItemStyles = {
    root: { fontSize: "13px", fontWeight: 400 },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: { color: themes[theme].menu.disabled.color },
    },
    SubMenuExpandIcon: { color: "#b6b7b9" },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1)
          : "transparent",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: { color: themes[theme].menu.disabled.color },
      "&:hover": {
        backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({ fontWeight: open ? 600 : undefined }),
  };

  return (
    <Sidebar
      collapsed={collapsed}
      image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
      rtl={false}
      breakPoint="md"
      backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
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
              style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px" }}
            >
              General
            </Typography>
          </div>
          <Menu menuItemStyles={menuItemStyles}>
            {/* Dashboard Overview */}
            <MenuItem icon={<Dashboard />} component={<Link to={"/"} />}>Dashboard</MenuItem>

            {/* Gestión de Productos */}
            <MenuItem icon={<Inventory />} component={<Link to={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.VIEW_PRODUCTS}`} />} >Productos</MenuItem>

            {/* Gestión de Clientes */}
            <MenuItem icon={<People />} component={<Link to={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.VIEW_CLIENTS}`} />} >Clientes</MenuItem>

            {/* Gestión de Categorías */}
            
            <MenuItem icon={<Category />} component={<Link to={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.VIEW_CATEGORIES}` } />}>Categorías</MenuItem>
            
            {/* Órdenes y Ventas */}
            <SubMenu label="Órdenes y Ventas" icon={<ShoppingCart />}>
              <MenuItem>Registrar Orden</MenuItem>
              <MenuItem>Ver Órdenes</MenuItem>
              <MenuItem>Gestionar Pagos</MenuItem>
            </SubMenu>

            {/* Finanzas y Reportes */}
            <SubMenu label="Finanzas" icon={<Money />}>
              <MenuItem>Ingresos Totales</MenuItem>
              <MenuItem>Pagos Pendientes</MenuItem>
              <MenuItem>Ventas por Mes</MenuItem>
            </SubMenu>

            {/* Estadísticas */}
            <SubMenu label="Estadísticas" icon={<BarChart />}>
              <MenuItem>Clientes con Deuda</MenuItem>
              <MenuItem>Productos con Bajo Stock</MenuItem>
              <MenuItem>Productos Más Vendidos</MenuItem>
              <MenuItem>Ventas por Categoría</MenuItem>
            </SubMenu>

            {/* Configuración */}
            <SubMenu label="Configuración" icon={<Settings />}>
              <MenuItem>Preferencias</MenuItem>
              <MenuItem>Seguridad</MenuItem>
            </SubMenu>
          </Menu>

          <div
            style={{
              padding: "0 24px",
              marginBottom: "8px",
              marginTop: "32px",
            }}
          >
            <Typography
              variant="body2"
              fontWeight={600}
              style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px" }}
            >
              Extra
            </Typography>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};
