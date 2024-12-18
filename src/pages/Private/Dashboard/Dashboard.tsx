import { Box, Typography, Divider, Grid } from "@mui/material";
import { themes } from "@/context/themes/themes";
import { useThemeContext } from "@/context/themes/themesContext";
import { AppSidebar, PrimarySearchAppBar } from "@/layout";
import BarChartComponent from "@/components/chart/BarChartComponent";
import DataTableComponent from "@/components/chart/DataTableComponent";
import { Card } from "@tremor/react";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import { GetStatisticsDashboardUseCase } from "@/useCase/statistics/GetStatisticsDashboardUseCase";
import DynamicTable from "@/components/chart/DataTableComponent";

interface Statistics {
  totalIncome: number;
  salesByMonth: [];
  clientsWithDebt: [];
  installmentTotal: number;
  lowStockProducts: [];
  inventoryValue: number;
  topSellingProducts: [];
  salesByCategory: [];
}

export const Dashboard = () => {
  const { theme } = useThemeContext();
  const [salesData, setSalesData] = useState<
    { date: string; "Este año": number; "El año pasado": number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<Statistics>();

  // Columnas para tablas de datos
  const debtColumns = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "name" },
    { header: "Apellido", accessor: "lastName" },
    { header: "Deuda", accessor: "debt" },
  ];
  const lowStockColumns = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "name" },
    { header: "Stock", accessor: "stock" },
  ];

  // Formatear datos de ventas por mes
  const formatSalesData = async (groupedSales: []) => {
    const months = [
      ["January", "Enero"],
      ["February", "Febrero"],
      ["March", "Marzo"],
      ["April", "Abril"],
      ["May", "Mayo"],
      ["June", "Junio"],
      ["July", "Julio"],
      ["August", "Agosto"],
      ["September", "Septiembre"],
      ["October", "Octubre"],
      ["November", "Noviembre"],
      ["December", "Diciembre"],
    ];

    return months.map((month) => ({
      date: month[1],
      "Este año": groupedSales.thisYear[month[0]] || 0,
      "El año pasado": groupedSales.lastYear[month[0]] || 0,
    }));
  };

  // Obtener estadísticas del backend
  const getStatisticsDashboard = async () => {
    try {
      setLoading(true);
      const { data } = await GetStatisticsDashboardUseCase();
      setStatistics(data as Statistics);

      const formattedData = await formatSalesData(data.salesByMonth);
      setSalesData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!statistics) {
      getStatisticsDashboard();
    }
  }, [statistics]);

  return (
    <div style={{ display: "flex", height: "100vh", direction: "ltr" }}>
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <main
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {/* Top App Bar */}
        <PrimarySearchAppBar />

        {/* Dashboard Container */}
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
          {/* Dashboard Header */}
          <Typography
            variant="h4"
            sx={{ color: themes[theme].menu.icon, marginBottom: "1rem" }}
          >
            Dashboard de Inventario
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "2rem" }}
          >
            Analiza el rendimiento del inventario y las estadísticas clave para
            optimizar decisiones.
          </Typography>

          {/* General Statistics Section */}
          <Typography
            variant="h5"
            sx={{ color: themes[theme].menu.icon, marginBottom: "1rem" }}
          >
            Estadísticas Generales
          </Typography>
          <Grid container spacing={3} sx={{ marginBottom: "2rem" }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <Typography variant="subtitle1">Ingresos Totales</Typography>
                <Typography variant="h6">
                  {statistics?.totalIncome
                    ? new Intl.NumberFormat("es-CL").format(
                        statistics?.totalIncome
                      )
                    : "0"}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <Typography variant="subtitle1">Valor del Inventario</Typography>
                <Typography variant="h6">
                  {statistics?.inventoryValue
                    ? new Intl.NumberFormat("es-CL").format(
                        statistics?.inventoryValue
                      )
                    : "0"}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <Typography variant="subtitle1">Deuda Total</Typography>
                <Typography variant="h6">
                  {statistics?.installmentTotal
                    ? new Intl.NumberFormat("es-CL").format(
                        statistics?.installmentTotal
                      )
                    : "0"}
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Sales Chart Section */}
          <Typography
            variant="h5"
            sx={{ color: themes[theme].menu.icon, marginBottom: "1rem" }}
          >
            Gráficos de Ventas
          </Typography>
          <Grid container spacing={3} sx={{ marginBottom: "2rem" }}>
            <Grid item xs={12}>
              {loading ? (
                <Typography>Cargando gráfico...</Typography>
              ) : (
                <BarChartComponent
                  title="Ganancias Mensuales"
                  description="Comparación de ganancias entre este año y el pasado."
                  data={salesData}
                  defaultCategories={["Este año"]}
                  comparisonCategories={["Este año", "El año pasado"]}
                  colors={["blue"]}
                  comparisonColors={["blue", "cyan"]}
                  index="date"
                />
              )}
            </Grid>
          </Grid>

          {/* Data Tables Section */}
          <Typography
            variant="h5"
            sx={{ color: themes[theme].menu.icon, marginBottom: "1rem" }}
          >
            Tablas de Datos
          </Typography>

          <Divider sx={{ marginY: "2rem" }} />

          <Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
    <Card>
      <Typography variant="subtitle1">Clientes con Deudas</Typography>
      {statistics?.clientsWithDebt?.length ?? 0 > 0 ? (
        <DynamicTable
          columns={debtColumns}
          data={statistics?.clientsWithDebt || []}
        />
      ) : (
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          No hay clientes con deudas.
        </Typography>
      )}
    </Card>
  </Grid>

  <Grid item xs={12} sm={6}>
    <Card>
      <Typography variant="subtitle1">Productos con Bajo Stock</Typography>
      {statistics?.lowStockProducts?.length ?? 0 > 0 ? (
        <DynamicTable
          columns={lowStockColumns}
          data={statistics?.lowStockProducts || []}
        />
      ) : (
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          No hay productos con bajo stock.
        </Typography>
      )}
    </Card>
  </Grid>
</Grid>
        </Box>
      </main>
    </div>
  );
};

