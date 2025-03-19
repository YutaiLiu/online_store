//import { useEffect, useState } from "react";
//import { Product } from "../../models/Product";
import { useParams } from "react-router";
import { Button, Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useFetchProductByIdQuery } from "../../api/catalogApi";
import { currencyFormat } from "../../util";
import { useAddItemToCartMutation } from "../../api/ShoppingCartApi";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductDetails() {
    const { productId } = useParams();

    // Legacy solution, without RTK Query
    // const [product, setProduct] = useState<Product | null>();

    // useEffect(() => {
    //     fetch(`https://localhost:5001/api/products/${productId}`)
    //     .then(response => response.json())
    //     .then(data => setProduct(data))
    //     .catch(error => console.error(error));
    // }, [productId]);

    // if (!product) return <div>Loading...</div>;

    const [addItemToCart, {isLoading}] = useAddItemToCartMutation();
    const { data: product } = useFetchProductByIdQuery(productId ? { id: parseInt(productId) } : { id: 0});
    const [quantity, setQuantity] = useState(1);
        
    if (!product) return <div>Loading...</div>;

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (parseInt(e.target.value) < 1 || isNaN(parseInt(e.target.value))) {
            setQuantity(0);
            toast.error('Quantity must be a number and at least 1');
            return;
        }
        setQuantity(parseInt(e.target.value));
        console.log(quantity);
    }

    const handleAddToCart = () => {
        if (quantity < 1 || isNaN(quantity)) {
            toast.error('Quantity must be a number and at least 1');
            return;
        }
        addItemToCart({productId: product.id, quantity: quantity});
        console.log(quantity);
    }

    const productDetails = [
        {label: 'Description', value: product.description},
        {label: 'Category', value: product.type},
        {label: 'Brand', value: product.brand},
        {label: 'Quantity in stock', value: product.stockQuantity}
    ];

    return (
        <Grid2 container spacing={6} maxWidth='lg' sx={{ mx: 'auto' }}>
            <Grid2 size={6}>
                <img src={product?.pictureURL} alt={product?.name} style={{ width: '100%' }} />
            </Grid2>
            <Grid2 size={6}>
                <Typography variant='h3'>{product?.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h4' color='secondary'>{currencyFormat(product.price)}</Typography>
                <TableContainer>
                    <Table
                        sx={{ '& td': { fontSize: '1rem' } }}
                    >
                        <TableBody>
                            {productDetails.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{fontWeight: 'bold'}}>{item.label}</TableCell>
                                    <TableCell>{item.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid2 container spacing={2} marginTop={3}>
                    <Grid2 size={6}>
                        <TextField
                            variant='outlined'
                            type='number'
                            label='Item quantity add to cart'
                            fullWidth
                            defaultValue={1}
                            disabled={product.stockQuantity === 0 || isLoading}
                            onChange={handleQuantityChange}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <Button
                            onClick={handleAddToCart}
                            loading={isLoading}
                            sx={{ height: '100%' }}
                            color="primary"
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            Add to cart
                        </Button>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Grid2>    
    )
}