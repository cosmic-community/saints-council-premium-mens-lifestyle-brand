import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
        <p className="text-gray-600 mb-6">Could not find the requested resource</p>
        <Link
          href="/"
          className="inline-block bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}