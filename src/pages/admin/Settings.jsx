import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings, Lock, Mail, ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

function AdminSettings() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('password')

    // Password form state
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' })

    // Email form state
    const [emailForm, setEmailForm] = useState({
        password: '',
        newEmail: '',
    })
    const [emailLoading, setEmailLoading] = useState(false)
    const [emailMessage, setEmailMessage] = useState({ type: '', text: '' })

    const getToken = () => localStorage.getItem('spy-admin-token')

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        setPasswordMessage({ type: '', text: '' })

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match' })
            return
        }

        if (passwordForm.newPassword.length < 6) {
            setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters' })
            return
        }

        setPasswordLoading(true)

        try {
            const response = await fetch('/api/settings/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                },
                body: JSON.stringify({
                    currentPassword: passwordForm.currentPassword,
                    newPassword: passwordForm.newPassword,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update password')
            }

            setPasswordMessage({ type: 'success', text: 'Password updated successfully!' })
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
        } catch (error) {
            setPasswordMessage({ type: 'error', text: error.message })
        } finally {
            setPasswordLoading(false)
        }
    }

    const handleEmailSubmit = async (e) => {
        e.preventDefault()
        setEmailMessage({ type: '', text: '' })

        setEmailLoading(true)

        try {
            const response = await fetch('/api/settings/email', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                },
                body: JSON.stringify({
                    password: emailForm.password,
                    newEmail: emailForm.newEmail,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update email')
            }

            setEmailMessage({ type: 'success', text: 'Email updated successfully! Please login again with your new email.' })
            setEmailForm({ password: '', newEmail: '' })

            // Update local storage and redirect to login
            setTimeout(() => {
                localStorage.removeItem('spy-admin-token')
                localStorage.removeItem('spy-admin-user')
                navigate('/admin/login')
            }, 2000)
        } catch (error) {
            setEmailMessage({ type: 'error', text: error.message })
        } finally {
            setEmailLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-govt-navy text-white py-4 shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/admin/dashboard')}
                                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to Dashboard
                            </button>
                        </div>
                        <div className="flex items-center gap-3">
                            <Settings className="w-6 h-6 text-saffron-400" />
                            <h1 className="text-xl font-bold">Account Settings</h1>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    {/* Tab Navigation */}
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setActiveTab('password')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'password'
                                    ? 'bg-govt-navy text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Lock className="w-4 h-4" />
                            Change Password
                        </button>
                        <button
                            onClick={() => setActiveTab('email')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'email'
                                    ? 'bg-govt-navy text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Mail className="w-4 h-4" />
                            Change Email
                        </button>
                    </div>

                    {/* Password Tab */}
                    {activeTab === 'password' && (
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-xl font-bold text-govt-blue mb-6 flex items-center gap-2">
                                <Lock className="w-5 h-5" />
                                Change Password
                            </h2>

                            {passwordMessage.text && (
                                <div
                                    className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${passwordMessage.type === 'success'
                                            ? 'bg-green-50 border border-green-200'
                                            : 'bg-red-50 border border-red-200'
                                        }`}
                                >
                                    {passwordMessage.type === 'success' ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                    )}
                                    <span
                                        className={
                                            passwordMessage.type === 'success' ? 'text-green-700' : 'text-red-700'
                                        }
                                    >
                                        {passwordMessage.text}
                                    </span>
                                </div>
                            )}

                            <form onSubmit={handlePasswordSubmit}>
                                <div className="mb-5">
                                    <label className="form-label">Current Password</label>
                                    <input
                                        type="password"
                                        value={passwordForm.currentPassword}
                                        onChange={(e) =>
                                            setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                                        }
                                        placeholder="Enter current password"
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="form-label">New Password</label>
                                    <input
                                        type="password"
                                        value={passwordForm.newPassword}
                                        onChange={(e) =>
                                            setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                                        }
                                        placeholder="Enter new password (min 6 characters)"
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="form-label">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={passwordForm.confirmPassword}
                                        onChange={(e) =>
                                            setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                                        }
                                        placeholder="Confirm new password"
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={passwordLoading}
                                    className="w-full btn-primary flex items-center justify-center gap-2"
                                >
                                    {passwordLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        'Update Password'
                                    )}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Email Tab */}
                    {activeTab === 'email' && (
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-xl font-bold text-govt-blue mb-6 flex items-center gap-2">
                                <Mail className="w-5 h-5" />
                                Change Email
                            </h2>

                            {emailMessage.text && (
                                <div
                                    className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${emailMessage.type === 'success'
                                            ? 'bg-green-50 border border-green-200'
                                            : 'bg-red-50 border border-red-200'
                                        }`}
                                >
                                    {emailMessage.type === 'success' ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                    )}
                                    <span
                                        className={
                                            emailMessage.type === 'success' ? 'text-green-700' : 'text-red-700'
                                        }
                                    >
                                        {emailMessage.text}
                                    </span>
                                </div>
                            )}

                            <form onSubmit={handleEmailSubmit}>
                                <div className="mb-5">
                                    <label className="form-label">New Email Address</label>
                                    <input
                                        type="email"
                                        value={emailForm.newEmail}
                                        onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
                                        placeholder="Enter new email address"
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="form-label">Current Password (to confirm)</label>
                                    <input
                                        type="password"
                                        value={emailForm.password}
                                        onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
                                        placeholder="Enter your password"
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <p className="text-yellow-800 text-sm">
                                        <strong>Note:</strong> After changing your email, you will be logged out and
                                        need to login again with your new email address.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={emailLoading}
                                    className="w-full btn-primary flex items-center justify-center gap-2"
                                >
                                    {emailLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        'Update Email'
                                    )}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminSettings
