import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { Sun, Menu, X, Globe } from 'lucide-react'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { language, toggleLanguage, t } = useLanguage()
    const location = useLocation()

    const navLinks = [
        { path: '/', label: t('nav.home') },
        { path: '/about', label: t('nav.about') },
        { path: '/eligibility', label: t('nav.eligibility') },
        { path: '/apply', label: t('nav.apply') },
        { path: '/contact', label: t('nav.contact') },
    ]

    const isActive = (path) => location.pathname === path

    return (
        <header className="sticky top-0 z-50">
            {/* Tricolor Bar */}
            <div className="govt-header-alt"></div>

            {/* Main Header */}
            <div className="govt-header text-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3">
                            <div className="bg-saffron-500 p-2 rounded-lg">
                                <Sun className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold">{t('header.title')}</h1>
                                <p className="text-xs md:text-sm text-blue-200">{t('header.subtitle')}</p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`font-medium transition-colors hover:text-saffron-400 ${isActive(link.path) ? 'text-saffron-400 border-b-2 border-saffron-400 pb-1' : 'text-white'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Language Toggle & Mobile Menu */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                                aria-label="Toggle language"
                            >
                                <Globe className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    {language === 'en' ? 'हिंदी' : 'English'}
                                </span>
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <nav className="lg:hidden pb-4 border-t border-white/10 pt-4">
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`px-4 py-3 rounded-lg font-medium transition-colors ${isActive(link.path)
                                                ? 'bg-saffron-500 text-white'
                                                : 'text-white hover:bg-white/10'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
