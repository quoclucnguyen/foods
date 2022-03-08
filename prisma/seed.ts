import { PrismaClient, Role } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.upsert({
        where: {
            username: "admin"
        },
        update: {
            password: bcrypt.hashSync("123456", 10),
        },
        create: {
            name: "Admin",
            email: "admin@nnu.com",
            username: "admin",
            password: bcrypt.hashSync("123456", 10),
            role: Role.ADMIN,
        }
    })
    const user = await prisma.user.upsert({
        where: {
            username: "user"
        },
        update: {
            password: bcrypt.hashSync("123456", 10),
        },
        create: {
            name: "User",
            email: "user@nnu.com",
            username: "user",
            password: bcrypt.hashSync("123456", 10),
            role: Role.USER,
        }
    })
}


main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })