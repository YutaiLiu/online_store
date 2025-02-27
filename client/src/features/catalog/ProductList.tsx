import { Box } from "@mui/material";
import { Product } from "../../app/models/Product";
import ProductCard from "./ProductCard";

type ProductListProps = {
    products: Product[];
}

// Note:
// <ChildComponent {...props} /> is called spread operator
// it passes all the properties of the object props to the child component
export default function ProductList(props: ProductListProps) {
    return (
        <Box
            sx={{display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center'}}
        >
            {props.products.map(product => (
                <ProductCard key={product.id} {...product} />
            ))}
        </Box>
    );
}