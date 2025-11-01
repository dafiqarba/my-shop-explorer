import { BrowserRouter, Route, Routes } from 'react-router'

import { Layout } from './components/layout'
import { Cart, ProductDetail, ProductList } from './pages'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProductList />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
