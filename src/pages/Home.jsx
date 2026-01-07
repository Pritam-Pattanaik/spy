import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import {
    Sun, Zap, Wallet, Leaf, ChevronRight,
    Users, MapPin, Award, TrendingUp
} from 'lucide-react'

function Home() {
    const { t } = useLanguage()

    const highlights = [
        {
            icon: Wallet,
            title: t('highlights.subsidy.title'),
            description: t('highlights.subsidy.description'),
            color: 'saffron'
        },
        {
            icon: Zap,
            title: t('highlights.electricity.title'),
            description: t('highlights.electricity.description'),
            color: 'blue'
        },
        {
            icon: TrendingUp,
            title: t('highlights.income.title'),
            description: t('highlights.income.description'),
            color: 'green'
        },
        {
            icon: Leaf,
            title: t('highlights.eco.title'),
            description: t('highlights.eco.description'),
            color: 'emerald'
        },
    ]

    const stats = [
        { value: '2,50,000+', label: t('stats.pumps'), icon: Sun },
        { value: '5,00,000+', label: t('stats.farmers'), icon: Users },
        { value: '₹15,000+', label: t('stats.subsidy'), icon: Award },
        { value: '28+', label: t('stats.states'), icon: MapPin },
    ]

    return (
        <div>
            {/* Hero Section */}
            <section className="relative min-h-[600px] flex items-center">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                    }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 hero-gradient" />

                <div className="container mx-auto px-4 relative z-10 py-20">
                    <div className="max-w-3xl">
                        <div className="inline-block bg-saffron-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            PM Kusum Yojana
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                            {t('hero.title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-saffron-400 font-semibold mb-6">
                            {t('hero.subtitle')}
                        </p>
                        <p className="text-lg text-gray-200 mb-8 max-w-2xl">
                            {t('hero.description')}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/apply-pump"
                                className="btn-saffron flex items-center gap-2 text-lg"
                            >
                                {t('hero.cta')}
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                            <Link
                                to="/about"
                                className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                            >
                                {t('hero.learnMore')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="section-title">{t('highlights.title')}</h2>
                        <p className="section-subtitle">{t('highlights.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {highlights.map((item, index) => (
                            <div
                                key={index}
                                className="govt-card p-6 text-center group"
                            >
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-transform group-hover:scale-110
                  ${item.color === 'saffron' ? 'bg-saffron-100 text-saffron-600' : ''}
                  ${item.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
                  ${item.color === 'green' ? 'bg-green-100 text-green-600' : ''}
                  ${item.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : ''}
                `}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-govt-blue mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-govt-navy">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">{t('stats.title')}</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-14 h-14 bg-saffron-500 rounded-full mb-4">
                                    <stat.icon className="w-7 h-7 text-white" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-gray-300 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-govt-green to-green-700 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {t('eligibility.criteria.farmer.title')}?
                    </h2>
                    <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                        {t('highlights.subsidy.description')}
                    </p>
                    <Link
                        to="/apply-pump"
                        className="inline-flex items-center gap-2 bg-white text-govt-green px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                    >
                        {t('hero.cta')}
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Home
