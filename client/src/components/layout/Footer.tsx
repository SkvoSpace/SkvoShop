import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">About</h3>
            <p className="text-sm">
              FashionBrand - ваш источник стильной одежды и аксессуаров.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Terms</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Follow</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2026 FashionBrand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
