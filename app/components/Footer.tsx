const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; {new Date().getFullYear()} AI Video Generator. All rights reserved.</p>
          <p className="mt-2 text-sm text-gray-400">Powered by Google Gemini API</p>
        </div>
      </footer>
    )
  }
  
  export default Footer