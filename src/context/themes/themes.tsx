// Convertidor de colores hex a rgba para definir opacidades
export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
export const themes = {
  light: {
    background: {
      general: "#f4f6f8", // Fondo general claro
    },
    text: {
      title: "#004680", // Color de títulos
      subtitle: "#0066cc", // Color de subtítulos
      paragraph: "#44596e", // Color de párrafos
    },
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#607489",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      hover: {
        backgroundColor: "#c5e4ff",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
    button: {
      backgroundColor: "#0098e5",
      color: "#ffffff",
      hoverBackgroundColor: "#007bb5",
      hoverColor: "#ffffff",
    },
    table: {
      headerBackgroundColor: "#e0f2ff",
      headerColor: "#005f9e",
      rowBackgroundColor: "#ffffff",
      rowColor: "#607489",
      hoverBackgroundColor: "#f0f8ff",
      disabledBackgroundColor: "#f5f5f5",
    },
    chart: {
      backgroundColor: "#ffffff",
      axisColor: "#607489",
      labelColor: "#005f9e",
      lineColor: "#0098e5",
      barColor: "#007bb5",
      pieColors: ["#0098e5", "#005f9e", "#82cfff"],
    },
    alert: {
      error: '#d32f2f', // Color de error (rojo)
    },
    customerDetails: {
      sectionTitle: '#005f9e', // Títulos de las secciones (azul oscuro)
      label: '#607489', // Etiquetas (gris oscuro)
      dynamicData: '#000000', // Datos dinámicos (negro)
      totalsTitle: '#005f9e', // Títulos de totales (azul oscuro)
      totalsValue: '#0098e5', // Valores de totales (azul brillante)
      errorMessage: '#d32f2f', // Mensajes de error (rojo)
      addOrderButton: {
        backgroundColor: '#007bb5', // Fondo del botón (azul)
        color: '#ffffff', // Color del texto del botón (blanco)
      },
    },
    form: {
      inputBackgroundColor: "#ffffff", // Fondo de los campos de texto
      inputBorderColor: "#c1d4e0", // Borde de los campos de texto
      inputFocusBorderColor: "#0098e5", // Borde de los campos al estar enfocados
      inputColor: "#607489", // Color del texto en los campos
      labelColor: "#44596e", // Color de las etiquetas
      errorColor: "#d32f2f", // Color para los mensajes de error
      button: {
        backgroundColor: "#0098e5", // Fondo del botón en formularios
        color: "#ffffff", // Color del texto del botón en formularios
        hoverBackgroundColor: "#007bb5", // Fondo del botón al pasar el ratón
        hoverColor: "#ffffff", // Color del texto al pasar el ratón
      },
    },
    card: {
      backgroundColor: "#ffffff", // Fondo de la tarjeta
      borderColor: "#c1d4e0", // Borde de la tarjeta
      titleColor: "#004680", // Color del título
      textColor: "#607489", // Color del texto
      shadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Sombra
    },
  },
  dark: {
    background: {
      general: "#0a1e33", // Fondo general oscuro
    },
    text: {
      title: "#cce7ff", // Color de títulos
      subtitle: "#82cfff", // Color de subtítulos
      paragraph: "#8ba1b7", // Color de párrafos
    },
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
    button: {
      backgroundColor: "#59d0ff",
      color: "#0b2948",
      hoverBackgroundColor: "#007bb5",
      hoverColor: "#ffffff",
    },
    table: {
      headerBackgroundColor: "#1b3a5b",
      headerColor: "#59d0ff",
      rowBackgroundColor: "rgba(31, 41, 55, 0.2)",
      rowColor: "#8ba1b7",
      hoverBackgroundColor: "#12395e",
      disabledBackgroundColor: "#1f2937",
    },
    chart: {
      backgroundColor: "#0b2948",
      axisColor: "#8ba1b7",
      labelColor: "#59d0ff",
      lineColor: "#59d0ff",
      barColor: "#007bb5",
      pieColors: ["#59d0ff", "#005f9e", "#3e5e7e"],
    },
    alert: {
      error: '#ff6f61', // Color de error (rojo claro)
    },
    customerDetails: {
      sectionTitle: '#59d0ff', // Títulos de las secciones (azul claro)
      label: '#8ba1b7', // Etiquetas (gris claro)
      dynamicData: '#ffffff', // Datos dinámicos (blanco)
      totalsTitle: '#59d0ff', // Títulos de totales (azul claro)
      totalsValue: '#82cfff', // Valores de totales (azul suave)
      errorMessage: '#ff6f61', // Mensajes de error (rojo claro)
      addOrderButton: {
        backgroundColor: '#00458b', // Fondo del botón (azul oscuro)
        color: '#ffffff', // Color del texto del botón (blanco)
      },
    },
    form: {
      inputBackgroundColor: "#1f2937", // Fondo de los campos de texto
      inputBorderColor: "#4b5e6b", // Borde de los campos de texto
      inputFocusBorderColor: "#59d0ff", // Borde de los campos al estar enfocados
      inputColor: "#8ba1b7", // Color del texto en los campos
      labelColor: "#b6c8d9", // Color de las etiquetas
      errorColor: "#ff6f61", // Color para los mensajes de error
      button: {
        backgroundColor: "#59d0ff", // Fondo del botón en formularios
        color: "#0b2948", // Color del texto del botón en formularios
        hoverBackgroundColor: "#007bb5", // Fondo del botón al pasar el ratón
        hoverColor: "#ffffff", // Color del texto al pasar el ratón
      },
    },
    card: {
      backgroundColor: "#0b2948", // Fondo de la tarjeta
      borderColor: "#4b5e6b", // Borde de la tarjeta
      titleColor: "#cce7ff", // Color del título
      textColor: "#8ba1b7", // Color del texto
      shadow: "0px 4px 12px rgba(0, 0, 0, 0.3)", // Sombra
    },
  },
};
