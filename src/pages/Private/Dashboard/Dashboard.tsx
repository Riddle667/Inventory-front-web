import { Box, Typography, Divider } from "@mui/material";
import { themes } from "@/context/themes/themes";
import { useThemeContext } from "@/context/themes/themesContext";
import { AppSidebar, PrimarySearchAppBar } from "@/layout";
import BarChartComponent from "@/components/chart/BarChartComponent";
import DonutChartComponent from "@/components/chart/DonutChartComponent";
import LineChartComponent from "@/components/chart/LineChartComponent";
import AreaChartComponent from "@/components/chart/AreaChartComponent";
import DataTableComponent from "@/components/chart/DataTableComponent";
import { Card } from "@tremor/react";
import "./Dashboard.css";

export const Dashboard = () => {
  const { theme } = useThemeContext();

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
          className="scroll-container"
          sx={{
            backgroundColor: themes[theme].sidebar.backgroundColor,
            color: themes[theme].sidebar.color,
            padding: "2rem",
            borderRadius: "8px",
            width: "90%",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            marginTop: "2rem",
            marginBottom: "2rem",
            overflowY: "scroll",
          }}
        >
          {/* Encabezado del Dashboard */}
          <Typography
            variant="h4"
            sx={{
              color: themes[theme].menu.icon,
              marginBottom: "1rem",
            }}
          >
            Dashboard de Inventario
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: "2rem",
            }}
          >
            Visualiza el rendimiento, las estadísticas de inventario y los datos clave para la toma de decisiones.
          </Typography>

          {/* Sección de Gráficos */}
          <Typography
            variant="h5"
            sx={{
              color: themes[theme].menu.icon,
              marginBottom: "1rem",
            }}
          >
            Estadísticas Generales
          </Typography>
          <Typography
            variant="body2"
            sx={{
              marginBottom: "1.5rem",
            }}
          >
            Los gráficos a continuación muestran información detallada sobre las tendencias de ventas, el rendimiento del inventario y la distribución de categorías.
          </Typography>
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
            <AreaChartComponent />
            <BarChartComponent />
            <DonutChartComponent />
            <LineChartComponent />
          </div>

          {/* Separador visual */}
          <Divider sx={{ marginY: "2rem", backgroundColor: themes[theme].menu.icon }} />

          {/* Sección de Tabla */}
          <Typography
            variant="h5"
            sx={{
              color: themes[theme].menu.icon,
              marginBottom: "1rem",
            }}
          >
            Resumen de Datos
          </Typography>
          <Typography
            variant="body2"
            sx={{
              marginBottom: "1.5rem",
            }}
          >
            La tabla contiene datos relevantes sobre productos, categorías y otros aspectos clave del inventario.
          </Typography>
          <Card title="Tabla de Datos" className="mt-6">
            <DataTableComponent />
          </Card>
        </Box>
      </main>
    </div>
  );
};

export default Dashboard;
