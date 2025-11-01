import type { Product, Category } from '../types'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

export const api = {
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE}/products?offset=0&limit=50`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return response.json()
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch product')
    }
    return response.json()
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE}/categories`)
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    return response.json()
  },

  // Simulated API call for adding to cart
  addToCartAPI: async (_productId: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simulate 5% failure rate for testing optimistic updates
    if (Math.random() > 0.95) {
      throw new Error('Failed to add to cart')
    }
  },
}
