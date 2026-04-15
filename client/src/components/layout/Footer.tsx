import React, { useContext } from 'react'
import { AppContext } from '../../types'

export const Footer: React.FC = () => {
  const context = useContext(AppContext)
  const about = context?.siteContent.footerAbout || 'FashionBrand - ваш источник стильной одежды и аксессуаров.'
  const footerLinks = (context?.siteContent.footerLinks || 'Terms,Privacy,Contact').split(',').map(link => link.trim())
  const socialLinks = (context?.siteContent.footerSocial || 'Instagram,Twitter,TikTok').split(',').map(link => link.trim())
  const brand = context?.siteContent.brand || 'FashionBrand'

  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">About</h3>
            <p className="text-sm">
              {about}
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-white">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Follow</h3>
            <ul className="space-y-2 text-sm">
              {socialLinks.map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-white">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2026 {brand}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
