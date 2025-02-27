import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import Catalog from "../../features/catalog/Catalog";
import { Box, Button, Container, Typography } from "@mui/material";

function App() {
  // React hook useState()
  // setProducts is a function that will update the state
  // it can be called with a new value to update the state
  // and it will map by the key of the object
  // useState<Product[]>([]) initializes the state producs with an empty array
  // and it tells TypeScript that the state will be an array of Product objects
  const [products, setProducts] = useState<Product[]>([]);

  // second parameter of useEffect() is for dependencies
  // if you pass an empty array, it will only run once when the component is mounted
  // if you pass a variable, it will run every time that variable changes
  // in this case of data fetching, you don't need to run it every time the component is rendered
  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));    
  }, []);

  // Arrow function
  // ... is called the spread operator
  const addProduct = () => {
    //setProducts([...products, { Id: products.length, name: 'product' + (products.length + 1), price: products.length + 1}]);
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
    <Container maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem', 
          justifyContent: 'center'
        }}
      >
        <Typography variant='h4'>Online Store</Typography>
        <Button onClick={addProduct}>Add Product</Button>
      </Box>
      <Catalog products={products}/>
    </Container>
  )
}

export default App
