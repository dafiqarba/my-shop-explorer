import { useMutation } from '@tanstack/react-query'

import { api } from '../utils/api'
import type { Product } from '../types'
import { useCartContext } from '../context'

export const useAddToCart = () => {
  const { addToCart, removeFromCart } = useCartContext()

  return useMutation({
    mutationFn: async (product: Product) => {
      await api.addToCartAPI(product.id)
      return product
    },
    // Optimistic update
    onMutate: async (product) => {
      addToCart(product)
    },
    // Rollback on error
    onError: (error, product) => {
      removeFromCart(product.id)
      console.error('Failed to add to cart:', error)
    },
  })
}
