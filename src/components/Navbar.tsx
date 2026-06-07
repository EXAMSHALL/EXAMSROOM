import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Globe, LogOut } from 'lucide-react'

interface User {
  name: string
  role: 'student' | 'admin' | 'guest'
}

interface NavbarProps {
  user?: User
  onLogout: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const { language, setLanguage, t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en')
    localStorage.setItem('language', language === 'en' ? 'bn' : 'en')
  }

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold">
              E
            </div>
            <span className="text-xl font-bold text-white">EXAMSHALL</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {user && user.role === 'admin' && (
              <a href="#admin" className="hover:text-indigo-400 transition">
                {t('nav.admin')}
              </a>
            )}
            {user && (
              <a href="#dashboard" className="hover:text-indigo-400 transition">
                {t('nav.dashboard')}
              </a>
            )}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
              title="Toggle Language"
            >
              <Globe size={18} />
              <span className="text-sm font-semibold">{language.toUpperCase()}</span>
            </button>

            {/* User info and logout */}
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-sm">{user.name}</span>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                >
                  <LogOut size={18} />
                  <span className="text-sm">{t('nav.logout')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
