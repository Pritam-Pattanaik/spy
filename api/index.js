import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'spy-kusum-yojana-secret-key-2025'

// Middleware
app.use(cors())
app.use(express.json())

// Auth middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' })
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' })
    }
}

// ============== AUTH ROUTES ==============

// Admin Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' })
        }

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        const validPassword = await bcrypt.compare(password, user.password_hash)

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ error: 'Server error' })
    }
})

// ============== APPLICATION ROUTES ==============

// Submit new application (public) - JSON only for Vercel
app.post('/api/applications', async (req, res) => {
    try {
        const { fullName, fatherName, village, district, state, mobile, aadharNumber } = req.body

        // Validation
        if (!fullName || !fatherName || !village || !district || !state || !mobile || !aadharNumber) {
            return res.status(400).json({ error: 'All fields are required' })
        }

        if (!/^\d{10}$/.test(mobile)) {
            return res.status(400).json({ error: 'Invalid mobile number format' })
        }

        if (!/^\d{12}$/.test(aadharNumber)) {
            return res.status(400).json({ error: 'Invalid Aadhar number format' })
        }

        const application = await prisma.application.create({
            data: {
                fullName,
                fatherName,
                village,
                district,
                state,
                mobile,
                aadharNumber,
                status: 'PENDING',
            },
        })

        res.status(201).json({ id: application.id, message: 'Application submitted successfully' })
    } catch (error) {
        console.error('Application submission error:', error)
        res.status(500).json({ error: 'Failed to submit application' })
    }
})

// Get all applications (admin only)
app.get('/api/applications', authenticateToken, async (req, res) => {
    try {
        const applications = await prisma.application.findMany({
            orderBy: { createdAt: 'desc' },
        })
        res.json(applications)
    } catch (error) {
        console.error('Fetch applications error:', error)
        res.status(500).json({ error: 'Failed to fetch applications' })
    }
})

// Get single application (admin only)
app.get('/api/applications/:id', authenticateToken, async (req, res) => {
    try {
        const application = await prisma.application.findUnique({
            where: { id: req.params.id },
        })

        if (!application) {
            return res.status(404).json({ error: 'Application not found' })
        }

        res.json(application)
    } catch (error) {
        console.error('Fetch application error:', error)
        res.status(500).json({ error: 'Failed to fetch application' })
    }
})

// Update application status (admin only)
app.patch('/api/applications/:id/status', authenticateToken, async (req, res) => {
    try {
        const { status } = req.body
        const validStatuses = ['PENDING', 'REVIEWED', 'APPROVED', 'REJECTED']

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' })
        }

        const application = await prisma.application.update({
            where: { id: req.params.id },
            data: { status },
        })

        res.json(application)
    } catch (error) {
        console.error('Update status error:', error)
        res.status(500).json({ error: 'Failed to update status' })
    }
})

// ============== PUMP APPLICATION ROUTES ==============

// Submit new pump application (public)
app.post('/api/pump-applications', async (req, res) => {
    try {
        const { name, email, phone, address, city, pin, pumpPower } = req.body

        // Validation
        if (!name || !email || !phone || !address || !city || !pin || !pumpPower) {
            return res.status(400).json({ error: 'All fields are required' })
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' })
        }

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ error: 'Invalid phone number format' })
        }

        if (!/^\d{6}$/.test(pin)) {
            return res.status(400).json({ error: 'Invalid PIN code format' })
        }

        const application = await prisma.pumpApplication.create({
            data: {
                name,
                email,
                phone,
                address,
                city,
                pin,
                pumpPower,
                status: 'PENDING',
            },
        })

        res.status(201).json({ id: application.id, message: 'Pump application submitted successfully' })
    } catch (error) {
        console.error('Pump application submission error:', error.message, error.code, error.meta)
        res.status(500).json({ error: 'Failed to submit pump application', details: error.message })
    }
})

// Get all pump applications (admin only)
app.get('/api/pump-applications', authenticateToken, async (req, res) => {
    try {
        const applications = await prisma.pumpApplication.findMany({
            orderBy: { createdAt: 'desc' },
        })
        res.json(applications)
    } catch (error) {
        console.error('Fetch pump applications error:', error)
        res.status(500).json({ error: 'Failed to fetch pump applications' })
    }
})

// Update pump application status (admin only)
app.patch('/api/pump-applications/:id/status', authenticateToken, async (req, res) => {
    try {
        const { status } = req.body
        const validStatuses = ['PENDING', 'REVIEWED', 'APPROVED', 'REJECTED']

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' })
        }

        const application = await prisma.pumpApplication.update({
            where: { id: req.params.id },
            data: { status },
        })

        res.json(application)
    } catch (error) {
        console.error('Update pump application status error:', error)
        res.status(500).json({ error: 'Failed to update status' })
    }
})

// ============== SETTINGS ROUTES ==============

// Update password (admin only)
app.put('/api/settings/password', authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current password and new password are required' })
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters' })
        }

        const user = await prisma.user.findUnique({ where: { id: req.user.id } })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const validPassword = await bcrypt.compare(currentPassword, user.password_hash)

        if (!validPassword) {
            return res.status(401).json({ error: 'Current password is incorrect' })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await prisma.user.update({
            where: { id: req.user.id },
            data: { password_hash: hashedPassword },
        })

        res.json({ message: 'Password updated successfully' })
    } catch (error) {
        console.error('Update password error:', error)
        res.status(500).json({ error: 'Failed to update password' })
    }
})

// Update email (admin only)
app.put('/api/settings/email', authenticateToken, async (req, res) => {
    try {
        const { password, newEmail } = req.body

        if (!password || !newEmail) {
            return res.status(400).json({ error: 'Password and new email are required' })
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
            return res.status(400).json({ error: 'Invalid email format' })
        }

        const user = await prisma.user.findUnique({ where: { id: req.user.id } })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const validPassword = await bcrypt.compare(password, user.password_hash)

        if (!validPassword) {
            return res.status(401).json({ error: 'Password is incorrect' })
        }

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({ where: { email: newEmail } })
        if (existingUser && existingUser.id !== req.user.id) {
            return res.status(400).json({ error: 'Email already in use' })
        }

        await prisma.user.update({
            where: { id: req.user.id },
            data: { email: newEmail },
        })

        res.json({ message: 'Email updated successfully' })
    } catch (error) {
        console.error('Update email error:', error)
        res.status(500).json({ error: 'Failed to update email' })
    }
})

// ============== HEALTH CHECK ==============

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`🚀 API Server running on http://localhost:${PORT}`)
    })
}

// Export for Vercel
export default app
