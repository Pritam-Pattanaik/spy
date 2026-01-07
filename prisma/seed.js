import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)

    const admin = await prisma.user.upsert({
        where: { email: 'admin@spyojana.com' },
        update: {},
        create: {
            email: 'admin@spyojana.com',
            password_hash: hashedPassword,
            name: 'Admin User',
            role: 'ADMIN',
        },
    })

    console.log('✅ Created admin user:', admin.email)

    // Create sample applications
    const sampleApplications = [
        {
            fullName: 'Ramesh Kumar Singh',
            fatherName: 'Shyam Singh',
            village: 'Bhagwanpur',
            district: 'Varanasi',
            state: 'Uttar Pradesh',
            mobile: '9876543210',
            aadharNumber: '123456789012',
            status: 'PENDING',
        },
        {
            fullName: 'Suresh Yadav',
            fatherName: 'Krishna Yadav',
            village: 'Rajpur',
            district: 'Patna',
            state: 'Bihar',
            mobile: '9876543211',
            aadharNumber: '234567890123',
            status: 'APPROVED',
        },
        {
            fullName: 'Mahesh Sharma',
            fatherName: 'Gopal Sharma',
            village: 'Chandpur',
            district: 'Jaipur',
            state: 'Rajasthan',
            mobile: '9876543212',
            aadharNumber: '345678901234',
            status: 'PENDING',
        },
        {
            fullName: 'Dinesh Patel',
            fatherName: 'Ratan Patel',
            village: 'Gandhinagar',
            district: 'Ahmedabad',
            state: 'Gujarat',
            mobile: '9876543213',
            aadharNumber: '456789012345',
            status: 'REVIEWED',
        },
        {
            fullName: 'Rajendra Gupta',
            fatherName: 'Hari Gupta',
            village: 'Lucknow',
            district: 'Lucknow',
            state: 'Uttar Pradesh',
            mobile: '9876543214',
            aadharNumber: '567890123456',
            status: 'REJECTED',
        },
    ]

    for (const app of sampleApplications) {
        await prisma.application.create({ data: app })
    }

    console.log(`✅ Created ${sampleApplications.length} sample applications`)
    console.log('')
    console.log('📝 Admin Credentials:')
    console.log('   Email: admin@spyojana.com')
    console.log('   Password: admin123')
    console.log('')
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
