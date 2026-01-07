import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

function Apply() {
    const { t, language } = useLanguage()
    const [formData, setFormData] = useState({
        fullName: '',
        fatherName: '',
        village: '',
        district: '',
        state: '',
        mobile: '',
        aadharNumber: '',
    })
    const [files, setFiles] = useState({
        aadharPhoto: null,
        landDocument: null,
        bankPassbook: null,
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [applicationId, setApplicationId] = useState('')

    const states = t('states')

    const validateForm = () => {
        const newErrors = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = t('apply.validation.required')
        }
        if (!formData.fatherName.trim()) {
            newErrors.fatherName = t('apply.validation.required')
        }
        if (!formData.village.trim()) {
            newErrors.village = t('apply.validation.required')
        }
        if (!formData.district.trim()) {
            newErrors.district = t('apply.validation.required')
        }
        if (!formData.state) {
            newErrors.state = t('apply.validation.required')
        }
        if (!formData.mobile.trim()) {
            newErrors.mobile = t('apply.validation.required')
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = t('apply.validation.mobileInvalid')
        }
        if (!formData.aadharNumber.trim()) {
            newErrors.aadharNumber = t('apply.validation.required')
        } else if (!/^\d{12}$/.test(formData.aadharNumber)) {
            newErrors.aadharNumber = t('apply.validation.aadharInvalid')
        }

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

    const handleFileChange = (e) => {
        const { name, files: fileList } = e.target
        if (fileList[0]) {
            setFiles(prev => ({ ...prev, [name]: fileList[0] }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/applications', {
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
            setErrors({ submit: 'Failed to submit application. Please try again.' })
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="py-12">
                <section className="bg-govt-navy text-white py-16">
                    <div className="container mx-auto px-4">
                        <h1 className="text-3xl md:text-4xl font-bold">{t('apply.title')}</h1>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-lg mx-auto text-center">
                            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-12 h-12 text-govt-green" />
                            </div>
                            <h2 className="text-2xl font-bold text-govt-blue mb-4">
                                {t('apply.success.title')}
                            </h2>
                            <p className="text-gray-600 mb-6">{t('apply.success.message')}</p>
                            <div className="bg-gray-100 rounded-lg p-4 inline-block">
                                <span className="text-gray-500 text-sm">{t('apply.success.applicationId')}</span>
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
            <section className="bg-govt-navy text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('apply.title')}</h1>
                    <p className="text-blue-200 max-w-3xl text-lg">{t('apply.subtitle')}</p>
                </div>
            </section>

            {/* Application Form */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
                            {errors.submit && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                    <span className="text-red-700">{errors.submit}</span>
                                </div>
                            )}

                            {/* Full Name */}
                            <div className="mb-6">
                                <label className="form-label">{t('apply.form.fullName')} *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder={t('apply.form.fullNamePlaceholder')}
                                    className={`form-input ${errors.fullName ? 'border-red-500 focus:ring-red-500' : ''}`}
                                />
                                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                            </div>

                            {/* Father's Name */}
                            <div className="mb-6">
                                <label className="form-label">{t('apply.form.fatherName')} *</label>
                                <input
                                    type="text"
                                    name="fatherName"
                                    value={formData.fatherName}
                                    onChange={handleInputChange}
                                    placeholder={t('apply.form.fatherNamePlaceholder')}
                                    className={`form-input ${errors.fatherName ? 'border-red-500 focus:ring-red-500' : ''}`}
                                />
                                {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>}
                            </div>

                            {/* Village & District */}
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="form-label">{t('apply.form.village')} *</label>
                                    <input
                                        type="text"
                                        name="village"
                                        value={formData.village}
                                        onChange={handleInputChange}
                                        placeholder={t('apply.form.villagePlaceholder')}
                                        className={`form-input ${errors.village ? 'border-red-500 focus:ring-red-500' : ''}`}
                                    />
                                    {errors.village && <p className="text-red-500 text-sm mt-1">{errors.village}</p>}
                                </div>
                                <div>
                                    <label className="form-label">{t('apply.form.district')} *</label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                        placeholder={t('apply.form.districtPlaceholder')}
                                        className={`form-input ${errors.district ? 'border-red-500 focus:ring-red-500' : ''}`}
                                    />
                                    {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                                </div>
                            </div>

                            {/* State */}
                            <div className="mb-6">
                                <label className="form-label">{t('apply.form.state')} *</label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className={`form-input ${errors.state ? 'border-red-500 focus:ring-red-500' : ''}`}
                                >
                                    <option value="">{t('apply.form.statePlaceholder')}</option>
                                    {states.map((state, index) => (
                                        <option key={index} value={state}>{state}</option>
                                    ))}
                                </select>
                                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                            </div>

                            {/* Mobile & Aadhar */}
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="form-label">{t('apply.form.mobile')} *</label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        placeholder={t('apply.form.mobilePlaceholder')}
                                        maxLength={10}
                                        className={`form-input ${errors.mobile ? 'border-red-500 focus:ring-red-500' : ''}`}
                                    />
                                    {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                                </div>
                                <div>
                                    <label className="form-label">{t('apply.form.aadhar')} *</label>
                                    <input
                                        type="text"
                                        name="aadharNumber"
                                        value={formData.aadharNumber}
                                        onChange={handleInputChange}
                                        placeholder={t('apply.form.aadharPlaceholder')}
                                        maxLength={12}
                                        className={`form-input ${errors.aadharNumber ? 'border-red-500 focus:ring-red-500' : ''}`}
                                    />
                                    {errors.aadharNumber && <p className="text-red-500 text-sm mt-1">{errors.aadharNumber}</p>}
                                </div>
                            </div>

                            {/* File Uploads */}
                            <div className="space-y-4 mb-8">
                                <div>
                                    <label className="form-label">{t('apply.form.aadharPhoto')}</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            name="aadharPhoto"
                                            onChange={handleFileChange}
                                            accept="image/*,.pdf"
                                            className="hidden"
                                            id="aadharPhoto"
                                        />
                                        <label
                                            htmlFor="aadharPhoto"
                                            className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-govt-navy transition-colors"
                                        >
                                            <Upload className="w-5 h-5 text-gray-400" />
                                            <span className="text-gray-600">
                                                {files.aadharPhoto ? files.aadharPhoto.name : 'Click to upload'}
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label">{t('apply.form.landDocument')}</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            name="landDocument"
                                            onChange={handleFileChange}
                                            accept="image/*,.pdf"
                                            className="hidden"
                                            id="landDocument"
                                        />
                                        <label
                                            htmlFor="landDocument"
                                            className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-govt-navy transition-colors"
                                        >
                                            <Upload className="w-5 h-5 text-gray-400" />
                                            <span className="text-gray-600">
                                                {files.landDocument ? files.landDocument.name : 'Click to upload'}
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label">{t('apply.form.bankPassbook')}</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            name="bankPassbook"
                                            onChange={handleFileChange}
                                            accept="image/*,.pdf"
                                            className="hidden"
                                            id="bankPassbook"
                                        />
                                        <label
                                            htmlFor="bankPassbook"
                                            className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-govt-navy transition-colors"
                                        >
                                            <Upload className="w-5 h-5 text-gray-400" />
                                            <span className="text-gray-600">
                                                {files.bankPassbook ? files.bankPassbook.name : 'Click to upload'}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full btn-saffron flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {t('apply.form.submitting')}
                                    </>
                                ) : (
                                    t('apply.form.submit')
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Apply
