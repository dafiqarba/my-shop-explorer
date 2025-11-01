import { useQuery } from '@tanstack/react-query'

import { api } from '../utils/api'

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: api.getProducts,
  })
}
