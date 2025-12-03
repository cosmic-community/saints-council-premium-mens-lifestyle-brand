// app/products/category/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { Product, Category } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'categories',
        slug,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as Category
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return null
    }
    throw error
  }
}

async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'products',
        'metadata.category': categoryId,
      })
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

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id)

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <Link
          href="/products"
          className="inline-flex items-center text-accent hover:text-accent-light mb-8 font-semibold"
        >
          ← Back to All Products
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category.metadata?.category_name || category.title}
          </h1>
          {category.metadata?.description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {category.metadata.description}
            </p>
          )}
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">No products in this category</p>
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