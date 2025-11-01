import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'

import { useAddToCart, useProduct } from '../hooks'
import { Button, Card } from '../components/commons'
import { formatPrice, getValidImageUrl } from '../utils/strings'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)

  const { data: product, isLoading, error, isError } = useProduct(productId)
  const addToCartMutation = useAddToCart()
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (isError) {
      alert(error)
    }
  }, [isError])

  const handleAddToCart = () => {
    if (product) {
      addToCartMutation.mutate(product, {
        onError: () => {
          alert('Failed to add to cart. Please try again.')
        },
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-500">Product not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="font-medium">Back</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <Card className="mb-4">
            <div className="aspect-square bg-gray-50">
              <img
                src={getValidImageUrl(product.images[selectedImage])}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </Card>

          <div className="flex gap-3 overflow-x-auto">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === idx ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={getValidImageUrl(img)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
            {product.category.name}
          </span>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>

          <p className="text-3xl font-bold text-gray-900 mb-6">
            {formatPrice(product.price)}
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          <Button
            onClick={handleAddToCart}
            disabled={addToCartMutation.isPending}
            className="w-full sm:w-auto px-8 text-lg"
          >
            {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
