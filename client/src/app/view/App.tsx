import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import Catalog from "../../features/catalog/Catalog";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";

function App() {
  // React hook useState()
  // setProducts is a function that will update the state
  // it can be called with a new value to update the state
  // and it will map by the key of the object
  // useState<Product[]>([]) initializes the state producs with an empty array
  // and it tells TypeScript that the state will be an array of Product objects
  const [products, setProducts] = useState<Product[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    }
  });

  // second parameter of useEffect() is for dependencies
  // if you pass an empty array, it will only run once when the component is mounted
  // if you pass a variable, it will run every time that variable changes
  // in this case of data fetching, you don't need to run it every time the component is rendered
  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));    
  }, []);

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
      <NavBar themeSwitcher={themeSwitcher}/>
      <Box
        sx={{
          minHeight: '100vh',
          background: darkMode
            ? 'radial-gradient(circle, #1e3aBa, #111B27)'
            : 'radial-gradient(circle, #baecf9, #f0f9ff)'
        }}
      >
        <Container maxWidth="xl" sx={{ padding: '2rem' }}>
          <Catalog products={products}/>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
