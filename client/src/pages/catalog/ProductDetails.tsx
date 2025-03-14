//import { useEffect, useState } from "react";
//import { Product } from "../../models/Product";
import { useParams } from "react-router";
import { Button, Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useFetchProductByIdQuery } from "../../api/catalogApi";
import { useAppSelector } from "../../store/store";

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

    const { data: product } = useFetchProductByIdQuery(productId ? Number(productId) : 0);
    const isLoading = useAppSelector(state => state.ui.isLoading);
        
    if (isLoading || !product) return <div>Loading...</div>;

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
                <Typography variant='h4' color='secondary'>${((product?.price ?? 0) / 100).toFixed(2)}</Typography>
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
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <Button
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