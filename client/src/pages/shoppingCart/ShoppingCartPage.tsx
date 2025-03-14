import { Grid2 } from "@mui/material";
import { useFetchShoppingCartQuery } from "../../api/ShoppingCartApi";
import ShoppingCartItem from "./ShoppingCartItem";

export default function ShoppingCartPage() {
    const { data: shoppingCart, isLoading } = useFetchShoppingCartQuery();

    if (isLoading) return <div>Loading...</div>;

    if (!shoppingCart) return <div>Shopping Cart is empty</div>;

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={8}>
                {shoppingCart.items.map((item) => (
                    <ShoppingCartItem key={item.productId} item={item} />
                ))}
            </Grid2>
        </Grid2>
    )
}