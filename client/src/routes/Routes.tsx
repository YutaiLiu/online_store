import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/home/HomePage";
import AboutPage from "../pages/about/AboutPage";
import ContactPage from "../pages/contact/ContactPage";
import Catalog from "../pages/catalog/Catalog";
import ProductDetails from "../pages/catalog/ProductDetails";
import ServerError from "../components/errors/ServerError";
import NotFound from "../components/errors/NotFound";
import ShoppingCartPage from "../pages/shoppingCart/ShoppingCartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import LoginForm from "../pages/login/LoginForm";
import RegisterForm from "../pages/register/RegisterForm";
import RequireAuth from "./RequireAuth";
import CheckoutSuccess from "../pages/checkout/CheckoutSuccess";
import { OrderPage } from "../pages/order/OrdersPage";
import { OrderDetail } from "../pages/order/orderDetail";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: "/checkout", element: <CheckoutPage />},
                {path: "/checkout/success", element: <CheckoutSuccess />},
                {path: "/orders", element: <OrderPage />},
                {path: "/orders/:orderId", element: <OrderDetail />}
            ]},
            {path: "/", element: <HomePage />},
            {path: "/about", element: <AboutPage />},
            {path: "/contact", element: <ContactPage />},
            {path: "/catalog", element: <Catalog />},
            {path: "/catalog/:productId", element: <ProductDetails />},
            {path: "/shopping-cart", element: <ShoppingCartPage />},
            {path: "/login", element: <LoginForm />},
            {path: "/register", element: <RegisterForm />},
            {path: "/server-error", element: <ServerError />},
            {path: "/not-found", element: <NotFound />},
            {path: "*", element: <NotFound />}
        ]
    }
])