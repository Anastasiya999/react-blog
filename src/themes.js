import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#354147",
    },
    secondary: {
      main: "#2CA2DD",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "rgba(0,0,0,0.87)",
      secondary: "#ffffff",
    },
    divider: "#ffffff",
  },
  typography: {
    h3: {
      fontFamily: "Caveat Brush",
    },
    body2: {
      fontWeight: 300,
    },
  },
});

export const listtheme = createTheme(theme, {
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          color: theme?.palette.text.secondary,
          border: `1px dashed ${theme?.palette.text.secondary}`,
          borderRadius: "30px",
          "&.Mui-selected": {
            backgroundColor: "white",
            color: theme?.palette.text.primary,
            borderColor: theme?.palette.text.primary,
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5em",
          padding: "1em",
        },
      },
    },
  },
});

export const formtheme = createTheme(theme, {
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          width: "400px",
          padding: "50px",
          border: "1 px solid #dedede",
          margin: "50px auto",
          "& .MuiTextField-root": { marginBottom: "1.5em" },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textAlign: "center !important",
          fontWeight: "bold !important",
          marginBottom: "30px !important",
        },
      },
    },
  },
});

export const titleFormTheme = createTheme(theme, {
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            fontSize: "3rem",
            fontWeight: "bold",
          },
          div: {
            "&:before,&:after": {
              display: "none",
            },
          },
        },
      },
    },
  },
});

export { theme };
