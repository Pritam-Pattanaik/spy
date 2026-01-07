import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { Target, CheckCircle, Sun, Layers, ChevronRight } from 'lucide-react'

function About() {
    const { t } = useLanguage()

    const benefits = [
        t('about.benefits.item1'),
        t('about.benefits.item2'),
        t('about.benefits.item3'),
        t('about.benefits.item4'),
        t('about.benefits.item5'),
    ]

    const components = [
        { id: 'A', content: t('about.components.a') },
        { id: 'B', content: t('about.components.b') },
        { id: 'C', content: t('about.components.c') },
    ]

    return (
        <div className="py-12">
            {/* Page Header */}
            <section className="bg-govt-navy text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('about.title')}</h1>
                    <p className="text-blue-200 max-w-3xl text-lg">{t('about.intro')}</p>
                </div>
            </section>

            {/* Objective Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-saffron-100 p-3 rounded-lg">
                                    <Target className="w-8 h-8 text-saffron-600" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-govt-blue">
                                    {t('about.objective.title')}
                                </h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {t('about.objective.content')}
                            </p>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Solar Panel Farm"
                                className="rounded-lg shadow-xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-saffron-500 text-white p-6 rounded-lg shadow-xl">
                                <div className="text-3xl font-bold">90%</div>
                                <div className="text-sm">Subsidy</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <Sun className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-govt-blue">
                            {t('about.benefits.title')}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 bg-white p-5 rounded-lg shadow-sm border border-gray-100"
                            >
                                <CheckCircle className="w-6 h-6 text-govt-green flex-shrink-0 mt-0.5" />
                                <p className="text-gray-700">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Components Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Layers className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-govt-blue">
                            {t('about.components.title')}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {components.map((comp) => (
                            <div
                                key={comp.id}
                                className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg border-l-4 border-saffron-500"
                            >
                                <div className="flex-shrink-0 w-10 h-10 bg-saffron-500 text-white rounded-full flex items-center justify-center font-bold">
                                    {comp.id}
                                </div>
                                <p className="text-gray-700">{comp.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-govt-navy text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        Ready to Apply for Solar Pump Subsidy?
                    </h2>
                    <Link
                        to="/apply"
                        className="inline-flex items-center gap-2 btn-saffron text-lg"
                    >
                        {t('hero.cta')}
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default About
