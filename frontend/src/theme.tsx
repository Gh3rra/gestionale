import { createTheme } from "@mui/material";

export const theme = createTheme({
  cssVariables: true,

  typography: {
    fontFamily: "Inter",
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // Target dell'autofill di Chrome
          "& input:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0px 1000px ${"#b1b1b1"} inset`,
            WebkitTextFillColor: "var(--primary-text)",
            transition: "background-color 5000s ease-in-out 0s",
          },
        },
      },
    },
    // Se usi InputBase (ad es. per TextField sans variant) aggiungi anche:
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& input:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0px 1000px ${"#b1b1b1"} inset`,
            WebkitTextFillColor: "var(--primary-text)",
            transition: "background-color 5000s ease-in-out 0s",
          },
        },
      },
    },
  /*   MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--primary-text)",
          color: "var(--white)",
          "&.Mui-disabled": {
            backgroundColor: "gray",
            color: "var(--white)",
          },
        },
      },
    }, */
  },
});
