import { Box, Typography, Divider, Grid, Button } from "@mui/material";
import { themes } from "@/context/themes/themes";
import { useThemeContext } from "@/context/themes/themesContext";
import BarChartComponent from "@/components/chart/BarChartComponent";
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

      const formattedData = await formatSalesData((data as Statistics).salesByMonth);
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
        <Box
          className="scroll-container"
          sx={{
            backgroundColor: themes[theme].sidebar.backgroundColor,
            color: themes[theme].sidebar.color,
            padding: 4,
            borderRadius: 2,
            width: "90%",
            margin: "2rem auto",
            boxShadow: 3,
            overflowY: "scroll",
            maxHeight: "calc(100vh - 100px)",
            scrollbarWidth: "auto", // Firefox
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
        >
          {/* Header */}
          <Typography
            variant="h4"
            sx={{ color: themes[theme].menu.icon, mb: 2 }}
          >
            Dashboard de Inventario
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Analiza el rendimiento del inventario y las estadísticas clave para
            optimizar decisiones.
          </Typography>

          {/* Estadísticas Generales */}
          <Typography
            variant="h5"
            sx={{ color: themes[theme].menu.icon, mb: 2 }}
          >
            Estadísticas Generales
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card style={{ padding: "16px" }}>
                <Typography variant="subtitle1">Ingresos Totales</Typography>
                <Typography variant="h6">
                  {statistics?.totalIncome
                    ? new Intl.NumberFormat("es-CL").format(
                        statistics.totalIncome
                      )
                    : "0"}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card style={{ padding: "16px" }}>
                <Typography variant="subtitle1">
                  Valor del Inventario
                </Typography>
                <Typography variant="h6">
                  {statistics?.inventoryValue
                    ? new Intl.NumberFormat("es-CL").format(
                        statistics.inventoryValue
                      )
                    : "0"}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card style={{ padding: "16px" }}>
                <Typography variant="subtitle1">Deuda Total</Typography>
                <Typography variant="h6">
                  {statistics?.installmentTotal
                    ? new Intl.NumberFormat("es-CL").format(
                        statistics.installmentTotal
                      )
                    : "0"}
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Gráficos de Ventas */}
          <Typography
            variant="h5"
            sx={{ color: themes[theme].menu.icon, mb: 2 }}
          >
            Gráficos de Ventas
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
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

          {/* Tablas de Datos */}
          <Typography
            variant="h5"
            sx={{ color: themes[theme].menu.icon, mb: 2 }}
          >
            Tablas de Datos
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={3}>
            {/* Clientes con Deudas */}
            <Grid item xs={12} md={6}>
              <Card
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "primary.main" }}
                >
                  Clientes con Deudas
                </Typography>

                {(statistics?.clientsWithDebt ?? []).length > 0 ? (
                  <>
                    <DynamicTable
                      columns={debtColumns}
                      data={statistics?.clientsWithDebt ?? []}
                    />
                    <Box mt={2} textAlign="right">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {}}
                      >
                        Ver todos
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Typography variant="body2" align="center">
                    No hay clientes con deudas.
                  </Typography>
                )}
              </Card>
            </Grid>

            {/* Productos con Bajo Stock */}
            <Grid item xs={12} md={6}>
              <Card
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "primary.main" }}
                >
                  Productos con Bajo Stock
                </Typography>

                {statistics?.lowStockProducts?.length ?? 0 > 0 ? (
                  <>
                    <DynamicTable
                      columns={lowStockColumns}
                      data={statistics?.lowStockProducts ?? []}
                    />
                    <Box mt={2} textAlign="right">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {}}
                      >
                        Ver todos
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Typography variant="body2" align="center">
                    No hay productos con bajo stock.
                  </Typography>
                )}
              </Card>
            </Grid>
          </Grid>
        </Box>
  );
};
