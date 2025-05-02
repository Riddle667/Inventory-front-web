import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import { Edit, Lock, Logout, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

// Contextos y Temas
import { useThemeContext } from "@/context/themes/themesContext";
import { themes } from "@/context/themes/themes";

// Redux
import { AppStore } from "@/redux/store";
import { modifyUser, resetUser } from "@/redux";

// Casos de uso
import { UpdatePhotoUseCase } from "@/useCase/user";
import { ChangePasswordUseCase } from "@/useCase/auth/ChangePasswordUseCase";
import { LogoutUseCase } from "@/useCase";
import { GetStatisticsProfileUseCase } from "@/useCase/statistics/GetStatisticsProfileUseCase";

// Componentes
import GenericConfirmationModal from "@/components/modals/GenericConfirmationModal";
import UpdateProfileImageModal from "@/components/modals/UpdateProfileImageModal";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";

// Interfaces
interface StatisticsProfile {
  cantProduct: number;
  cantClient: number;
  cantOrder: number;
}

export const Profile = () => {
  const { theme } = useThemeContext();
  const user = useSelector((store: AppStore) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = user?.session_token ?? "";
  const id = user?.id ?? -1;

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [statistics, setStatistics] = useState<StatisticsProfile | null>(null);

  // Funciones
  const handleDeleteAccount = () => {
    console.log("Cuenta eliminada");
    setOpenDeleteModal(false);
  };

  const handleUpdatePhoto = async (image: File) => {
    try {
      const response = await UpdatePhotoUseCase(image, id, token);
      const link = response.data;
      dispatch(modifyUser({ ...user, image: link }));
      console.log("Foto actualizada", response);
    } catch (error) {
      console.error("Error al actualizar la foto", error);
    }
  };

  const handleLogout = async () => {
    try {
      await LogoutUseCase(token);
      dispatch(resetUser());
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const fetchStatisticsProfile = async () => {
    try {
      const response = await GetStatisticsProfileUseCase(token);
      setStatistics(response.data as StatisticsProfile);
      console.log("Estadísticas del perfil", response.data);
    } catch (error) {
      console.error("Error al obtener estadísticas del perfil", error);
    }
  };

  useEffect(() => {
    fetchStatisticsProfile();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: 4,
        mb: 4,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "95%",
          maxWidth: 1000,
          borderRadius: 4,
          backgroundColor: themes[theme].sidebar.backgroundColor,
          color: themes[theme].sidebar.color,
          p: 4,
        }}
      >
        {/* Perfil */}
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={user.image ?? "src/assets/user.png"}
              alt="Avatar"
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h5" fontWeight="bold">
              {user.name} {user.lastname}
            </Typography>
            <Typography variant="body1">{user.email}</Typography>
            <Typography variant="body2">Teléfono: {user.phone}</Typography>
            <Typography variant="body2">
              Miembro desde:{" "}
              {user.createdAt
                ? format(new Date(user.createdAt), "dd/MM/yyyy")
                : "Fecha no disponible"}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Configuración de cuenta */}
        <Typography variant="h6" gutterBottom>
          Configuración de cuenta
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Lock />}
            onClick={() => setOpenPasswordModal(true)}
          >
            Cambiar contraseña
          </Button>
          <ChangePasswordModal
            open={openPasswordModal}
            onClose={() => setOpenPasswordModal(false)}
            onSubmit={async (currentPassword, newPassword) => {
              try {
                const response = await ChangePasswordUseCase(
                  currentPassword,
                  newPassword,
                  token
                );
                console.log("Contraseña actualizada", response);
                setOpenPasswordModal(false);
              } catch (error) {
                console.error("Error al actualizar la contraseña", error);
              }
            }}
          />

          <Button
            variant="outlined"
            color="primary"
            startIcon={<Edit />}
            onClick={() => setOpenImageModal(true)}
          >
            Actualizar foto
          </Button>
          <UpdateProfileImageModal
            open={openImageModal}
            onClose={() => setOpenImageModal(false)}
            onConfirm={async (image) => {
              await handleUpdatePhoto(image);
              setOpenImageModal(false);
            }}
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Resumen de actividad */}
        <Typography variant="h6" gutterBottom>
          Resumen de actividad
        </Typography>
        <Grid container spacing={2} mb={4}>
          {[
            { label: "Productos", value: statistics?.cantProduct },
            { label: "Clientes", value: statistics?.cantClient },
            { label: "Pedidos", value: statistics?.cantOrder },
          ].map((item, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <Card
                sx={{
                  backgroundColor: themes[theme].sidebar.backgroundColor,
                  color: themes[theme].sidebar.color,
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {item.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Acciones rápidas */}
        <Typography variant="h6" gutterBottom>
          Acciones
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={() => setOpenDeleteModal(true)}
          >
            Eliminar cuenta
          </Button>
        </Box>

        <GenericConfirmationModal
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          onConfirm={handleDeleteAccount}
          title="¿Eliminar cuenta?"
          message="Esta acción eliminará permanentemente tu cuenta y todos tus datos. ¿Estás seguro?"
          confirmButtonText="Sí, eliminar"
          cancelButtonText="Cancelar"
        />
      </Paper>
    </Box>
  );
};
