import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { Sun, MapPin, Phone, Mail } from 'lucide-react'

function Footer() {
    const { t } = useLanguage()

    return (
        <footer className="bg-govt-blue text-white">
            {/* Tricolor Bar */}
            <div className="govt-header-alt"></div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-saffron-500 p-2 rounded-lg">
                                <Sun className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold">{t('header.title')}</h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {t('footer.description')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-saffron-400">{t('footer.quickLinks')}</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    {t('nav.home')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    {t('nav.about')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/eligibility" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    {t('nav.eligibility')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/apply" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    {t('nav.apply')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    {t('nav.contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-saffron-400">{t('footer.contactInfo')}</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-saffron-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">{t('contact.address.content')}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-saffron-400 flex-shrink-0" />
                                <a href="tel:+917365821070" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    {t('contact.phone.content')}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-saffron-400 flex-shrink-0" />
                                <a href="mailto:info@submersiblepumpyojana.com" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    {t('contact.email.content')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Apply Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-saffron-400">{t('nav.apply')}</h4>
                        <p className="text-gray-300 text-sm mb-4">
                            {t('hero.description').substring(0, 100)}...
                        </p>
                        <Link
                            to="/apply"
                            className="inline-block bg-saffron-500 hover:bg-saffron-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            {t('hero.cta')}
                        </Link>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-10 pt-6 border-t border-white/10">
                    <p className="text-center text-gray-400 text-xs mb-4">
                        {t('footer.disclaimer')}
                    </p>
                    <p className="text-center text-gray-500 text-xs">
                        {t('footer.copyright')}
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
