import { useQuery } from '@tanstack/react-query'

import { api } from '../utils/api'

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(id),
    enabled: !!id,
  })
}
