import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";

// receive props from parent component and define the type of the props
// name and type of the property from parent component must match the name and type defined here
type CatalogProps = {
    products: Product[];
}

export default function Catalog(props: CatalogProps) {
    return (
        <>
            <ProductList products={props.products} />
        </>
    );
}