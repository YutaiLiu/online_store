export type ShoppingCart = {
    id: number
    cartId: string
    items: Item[]
}

export type Item = {
    productId: number
    name: string
    price: number
    description: string
    type: string
    pictureURL: string
    brand: string
    quantity: number
}