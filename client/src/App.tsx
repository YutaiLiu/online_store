import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router";
import { useAppSelector } from "./store/store";

function App() {
  const isDarkMode = useAppSelector(state => state.ui.isDarkMode);
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    }
  });

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
      <NavBar />
      <Box
        sx={{
          minHeight: '100vh',
          background: isDarkMode
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
