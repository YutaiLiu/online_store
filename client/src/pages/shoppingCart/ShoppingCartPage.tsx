import { Grid2 } from "@mui/material";
import { useFetchShoppingCartQuery } from "../../api/ShoppingCartApi";
import ShoppingCartItem from "./ShoppingCartItem";
import OrderSummary from "../../components/OrderSummary";

export default function ShoppingCartPage() {
    const { data: shoppingCart, isLoading } = useFetchShoppingCartQuery();

    if (isLoading) return <div>Loading...</div>;

    if (!shoppingCart || shoppingCart.items.length == 0) return <div>Shopping Cart is empty</div>;

    const subtotal = shoppingCart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={8}>
                {shoppingCart.items.map((item) => (
                    <ShoppingCartItem key={item.productId} item={item} />
                ))}
            </Grid2>
            <Grid2 size={4}>
                <OrderSummary subtotal={subtotal}/>
            </Grid2>
        </Grid2>
    )
}