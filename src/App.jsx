import { Routes, Route, Outlet } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Marquee from './components/Marquee'
import ProtectedRoute from './components/ProtectedRoute'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Eligibility = lazy(() => import('./pages/Eligibility'))
const Apply = lazy(() => import('./pages/Apply'))
const ApplyPump = lazy(() => import('./pages/ApplyPump'))
const Contact = lazy(() => import('./pages/Contact'))
const AdminLogin = lazy(() => import('./pages/admin/Login'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminSettings = lazy(() => import('./pages/admin/Settings'))

// Loading spinner component
const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
)

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/settings"
                        element={
                            <ProtectedRoute>
                                <AdminSettings />
                            </ProtectedRoute>
                        }
                    />

                    {/* Public Routes */}
                    <Route path="/*" element={
                        <>
                            <Marquee />
                            <Header />
                            <main className="flex-grow">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/eligibility" element={<Eligibility />} />
                                    <Route path="/apply" element={<Apply />} />
                                    <Route path="/apply-pump" element={<ApplyPump />} />
                                    <Route path="/contact" element={<Contact />} />
                                </Routes>
                            </main>
                            <Footer />
                        </>
                    } />
                </Routes>
            </Suspense>
        </div>
    )
}

export default App
