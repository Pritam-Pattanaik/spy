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
