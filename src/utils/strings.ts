export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export const getValidImageUrl = (url: string): string => {
  // Handle malformed URLs from the API
  if (!url || url.includes('[') || url.includes('"')) {
    return 'https://via.placeholder.com/400x400?text=No+Image'
  }
  return url
}
