import { useEffect, useState } from "react";

function App() {
  // React hook useState()
  const [products, setProducts] = useState([
    { Id: 1, name: 'Apple', price: 1 },
    { Id: 2, name: 'Banana', price: 2 },
    { Id: 3, name: 'Cherry', price: 3 }
  ]);

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
    setProducts([...products, { Id: products.length, name: 'product' + (products.length + 1), price: products.length + 1}]);
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
    <div>
      <h1>Online Store</h1>
      <ul>
        {products.map((item, index) => (
          <li key={index}>{item.name} + {item.price}</li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  )
}

export default App
