import { useState } from 'react'
import { Link } from 'react-router'

import { useCategories, useProducts } from '../hooks'
import { Card, Input, Select } from '../components/commons'
import { formatPrice, getValidImageUrl } from '../utils/strings'

const ProductList = () => {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const { data: products, isLoading: productsLoading } = useProducts()
  const { data: categories, isLoading: categoriesLoading } = useCategories()

  const filteredProducts =
    products?.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        categoryFilter === 'all' || product.category.id.toString() === categoryFilter
      return matchesSearch && matchesCategory
    }) || []

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...(categories?.map((cat) => ({
      value: cat.id.toString(),
      label: cat.name,
    })) || []),
  ]

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex flex-col gap-8 px-2">
        {/* Page header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Catalog</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
              Discover products
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Curated items from multiple categories. Filter, search, and browse.
            </p>
          </div>
        </header>

        {/* Controls */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white/60 p-4 shadow-sm backdrop-blur sm:flex-row sm:items-center">
          <div className="flex-1">
            <Input
              placeholder="Search products…"
              value={search}
              onChange={setSearch}
              className="w-full rounded-xl border-slate-200 bg-slate-50/60 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:ring-0"
            />
          </div>
          <div className="sm:w-56">
            <Select
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={categoryOptions}
              className="w-full rounded-xl border-slate-200 bg-white text-sm text-slate-900"
            />
          </div>
        </div>

        {/* Product grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white/80 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-200 hover:shadow-md">
                <div className="relative overflow-hidden bg-slate-100/60">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={getValidImageUrl(product.images?.[0])}
                      alt={product.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-slate-950/5 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-300" />
                    {product.category.name}
                  </p>
                  <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 group-hover:text-slate-950">
                    {product.title}
                  </h3>
                  <p className="mt-auto text-lg font-semibold tracking-tight text-slate-900">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/70 py-14 text-center">
            <h3 className="text-base font-medium text-slate-900">No products found</h3>
            <p className="mt-2 max-w-md text-sm text-slate-500">
              Try changing the category or using a different keyword.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
