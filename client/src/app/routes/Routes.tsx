import { createBrowserRouter } from "react-router";
import App from "../view/App";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "/", element: <HomePage />},
            {path: "/about", element: <AboutPage />},
            {path: "/contact", element: <ContactPage />},
            {path: "/catalog", element: <Catalog />},
            {path: "/catalog/:productId", element: <ProductDetails />}
        ]
    }
])