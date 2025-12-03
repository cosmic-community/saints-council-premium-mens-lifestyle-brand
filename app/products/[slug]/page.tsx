// app/products/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { Product } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'products',
        slug,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as Product
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const gallery = product.metadata?.product_gallery || []
  const allImages = product.metadata?.featured_image
    ? [product.metadata.featured_image, ...gallery]
    : gallery

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <Link
          href="/products"
          className="inline-flex items-center text-accent hover:text-accent-light mb-8 font-semibold"
        >
          ← Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {allImages.length > 0 && allImages[0] && (
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={`${allImages[0].imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    width={600}
                    height={600}
                  />
                </div>
                {allImages.length > 1 && (
                  <div className="grid grid-cols-3 gap-4">
                    {allImages.slice(1).map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                          alt={`${product.title} ${index + 2}`}
                          className="w-full h-full object-cover"
                          width={200}
                          height={200}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            {product.metadata?.category && (
              <span className="inline-block bg-accent text-white px-3 py-1 rounded text-sm font-semibold mb-4">
                {product.metadata.category.metadata?.category_name || product.metadata.category.title}
              </span>
            )}

            <h1 className="text-4xl font-bold mb-4">
              {product.metadata?.product_name || product.title}
            </h1>

            {product.metadata?.tagline && (
              <p className="text-xl text-gray-600 mb-6">{product.metadata.tagline}</p>
            )}

            <div className="text-4xl font-bold text-accent mb-8">
              ${product.metadata?.price}
            </div>

            {product.metadata?.in_stock !== false ? (
              <div className="mb-8">
                <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded font-semibold">
                  ✓ In Stock
                </span>
              </div>
            ) : (
              <div className="mb-8">
                <span className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded font-semibold">
                  Out of Stock
                </span>
              </div>
            )}

            {product.metadata?.description && (
              <div
                className="prose max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: product.metadata.description }}
              />
            )}

            {product.metadata?.key_features && product.metadata.key_features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.metadata.key_features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4">
              <button className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-lg font-semibold text-lg transition-colors">
                Add to Cart
              </button>
              <p className="text-center text-sm text-gray-500">
                This is a demo. No actual checkout is available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}