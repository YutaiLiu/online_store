import { useClearShoppingCartMutation, useFetchShoppingCartQuery } from "../../api/shoppingCartApi";

export const useShoppingCart = () => {
    const { data: shoppingCart } = useFetchShoppingCartQuery();
    const [clearShoppingCart] = useClearShoppingCartMutation();

    const subtotal = !shoppingCart ? 0 : shoppingCart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = subtotal / 100 >= 100 ? 0 : 1000;

    return {shoppingCart, subtotal, deliveryFee, clearShoppingCart};
}