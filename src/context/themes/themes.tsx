// Define aquí el objeto themes con los colores para cada tema
export const themes = {
    light: {
      sidebar: {
        backgroundColor: "#ffffff", // Fondo del sidebar en tema claro
        color: "#607489",           // Color de texto en el sidebar para tema claro
      },
      menu: {
        menuContent: "#fbfcfd",      // Fondo del contenido del menú
        icon: "#0098e5",             // Color de los iconos
        hover: {
          backgroundColor: "#c5e4ff", // Fondo al pasar el ratón (hover)
          color: "#44596e",           // Color de texto en hover
        },
        disabled: {
          color: "#9fb6cf",           // Color de texto para elementos deshabilitados
        },
      },
    },
    dark: {
      sidebar: {
        backgroundColor: "#0b2948", // Fondo del sidebar en tema oscuro
        color: "#8ba1b7",           // Color de texto en el sidebar para tema oscuro
      },
      menu: {
        menuContent: "#082440",      // Fondo del contenido del menú
        icon: "#59d0ff",             // Color de los iconos en tema oscuro
        hover: {
          backgroundColor: "#00458b", // Fondo al pasar el ratón (hover) en tema oscuro
          color: "#b6c8d9",           // Color de texto en hover para tema oscuro
        },
        disabled: {
          color: "#3e5e7e",           // Color de texto para elementos deshabilitados en tema oscuro
        },
      },
    },
  };
  
  // Convertidor de colores hex a rgba para definir opacidades
  export const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  