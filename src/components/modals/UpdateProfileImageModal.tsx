import React, { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (image: File) => void;
}

const UpdateProfileImageModal: React.FC<Props> = ({ open, onClose, onConfirm }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (open) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play();
          }
        })
        .catch((err) => console.error("Error al acceder a la cámara:", err));
    } else {
      stopStream(); // apaga la cámara si se cierra el modal
      setImage(null); // reinicia la imagen
    }

    return () => {
      stopStream(); // por si el componente se desmonta
    };
  }, [open]);

  const handleTakePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured-photo.jpg", { type: "image/jpeg" });
          setImage(file);
        }
      }, "image/jpeg");
      
      
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCancel = () => {
    stopStream();
    onClose();
  };

  const handleConfirm = () => {
    if (image) {
      onConfirm(image);
    }
    handleCancel(); // también detiene el stream
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Actualizar foto de perfil</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          {!image ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{ width: "100%", maxWidth: 300, borderRadius: 8 }}
              />
              <Button variant="contained" onClick={handleTakePhoto}>
                Tomar foto
              </Button>
              <Typography>O selecciona una imagen:</Typography>
              <input type="file" accept="image/*" onChange={handleFileUpload} />
            </>
          ) : (
            <>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                style={{ width: "100%", maxWidth: 300, borderRadius: 8 }}
              />
              <Button onClick={() => setImage(null)}>Cambiar imagen</Button>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button onClick={handleConfirm} variant="contained" disabled={!image}>
          Confirmar
        </Button>
      </DialogActions>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Dialog>
  );
};

export default UpdateProfileImageModal;
