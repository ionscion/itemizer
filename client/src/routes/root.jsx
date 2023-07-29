import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { Switch, FormControlLabel } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useContext, useState } from "react";
import App from "../App"

function Root() {
  const [darkMode, setDarkMode] = useState(false);
  // const { isAuthenticated, getIdTokenClaims } = useAuth0();
  // const { getToken, apiInfo, accessToken } = useContext(ClientContext);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     getToken();
  //   }
  // }, [getIdTokenClaims, isAuthenticated]);

  // useEffect(() => {
  //   if (accessToken) {
  //     // fetchClients();
  //   }
  // }, [accessToken]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#424242" : "#FFFFFF", // Set the default background color based on the dark mode
      },
      primary: {
        main: "#0B746C",
      },
      secondary: {
        main: "#0B746C",
      },
    },
    typography: {
      // Add specific typography styles for dark mode
      fontFamily: "Comfortaa",
      fontWeight: 400,
      h1: {
        fontSize: "2rem",
        fontWeight: 600,
        color: darkMode ? "#FFF" : "#000",
      },
      // Add more typography styles as needed
    },
    // Add specific component styles for dark mode
    //   components: {
    //     // Example: adjust Button component styles for dark mode
    //     MuiButton: {
    //       styleOverrides: {
    //         root: {
    //           backgroundColor: darkMode ? "#333" : "#F5F5F5",
    //           color: darkMode ? "#FFF" : "#000",
    //           fontWeight: 'bold',
    //           fontSize: '12px',
    //         },
    //       },
    //     },
    //     MuiDataGrid: {
    //       styleOverrides: {
    //         root: {
    //           backgroundColor: darkMode ? "#333" : "#F5F5F5",
    //           color: darkMode ? "#FFF" : "#000",
    //         },
    //       },
    //     },
    //     // Add more component styles as needed
    //   },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label={darkMode ? "Dark Mode" : "Light Mode"}
        />
        <App />
      </ThemeProvider>
    </>
  );
}

export default Root;
