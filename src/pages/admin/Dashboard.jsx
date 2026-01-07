import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Sun, LogOut, Users, Clock, CheckCircle, XCircle,
    Search, Filter, RefreshCw, Eye, ChevronDown
} from 'lucide-react'

function AdminDashboard() {
    const navigate = useNavigate()
    const [applications, setApplications] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('ALL')
    const [selectedApp, setSelectedApp] = useState(null)
    const [isUpdating, setIsUpdating] = useState(false)

    const statusColors = {
        PENDING: 'badge-pending',
        REVIEWED: 'badge-reviewed',
        APPROVED: 'badge-approved',
        REJECTED: 'badge-rejected',
    }

    useEffect(() => {
        fetchApplications()
    }, [])

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem('spy-admin-token')
            const response = await fetch('/api/applications', {
                headers: { Authorization: `Bearer ${token}` },
            })

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('spy-admin-token')
                    navigate('/admin/login')
                    return
                }
                throw new Error('Failed to fetch')
            }

            const data = await response.json()
            setApplications(data)
        } catch (error) {
            console.error('Fetch error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const updateStatus = async (id, status) => {
        setIsUpdating(true)
        try {
            const token = localStorage.getItem('spy-admin-token')
            const response = await fetch(`/api/applications/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            })

            if (response.ok) {
                setApplications(prev =>
                    prev.map(app => app.id === id ? { ...app, status } : app)
                )
                setSelectedApp(null)
            }
        } catch (error) {
            console.error('Update error:', error)
        } finally {
            setIsUpdating(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('spy-admin-token')
        localStorage.removeItem('spy-admin-user')
        navigate('/admin/login')
    }

    const filteredApplications = applications.filter(app => {
        const matchesSearch =
            app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.mobile.includes(searchTerm) ||
            app.district.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const stats = {
        total: applications.length,
        pending: applications.filter(a => a.status === 'PENDING').length,
        approved: applications.filter(a => a.status === 'APPROVED').length,
        rejected: applications.filter(a => a.status === 'REJECTED').length,
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-govt-navy text-white sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-saffron-500 p-2 rounded-lg">
                                <Sun className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold">Admin Dashboard</h1>
                                <p className="text-xs text-blue-200">Submersible Pump Yojana</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-govt-blue">{stats.total}</p>
                                <p className="text-gray-500 text-sm">Total Applications</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-yellow-100 p-3 rounded-lg">
                                <Clock className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-govt-blue">{stats.pending}</p>
                                <p className="text-gray-500 text-sm">Pending</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-govt-blue">{stats.approved}</p>
                                <p className="text-gray-500 text-sm">Approved</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-red-100 p-3 rounded-lg">
                                <XCircle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-govt-blue">{stats.rejected}</p>
                                <p className="text-gray-500 text-sm">Rejected</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, mobile, or district..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-govt-navy focus:border-transparent"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-govt-navy focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="ALL">All Status</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="REVIEWED">Reviewed</option>
                                    <option value="APPROVED">Approved</option>
                                    <option value="REJECTED">Rejected</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <button
                                onClick={fetchApplications}
                                className="flex items-center gap-2 px-4 py-2 bg-govt-navy text-white rounded-lg hover:bg-blue-900 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Refresh
                            </button>
                        </div>
                    </div>
                </div>

                {/* Applications Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="spinner"></div>
                        </div>
                    ) : filteredApplications.length === 0 ? (
                        <div className="text-center py-20">
                            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600">No Applications Found</h3>
                            <p className="text-gray-400">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Applicant</th>
                                        <th>Location</th>
                                        <th>Mobile</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredApplications.map((app) => (
                                        <tr key={app.id}>
                                            <td>
                                                <div>
                                                    <p className="font-semibold text-govt-blue">{app.fullName}</p>
                                                    <p className="text-xs text-gray-500">S/o {app.fatherName}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <p>{app.village}</p>
                                                    <p className="text-xs text-gray-500">{app.district}, {app.state}</p>
                                                </div>
                                            </td>
                                            <td>{app.mobile}</td>
                                            <td>{formatDate(app.createdAt)}</td>
                                            <td>
                                                <span className={`badge ${statusColors[app.status]}`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => setSelectedApp(app)}
                                                    className="flex items-center gap-1 text-govt-navy hover:text-blue-700"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* Application Detail Modal */}
            {selectedApp && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-bold text-govt-blue">Application Details</h2>
                            <p className="text-gray-500 text-sm">ID: {selectedApp.id}</p>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-500">Full Name</label>
                                    <p className="font-semibold">{selectedApp.fullName}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Father's Name</label>
                                    <p className="font-semibold">{selectedApp.fatherName}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Village</label>
                                    <p className="font-semibold">{selectedApp.village}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">District</label>
                                    <p className="font-semibold">{selectedApp.district}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">State</label>
                                    <p className="font-semibold">{selectedApp.state}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Mobile</label>
                                    <p className="font-semibold">{selectedApp.mobile}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Aadhar Number</label>
                                    <p className="font-semibold">{selectedApp.aadharNumber}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Applied On</label>
                                    <p className="font-semibold">{formatDate(selectedApp.createdAt)}</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <label className="text-sm text-gray-500 block mb-2">Update Status</label>
                                <div className="flex flex-wrap gap-2">
                                    {['PENDING', 'REVIEWED', 'APPROVED', 'REJECTED'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => updateStatus(selectedApp.id, status)}
                                            disabled={isUpdating || selectedApp.status === status}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${selectedApp.status === status
                                                    ? 'bg-govt-navy text-white'
                                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t bg-gray-50">
                            <button
                                onClick={() => setSelectedApp(null)}
                                className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminDashboard
