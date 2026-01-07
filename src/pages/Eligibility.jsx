import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import {
    User, CreditCard, Building2, FileText,
    ChevronRight, CheckCircle, AlertCircle
} from 'lucide-react'

function Eligibility() {
    const { t } = useLanguage()

    const criteria = [
        {
            icon: User,
            title: t('eligibility.criteria.farmer.title'),
            description: t('eligibility.criteria.farmer.description'),
            color: 'saffron'
        },
        {
            icon: CreditCard,
            title: t('eligibility.criteria.aadhar.title'),
            description: t('eligibility.criteria.aadhar.description'),
            color: 'blue'
        },
        {
            icon: Building2,
            title: t('eligibility.criteria.bank.title'),
            description: t('eligibility.criteria.bank.description'),
            color: 'green'
        },
        {
            icon: FileText,
            title: t('eligibility.criteria.land.title'),
            description: t('eligibility.criteria.land.description'),
            color: 'purple'
        },
    ]

    const documents = t('eligibility.documents.list')

    return (
        <div className="py-12">
            {/* Page Header */}
            <section className="bg-govt-navy text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('eligibility.title')}</h1>
                    <p className="text-blue-200 max-w-3xl text-lg">{t('eligibility.subtitle')}</p>
                </div>
            </section>

            {/* Eligibility Criteria */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-6">
                        {criteria.map((item, index) => (
                            <div
                                key={index}
                                className="govt-card p-6 flex items-start gap-4"
                            >
                                <div className={`flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center
                  ${item.color === 'saffron' ? 'bg-saffron-100 text-saffron-600' : ''}
                  ${item.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
                  ${item.color === 'green' ? 'bg-green-100 text-green-600' : ''}
                  ${item.color === 'purple' ? 'bg-purple-100 text-purple-600' : ''}
                `}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-govt-blue mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Required Documents */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-govt-blue mb-8 text-center">
                            {t('eligibility.documents.title')}
                        </h2>

                        <div className="bg-white rounded-xl shadow-md p-8">
                            <ul className="space-y-4">
                                {documents.map((doc, index) => (
                                    <li key={index} className="flex items-center gap-4">
                                        <CheckCircle className="w-6 h-6 text-govt-green flex-shrink-0" />
                                        <span className="text-gray-700">{doc}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 p-4 bg-saffron-50 rounded-lg border border-saffron-200">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-saffron-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-saffron-800">
                                        All documents should be clear and legible. Blurred or unclear documents may lead to application rejection.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-govt-green text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Meet the Eligibility Criteria?
                    </h2>
                    <p className="text-green-100 mb-8 text-lg">
                        Apply now and get up to 90% subsidy on your solar pump!
                    </p>
                    <Link
                        to="/apply"
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

export default Eligibility
