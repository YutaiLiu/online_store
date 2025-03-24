import { Product } from "./Product";

export type ProductResponse = {
    products: Product[];
    metaData: string[];
}