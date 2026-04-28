import { startTransition, useDeferredValue } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { useStore } from '../context/StoreContext.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { productFilters } from '../data/siteData.js'

function ShopPage() {
  const { products, isProductsLoading } = useStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') ?? ''
  const deferredQuery = useDeferredValue(searchQuery)
  const activeCategory = searchParams.get('category') ?? 'All'

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'All' || product.category === activeCategory
    const trimmedQuery = deferredQuery.trim().toLowerCase()
    const matchesQuery =
      !trimmedQuery ||
      product.name.toLowerCase().includes(trimmedQuery) ||
      product.category.toLowerCase().includes(trimmedQuery)

    return matchesCategory && matchesQuery
  })

  const updateSearchParams = (nextCategory, nextQuery) => {
    const nextParams = new URLSearchParams()

    if (nextCategory && nextCategory !== 'All') {
      nextParams.set('category', nextCategory)
    }

    if (nextQuery?.trim()) {
      nextParams.set('q', nextQuery.trim())
    }

    setSearchParams(nextParams)
  }

  return (
    <div className="section-spacing">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Shop"
          title="Jewellery designed with clarity, balance, and premium restraint"
          description="Browse the full ELURA collection by category or use search to narrow the edit."
        />

        <div className="space-y-10">
          <div className="flex flex-col gap-8 border-b border-black/8 pb-8">
            <div className="max-w-lg">
              <input
                value={searchQuery}
                onChange={(event) => {
                  const nextQuery = event.target.value
                  startTransition(() => {
                    updateSearchParams(activeCategory, nextQuery)
                  })
                }}
                placeholder="Search jewellery..."
                className="search-shell"
              />
            </div>

            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                {productFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => updateSearchParams(filter, searchQuery)}
                    className={`filter-link ${
                      activeCategory === filter ? 'filter-link-active' : ''
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-6 text-sm text-muted">
                <p>
                  {filteredProducts.length} product{filteredProducts.length === 1 ? '' : 's'}
                </p>
                <p>{activeCategory === 'All' ? 'All categories' : activeCategory}</p>
                {isProductsLoading && <p>Loading products...</p>}
              </div>
            </div>
          </div>

          <section>
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-16 text-center text-muted">
                No products match your search right now.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
