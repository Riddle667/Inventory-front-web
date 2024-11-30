import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

interface GenericConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string; // Título del modal (opcional)
  message: string; // Mensaje principal del modal
  confirmButtonText?: string; // Texto del botón de confirmación (opcional)
  cancelButtonText?: string; // Texto del botón de cancelación (opcional)
}

const GenericConfirmationModal: React.FC<GenericConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirmación',
  message,
  confirmButtonText = 'Confirmar',
  cancelButtonText = 'Cancelar',
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          {cancelButtonText}
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericConfirmationModal;
