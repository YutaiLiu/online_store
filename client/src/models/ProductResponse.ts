import { Product } from "./Product";

// object name has to match the name that endpoint returns
// otherwise RTK Query will not be able to parse the response
// or you have to use the transformResponse option in the query
// to transform the response into the correct object
export type ProductResponse = {
    products: Product[];
    metaData: Metadata;
}

export type Metadata = {
    totalCount: number
    pageSize: number
    currentPage: number
    totalPages: number
  }