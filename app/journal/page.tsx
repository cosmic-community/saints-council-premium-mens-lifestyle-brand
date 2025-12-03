import { cosmic } from '@/lib/cosmic'
import { JournalArticle, Category } from '@/types'
import Link from 'next/link'

async function getArticles(): Promise<JournalArticle[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'journal-articles' })
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

async function getContentCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'categories',
        'metadata.category_type.key': 'content',
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

export default async function JournalPage() {
  const [articles, categories] = await Promise.all([
    getArticles(),
    getContentCategories(),
  ])

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The Journal</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Wisdom on discipline, mindset, and the pursuit of excellence. Articles that reinforce the ethos of Saints & Council.
          </p>
        </div>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/journal"
                className="px-6 py-2 rounded-lg bg-primary text-white font-semibold"
              >
                All Articles
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/journal/category/${category.slug}`}
                  className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition-colors"
                >
                  {category.metadata?.category_name || category.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">No articles available</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
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
                    <h3 className="text-xl font-bold mb-2">
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
      </div>
    </div>
  )
}