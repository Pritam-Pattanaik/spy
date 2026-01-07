import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

function ApplyPump() {
    const { t, language } = useLanguage()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pin: '',
        pumpPower: '',
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [applicationId, setApplicationId] = useState('')

    const pumpPowerOptions = [
        { value: '1HP', label: language === 'hi' ? '1 एचपी' : '1 HP' },
        { value: '2HP', label: language === 'hi' ? '2 एचपी' : '2 HP' },
        { value: '3HP', label: language === 'hi' ? '3 एचपी' : '3 HP' },
        { value: '5HP', label: language === 'hi' ? '5 एचपी' : '5 HP' },
        { value: '7.5HP', label: language === 'hi' ? '7.5 एचपी' : '7.5 HP' },
        { value: '10HP', label: language === 'hi' ? '10 एचपी' : '10 HP' },
    ]

    const validateForm = () => {
        const newErrors = {}
        const requiredMsg = language === 'hi' ? 'यह फील्ड आवश्यक है' : 'This field is required'
        const emailInvalid = language === 'hi' ? 'कृपया एक वैध ईमेल दर्ज करें' : 'Please enter a valid email'
        const phoneInvalid = language === 'hi' ? 'कृपया एक वैध 10 अंकों का फोन नंबर दर्ज करें' : 'Please enter a valid 10-digit phone number'
        const pinInvalid = language === 'hi' ? 'कृपया एक वैध 6 अंकों का पिन कोड दर्ज करें' : 'Please enter a valid 6-digit PIN code'

        if (!formData.name.trim()) newErrors.name = requiredMsg
        if (!formData.email.trim()) {
            newErrors.email = requiredMsg
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = emailInvalid
        }
        if (!formData.phone.trim()) {
            newErrors.phone = requiredMsg
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = phoneInvalid
        }
        if (!formData.address.trim()) newErrors.address = requiredMsg
        if (!formData.city.trim()) newErrors.city = requiredMsg
        if (!formData.pin.trim()) {
            newErrors.pin = requiredMsg
        } else if (!/^\d{6}$/.test(formData.pin)) {
            newErrors.pin = pinInvalid
        }
        if (!formData.pumpPower) newErrors.pumpPower = requiredMsg

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/pump-applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error('Submission failed')
            }

            const data = await response.json()
            setApplicationId(data.id)
            setIsSuccess(true)
        } catch (error) {
            console.error('Submission error:', error)
            setErrors({ submit: language === 'hi' ? 'आवेदन जमा करने में विफल। कृपया पुनः प्रयास करें।' : 'Failed to submit application. Please try again.' })
        } finally {
            setIsSubmitting(false)
        }
    }

    const pageTitle = language === 'hi' ? 'सबमर्सिबल सोलर पंप के लिए आवेदन करें' : 'Apply for Submersible Solar Pump'
    const pageSubtitle = language === 'hi' ? 'अपना सोलर पंप आवेदन दर्ज करने के लिए नीचे फॉर्म भरें' : 'Fill the form below to register your solar pump application'

    if (isSuccess) {
        return (
            <div className="py-12">
                <section className="bg-govt-green text-white py-16">
                    <div className="container mx-auto px-4">
                        <h1 className="text-3xl md:text-4xl font-bold">{pageTitle}</h1>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-lg mx-auto text-center">
                            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-12 h-12 text-govt-green" />
                            </div>
                            <h2 className="text-2xl font-bold text-govt-blue mb-4">
                                {language === 'hi' ? 'आवेदन सफलतापूर्वक जमा हो गया!' : 'Application Submitted Successfully!'}
                            </h2>
                            <p className="text-gray-600 mb-6">
                                {language === 'hi' ? 'आपका आवेदन प्राप्त हो गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।' : 'Your application has been received. Our team will contact you soon.'}
                            </p>
                            <div className="bg-gray-100 rounded-lg p-4 inline-block">
                                <span className="text-gray-500 text-sm">{language === 'hi' ? 'आवेदन आईडी' : 'Application ID'}</span>
                                <div className="text-xl font-bold text-govt-blue">{applicationId}</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    return (
        <div className="py-12">
            {/* Page Header */}
            <section className="bg-govt-green text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{pageTitle}</h1>
                    <p className="text-green-100 max-w-3xl text-lg">{pageSubtitle}</p>
                </div>
            </section>

            {/* Application Form */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-xl mx-auto">
                        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
                            {errors.submit && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                    <span className="text-red-700">{errors.submit}</span>
                                </div>
                            )}

                            {/* Name */}
                            <div className="mb-5">
                                <label className="form-label">{language === 'hi' ? 'नाम' : 'Name'} *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder={language === 'hi' ? 'अपना नाम दर्ज करें' : 'Enter your name'}
                                    className={`form-input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div className="mb-5">
                                <label className="form-label">{language === 'hi' ? 'ईमेल' : 'Email'} *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder={language === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email'}
                                    className={`form-input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            {/* Phone */}
                            <div className="mb-5">
                                <label className="form-label">{language === 'hi' ? 'फोन' : 'Phone'} *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder={language === 'hi' ? '10 अंकों का फोन नंबर' : '10-digit phone number'}
                                    maxLength={10}
                                    className={`form-input ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>

                            {/* Address */}
                            <div className="mb-5">
                                <label className="form-label">{language === 'hi' ? 'पता' : 'Address'} *</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder={language === 'hi' ? 'अपना पता दर्ज करें' : 'Enter your address'}
                                    className={`form-input ${errors.address ? 'border-red-500 focus:ring-red-500' : ''}`}
                                />
                                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                            </div>

                            {/* City & Pin */}
                            <div className="grid md:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label className="form-label">{language === 'hi' ? 'शहर' : 'City'} *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder={language === 'hi' ? 'शहर का नाम' : 'City name'}
                                        className={`form-input ${errors.city ? 'border-red-500 focus:ring-red-500' : ''}`}
                                    />
                                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                </div>
                                <div>
                                    <label className="form-label">{language === 'hi' ? 'पिन कोड' : 'PIN'} *</label>
                                    <input
                                        type="text"
                                        name="pin"
                                        value={formData.pin}
                                        onChange={handleInputChange}
                                        placeholder={language === 'hi' ? '6 अंकों का पिन' : '6-digit PIN'}
                                        maxLength={6}
                                        className={`form-input ${errors.pin ? 'border-red-500 focus:ring-red-500' : ''}`}
                                    />
                                    {errors.pin && <p className="text-red-500 text-sm mt-1">{errors.pin}</p>}
                                </div>
                            </div>

                            {/* Pump Power */}
                            <div className="mb-8">
                                <label className="form-label">{language === 'hi' ? 'पंप की पावर चुनें' : 'Choose Power of Pump'} *</label>
                                <select
                                    name="pumpPower"
                                    value={formData.pumpPower}
                                    onChange={handleInputChange}
                                    className={`form-input ${errors.pumpPower ? 'border-red-500 focus:ring-red-500' : ''}`}
                                >
                                    <option value="">{language === 'hi' ? 'पंप की पावर चुनें' : 'Select pump power'}</option>
                                    {pumpPowerOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                {errors.pumpPower && <p className="text-red-500 text-sm mt-1">{errors.pumpPower}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full btn-green flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {language === 'hi' ? 'जमा हो रहा है...' : 'Submitting...'}
                                    </>
                                ) : (
                                    language === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ApplyPump
