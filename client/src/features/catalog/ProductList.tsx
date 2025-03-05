import { Box } from "@mui/material";
import { Product } from "../../app/models/Product";
import ProductCard from "./ProductCard";

// receive props from parent component and define the type of the props
// name and type of the property from parent component must match the name and type defined here
type ProductListProps = {
    products: Product[];
}

// Note:
// <ChildComponent {...props} /> is called spread operator
// what it did is copy all the properties of the object props and pass it to the child component
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