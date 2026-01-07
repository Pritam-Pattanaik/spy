import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Marquee from './components/Marquee'
import Home from './pages/Home'
import About from './pages/About'
import Eligibility from './pages/Eligibility'
import Apply from './pages/Apply'
import ApplyPump from './pages/ApplyPump'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <div className="min-h-screen flex flex-col">
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
        </div>
    )
}

export default App
