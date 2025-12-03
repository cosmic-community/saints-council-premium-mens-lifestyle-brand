import { cosmic } from '@/lib/cosmic'
import { Product, Category } from '@/types'
import Link from 'next/link'

async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as Product[]
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw error
  }
}

async function getProductCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'categories',
        'metadata.category_type.key': 'product',
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const categories = response.objects as Category[]
    return categories.sort((a, b) => {
      const orderA = a.metadata?.display_order ?? 999
      const orderB = b.metadata?.display_order ?? 999
      return orderA - orderB
    })
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getProductCategories(),
  ])

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Products</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Engineered for the modern warrior. Every piece is crafted with purpose and precision.
          </p>
        </div>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="px-6 py-2 rounded-lg bg-primary text-white font-semibold"
              >
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products/category/${category.slug}`}
                  className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition-colors"
                >
                  {category.metadata?.category_name || category.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">No products available</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  {product.metadata?.featured_image && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={`${product.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={400}
                        height={300}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {product.metadata?.category && (
                      <span className="inline-block bg-accent text-white px-3 py-1 rounded text-sm font-semibold mb-3">
                        {product.metadata.category.metadata?.category_name || product.metadata.category.title}
                      </span>
                    )}
                    <h3 className="text-xl font-bold mb-2">
                      {product.metadata?.product_name || product.title}
                    </h3>
                    {product.metadata?.tagline && (
                      <p className="text-gray-600 mb-4">{product.metadata.tagline}</p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-accent">${product.metadata?.price}</span>
                      {product.metadata?.in_stock !== false && (
                        <span className="text-green-600 text-sm font-semibold">In Stock</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}