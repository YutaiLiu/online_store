export type Filter = {
    brands: string[]
    types: string[]
}

export const SortOptions = [
    { value: 'price', label: 'Price: High to low' },
    { value: 'price decs', label: 'Price: Low to high' },
    { value: 'name', label: 'Name: A to Z' },
    { value: 'name decs', label: 'Name: Z to A' },
];