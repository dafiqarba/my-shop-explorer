import { Link } from 'react-router'
import { useCart } from '../hooks'

import { Button, Card } from '../components/commons'
import { formatPrice, getValidImageUrl } from '../utils/strings'

const Cart = () => {
  const { items, removeFromCart, incrementQuantity, decrementQuantity, totalPrice } =
    useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <Card key={item.product.id} className="p-4">
            <div className="flex gap-4">
              <Link to={`/product/${item.product.id}`}>
                <img
                  src={getValidImageUrl(item.product.images[0])}
                  alt={item.product.title}
                  className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-500 transition-colors">
                    {item.product.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mb-3">
                  {formatPrice(item.product.price)}
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decrementQuantity(item.product.id)}
                      className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                    >
                      <span className="text-lg font-medium">−</span>
                    </button>
                    <span className="font-semibold text-gray-900 w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => incrementQuantity(item.product.id)}
                      className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                    >
                      <span className="text-lg font-medium">+</span>
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>

                  <p className="ml-auto font-semibold text-gray-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold text-gray-900">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>

        <Button className="w-full text-lg mb-3">Proceed to Checkout</Button>
        <Link to="/" className="block">
          <Button variant="secondary" className="w-full">
            Continue Shopping
          </Button>
        </Link>
      </Card>
    </div>
  )
}

export default Cart
