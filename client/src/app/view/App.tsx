import { useState } from "react";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    }
  });

  const themeSwitcher = () => {
    setDarkMode(!darkMode);
  }

  return (
    // Notes:
    // 1. 2rem means 2 times the font size of the root element (html)
    // 2. you can use item => () or item => {} to return JSX
    // the difference is that the first one returns the JSX implicitly
    // and the second one, with curly brackets, requires an explicit return
    // the first one, with parentheses, is called an implicit return
    // 3. onClick={addProduct} is a reference to the function addProduct
    // if you write onClick={addProduct()} it will call the function immediately when the component is rendered
    // 4. pass props down to the child component Catalog
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar darkMode={darkMode} themeSwitcher={themeSwitcher}/>
      <Box
        sx={{
          minHeight: '100vh',
          
          background: darkMode
            ? 'radial-gradient(circle, #1e3aBa, #111B27)'
            : 'radial-gradient(circle, #baecf9, #f0f9ff)', 
        }}
      >
        <Container sx={{ minWidth: '100vw', padding: '2rem' }}>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
