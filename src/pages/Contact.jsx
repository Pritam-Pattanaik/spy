import { useLanguage } from '../context/LanguageContext'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

function Contact() {
    const { t } = useLanguage()

    const contactInfo = [
        {
            icon: MapPin,
            title: t('contact.address.title'),
            content: t('contact.address.content'),
            color: 'saffron'
        },
        {
            icon: Phone,
            title: t('contact.phone.title'),
            content: t('contact.phone.content'),
            link: 'tel:+917365821070',
            color: 'blue'
        },
        {
            icon: Mail,
            title: t('contact.email.title'),
            content: t('contact.email.content'),
            link: 'mailto:info@submersiblepumpyojana.com',
            color: 'green'
        },
        {
            icon: Clock,
            title: t('contact.hours.title'),
            content: t('contact.hours.content'),
            color: 'purple'
        },
    ]

    return (
        <div className="py-12">
            {/* Page Header */}
            <section className="bg-govt-navy text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h1>
                    <p className="text-blue-200 max-w-3xl text-lg">{t('contact.subtitle')}</p>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {contactInfo.map((item, index) => (
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
                                    <h3 className="text-lg font-bold text-govt-blue mb-2">{item.title}</h3>
                                    {item.link ? (
                                        <a
                                            href={item.link}
                                            className="text-gray-600 hover:text-govt-navy transition-colors"
                                        >
                                            {item.content}
                                        </a>
                                    ) : (
                                        <p className="text-gray-600">{item.content}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-govt-blue text-center mb-8">
                            Find Us on Map
                        </h2>
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.2897714671397!2d77.27144437549757!3d28.69266687562844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb5c0e3f77f7%3A0x9c9e3c3b3c3c3c3c!2sMaujpur%2C%20Seelampur%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Office Location"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Contact */}
            <section className="py-16 bg-govt-green text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Need Immediate Assistance?
                    </h2>
                    <p className="text-green-100 mb-8 text-lg">
                        Call us directly or send us a WhatsApp message
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="tel:+917365821070"
                            className="inline-flex items-center gap-2 bg-white text-govt-green px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                        >
                            <Phone className="w-5 h-5" />
                            Call Now
                        </a>
                        <a
                            href="https://wa.me/917365821070"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
