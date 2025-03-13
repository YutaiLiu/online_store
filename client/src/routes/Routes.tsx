import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/home/HomePage";
import AboutPage from "../pages/about/AboutPage";
import ContactPage from "../pages/contact/ContactPage";
import Catalog from "../pages/catalog/Catalog";
import ProductDetails from "../pages/catalog/ProductDetails";
import ServerError from "../components/errors/ServerError";
import NotFound from "../components/errors/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "/", element: <HomePage />},
            {path: "/about", element: <AboutPage />},
            {path: "/contact", element: <ContactPage />},
            {path: "/catalog", element: <Catalog />},
            {path: "/catalog/:productId", element: <ProductDetails />},
            {path: "/server-error", element: <ServerError />},
            {path: "/not-found", element: <NotFound />},
            {path: "*", element: <NotFound />}
        ]
    }
])