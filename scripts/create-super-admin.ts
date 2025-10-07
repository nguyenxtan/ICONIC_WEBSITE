import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import * as readline from 'readline'

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve))
}

async function createSuperAdmin() {
  try {
    console.log('\n🔐 Tạo SUPER_ADMIN user\n')

    const email = await question('Email: ')
    const name = await question('Tên (tùy chọn, Enter để bỏ qua): ')
    const password = await question('Password: ')

    if (!email || !password) {
      console.error('❌ Email và password là bắt buộc!')
      process.exit(1)
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log('\n⚠️  User đã tồn tại. Cập nhật role thành SUPER_ADMIN...')

      const passwordHash = await bcrypt.hash(password, 10)

      await prisma.user.update({
        where: { email },
        data: {
          role: 'SUPER_ADMIN',
          passwordHash,
          ...(name && { name })
        }
      })

      console.log('✅ Đã cập nhật user thành SUPER_ADMIN!')
    } else {
      const passwordHash = await bcrypt.hash(password, 10)

      await prisma.user.create({
        data: {
          email,
          name: name || null,
          passwordHash,
          role: 'SUPER_ADMIN',
          active: true
        }
      })

      console.log('✅ Đã tạo SUPER_ADMIN user thành công!')
    }

    console.log(`\n📧 Email: ${email}`)
    if (name) console.log(`👤 Tên: ${name}`)
    console.log('🔑 Role: SUPER_ADMIN\n')

  } catch (error) {
    console.error('❌ Lỗi:', error)
  } finally {
    rl.close()
    await prisma.$disconnect()
  }
}

createSuperAdmin()
