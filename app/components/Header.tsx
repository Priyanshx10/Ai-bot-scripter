import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">AI Video Generator</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-blue-200 transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-blue-200 transition-colors">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header