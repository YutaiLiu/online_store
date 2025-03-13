// type is almost identical to interface, but it is used to define custom types in TypeScript
export type Product = {
    id: number
    name: string
    price: number
    description: string
    type: string
    pictureURL: string
    brand: string
    stockQuantity: number
}