// app/journal/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { JournalArticle } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getArticle(slug: string): Promise<JournalArticle | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'journal-articles',
        slug,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as JournalArticle
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/journal"
          className="inline-flex items-center text-accent hover:text-accent-light mb-8 font-semibold"
        >
          ← Back to Journal
        </Link>

        <article>
          {article.metadata?.category && (
            <span className="inline-block bg-accent text-white px-3 py-1 rounded text-sm font-semibold mb-4">
              {article.metadata.category.metadata?.category_name || article.metadata.category.title}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {article.metadata?.article_title || article.title}
          </h1>

          {article.metadata?.subtitle && (
            <p className="text-xl text-gray-600 mb-6">{article.metadata.subtitle}</p>
          )}

          <div className="flex items-center text-gray-500 mb-8 pb-8 border-b">
            {article.metadata?.author && (
              <span className="mr-4">By {article.metadata.author}</span>
            )}
            {article.metadata?.read_time && (
              <span>{article.metadata.read_time} min read</span>
            )}
          </div>

          {article.metadata?.featured_image && (
            <div className="mb-12 rounded-lg overflow-hidden">
              <img
                src={`${article.metadata.featured_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
                alt={article.title}
                className="w-full"
                width={800}
                height={450}
              />
            </div>
          )}

          {article.metadata?.content && (
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.metadata.content }}
            />
          )}
        </article>

        <div className="mt-16 pt-8 border-t">
          <Link
            href="/journal"
            className="inline-block bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Read More Articles
          </Link>
        </div>
      </div>
    </div>
  )
}