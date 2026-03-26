import { Prisma, PrismaClient  } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';


const adapter = new PrismaPg({
    connectionString : process.env.DATABASE_URL
});

const prisma =  new PrismaClient({
    adapter
})
const hashedPassword = await bcrypt.hash("password123", 10);

const userData : Prisma.UserCreateInput[] = [
    {
        email : 'test@email.com',
        name : 'Test User',
        password : hashedPassword,
    }
]

export async function main(){
    for (const user of userData) {
        await prisma.user.create({
            data  : user
        })
    }
};

main();