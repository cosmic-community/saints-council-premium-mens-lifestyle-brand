import { cosmic } from '@/lib/cosmic'
import { Product, JournalArticle } from '@/types'
import Link from 'next/link'

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'products',
        'metadata.featured_product': true,
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

async function getFeaturedArticles(): Promise<JournalArticle[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'journal-articles',
        'metadata.featured_article': true,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as JournalArticle[]
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function HomePage() {
  const [featuredProducts, featuredArticles] = await Promise.all([
    getFeaturedProducts(),
    getFeaturedArticles(),
  ])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-primary text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            The Uncompromised Code
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            A movement dedicated to building strong, masculine, and successful identities for modern men.
          </p>
          <div className="flex gap-4">
            <Link
              href="/products"
              className="bg-accent hover:bg-accent-light text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/journal"
              className="border-2 border-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Read The Journal
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Premium apparel and accessories crafted for the modern warrior
            </p>
          </div>

          {featuredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No featured products available</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
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
                      <h3 className="text-xl font-bold mb-2">{product.metadata?.product_name || product.title}</h3>
                      {product.metadata?.tagline && (
                        <p className="text-gray-600 mb-4">{product.metadata.tagline}</p>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-accent">${product.metadata?.price}</span>
                        <span className="text-primary font-semibold group-hover:underline">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">From The Journal</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Wisdom on discipline, mindset, and the pursuit of excellence
            </p>
          </div>

          {featuredArticles.length === 0 ? (
            <p className="text-center text-gray-500">No featured articles available</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/journal/${article.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    {article.metadata?.featured_image && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={`${article.metadata.featured_image.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          width={600}
                          height={338}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {article.metadata?.category && (
                        <span className="inline-block bg-accent text-white px-3 py-1 rounded text-sm font-semibold mb-3">
                          {article.metadata.category.metadata?.category_name || article.metadata.category.title}
                        </span>
                      )}
                      <h3 className="text-2xl font-bold mb-2">
                        {article.metadata?.article_title || article.title}
                      </h3>
                      {article.metadata?.subtitle && (
                        <p className="text-gray-600 mb-4">{article.metadata.subtitle}</p>
                      )}
                      <div className="flex items-center text-sm text-gray-500">
                        {article.metadata?.author && (
                          <span className="mr-4">{article.metadata.author}</span>
                        )}
                        {article.metadata?.read_time && (
                          <span>{article.metadata.read_time} min read</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/journal"
              className="inline-block bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Read More Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            More Than a Brand. A Movement.
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Saints & Council is built on principles of self-mastery, discipline, honor, and integrity.
            We position ourselves as an alternative to fast fashion and fleeting trends, focusing instead
            on legacy, quality, and symbolic meaning.
          </p>
          <Link
            href="/about"
            className="inline-block border-2 border-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Learn Our Story
          </Link>
        </div>
      </section>
    </div>
  )
}