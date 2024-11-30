import { Box, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { useState } from "react";
import { themes } from "@/context/themes/themes";
import { useThemeContext } from "@/context/themes/themesContext";
import { AppSidebar, PrimarySearchAppBar } from "@/layout";
import { Client } from "@/models";

interface DeleteClientProps {
  clients: Client[];
}

export const DeleteClient = ({ clients }: DeleteClientProps) => {
  const { theme } = useThemeContext();
  const [selectedClient, setSelectedClient] = useState(0);

  const handleDelete = (clientId:number) => {
    setSelectedClient(clientId);
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
    if (confirmed) {
      console.log("Cliente eliminado:", clientId);
      //onDelete(clientId);  Llama a una función para manejar la eliminación en la API
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AppSidebar />
      <main style={{ flexGrow: 1 }}>
        <PrimarySearchAppBar />
        <Box p={4} style={{ backgroundColor: themes[theme].sidebar.backgroundColor }}>
          <Typography variant="h4" sx={{ color: themes[theme].menu.icon }}>Eliminar Cliente</Typography>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell></TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(client.id)}
                        sx={{
                          backgroundColor: themes[theme].menu.hover.backgroundColor,
                          color: themes[theme].menu.hover.color,
                          '&:hover': {
                            backgroundColor: themes[theme].menu.hover.color,
                            color: themes[theme].sidebar.backgroundColor,
                          },
                        }}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </main>
    </div>
  );
};

export default DeleteClient;
