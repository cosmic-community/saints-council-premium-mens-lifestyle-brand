import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">Saints & Council</h3>
            <p className="text-gray-400">
              The Uncompromised Code. Building strong, masculine, and successful identities for modern men.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-accent transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products/category/apparel" className="text-gray-400 hover:text-accent transition-colors">
                  Apparel
                </Link>
              </li>
              <li>
                <Link href="/products/category/accessories" className="text-gray-400 hover:text-accent transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Content */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Content</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/journal" className="text-gray-400 hover:text-accent transition-colors">
                  The Journal
                </Link>
              </li>
              <li>
                <Link href="/journal/category/mindset" className="text-gray-400 hover:text-accent transition-colors">
                  Mindset
                </Link>
              </li>
              <li>
                <Link href="/journal/category/discipline" className="text-gray-400 hover:text-accent transition-colors">
                  Discipline
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="mailto:hello@saintsandcouncil.com" className="text-gray-400 hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Saints & Council. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}