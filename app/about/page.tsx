export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Saints & Council</h1>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-3xl font-bold mb-4">The Uncompromised Code</h2>
            <p className="text-gray-600 text-lg">
              Saints & Council is more than a brand. It's a movement dedicated to building strong, masculine,
              and successful identities for modern men. We are for leaders, the driven, the disciplined—men
              who seek to elevate themselves beyond societal mediocrity.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Our Philosophy</h2>
            <p className="text-gray-600 text-lg mb-4">
              Built on principles of self-mastery, discipline, honor, and integrity, we position ourselves
              as an alternative to fast fashion and fleeting trends. Instead, we focus on legacy, quality,
              and symbolic meaning.
            </p>
            <p className="text-gray-600 text-lg">
              Every product we create serves as a reminder of your commitment to excellence. Every article
              we publish reinforces the mindset required to build an unshakeable life.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">The Symbolism</h2>
            <p className="text-gray-600 text-lg mb-4">
              Our icon is a shield, representing protection, strength, and honor. The name "Saints & Council"
              itself carries deep meaning:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-lg space-y-2">
              <li><strong>Saints</strong> represent the internal moral compass and virtues that guide your decisions</li>
              <li><strong>Council</strong> represents the community and collective wisdom of like-minded men</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Premium Apparel</h3>
                <p className="text-gray-600">
                  Engineered for the athletic-built gentleman—tailored but allowing for movement. Our pieces
                  transition seamlessly from the gym to the street to the boardroom.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Meaningful Accessories</h3>
                <p className="text-gray-600">
                  Steel-forged rings, premium journals, and refined accessories that serve as constant
                  reminders of your code and commitment to excellence.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">The Chamber</h3>
                <p className="text-gray-600">
                  Our exclusive membership community where The Council connects, shares, and grows together.
                  Access to member-only content, early product drops, and live events.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">The Journal</h3>
                <p className="text-gray-600">
                  Content that builds and reinforces our philosophy. Articles on mindset, discipline, style,
                  fitness, and the pursuit of excellence.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-primary text-white p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Join The Movement</h2>
            <p className="text-lg mb-6">
              In Saints & Council, we don't just wear armor—we become it. Your word is your armor.
              Your discipline is your weapon. Your code is uncompromised.
            </p>
            <p className="text-lg font-semibold">
              Build yourself like a king. Live like a king. Die like a king.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}