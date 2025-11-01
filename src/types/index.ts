export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: {
    id: number
    name: string
    image: string
  }
  images: string[]
}

export interface Category {
  id: number
  name: string
  image: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  incrementQuantity: (productId: number) => void
  decrementQuantity: (productId: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}
