import ProductList from "./ProductList";
import { useFetchProductsQuery } from "../../api/catalogApi";
import { Grid2, Typography } from "@mui/material";
import Filter from "../../components/Filter";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setPageNumber } from "../../store/catalogSlice";
import AppPagination from "../../components/AppPanination";
//import { useAppSelector } from "../../store/store";

// new way of fetching data with RTK Query
export default function Catalog() {
    const productParams = useAppSelector(state => state.catalog);
    // useFetchProductsQuery is a hook that RTK Query creates
    // it will monitor the state of the query and update the component when the state changes
    const { data } = useFetchProductsQuery(productParams);
    const dispatch = useAppDispatch();

    //const isLoading = useAppSelector(state => state.ui.isLoading);

    //if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <Grid2 container spacing={4}>
            <Grid2 size={3}>
                <Filter />
            </Grid2>
            <Grid2 size={9}>
                {data.products && data.products.length > 0 ? (
                    <>
                        <ProductList products={data.products} />
                        <AppPagination metaData={data.metaData} onPageChange={(page: number) => dispatch(setPageNumber(page))}/>
                    </>
                ) : (
                    <Typography variant="h5">No products found</Typography>
                )}
            </Grid2>
        </Grid2>
    );
}

// this is the old way of fetching data
// you can use fetch() or axios

// import { useEffect, useState } from "react";
// import { Product } from "../../models/Product";
// import ProductList from "./ProductList";
// export default function Catalog() {
//     // React hook useState()
//     // setProducts is a function that will update the state
//     // it can be called with a new value to update the state
//     // and it will map by the key of the object
//     // useState<Product[]>([]) initializes the state producs with an empty array
//     // and it tells TypeScript that the state will be an array of Product objects
//     const [products, setProducts] = useState<Product[]>([]);

//     // second parameter of useEffect() is for dependencies
//     // if you pass an empty array, it will only run once when the component is mounted
//     // if you pass a variable, it will run every time that variable changes
//     // in this case of data fetching, you don't need to run it every time the component is rendered
//     useEffect(() => {
//         fetch('https://localhost:5001/api/products')
//         .then(response => response.json())
//         .then(data => setProducts(data));    
//     }, []);
    
//     return (
//         <>
//             <ProductList products={products} />
//         </>
//     );
// }