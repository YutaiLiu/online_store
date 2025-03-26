export type Filter = {
    brands: string[]
    types: string[]
}

export const SortOptions = [
    { value: 'name', label: 'Name: A to Z' },
    { value: 'nameDesc', label: 'Name: Z to A' },
    { value: 'priceDesc', label: 'Price: High to low' },
    { value: 'price', label: 'Price: Low to high' },
];