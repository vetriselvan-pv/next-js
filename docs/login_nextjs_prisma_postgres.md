Creating a Next.js Application

## Next.js Introduction
Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.
It also automatically configures lower-level tools like bundlers and compilers. You can instead focus on building your product and shipping quickly.

Command to create a Next.js workspace:

npx create-next-app@latest

This will prompt you with several configuration options:

```bash
What is your project named? my-app
Would you like to use the recommended Next.js defaults?
    Yes, use recommended defaults - TypeScript, ESLint, Tailwind CSS, App Router, Turbopack
    No, reuse previous settings
    No, customize settings - Choose your own preferences
```

If you choose to customize settings:

```bash
Would you like to use TypeScript? No / Yes
Which linter would you like to use? ESLint / Biome / None
Would you like to use React Compiler? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```

Once the application is created, open the `package.json` file and check the scripts added to run the application locally.

Run the development server:

```bash
npm run dev
```

Inside the `app` folder, create a folder named `login`. Inside that folder, create a file named `page.tsx`. This will set up the routing to `/login`.

Now create a `Login` function and design the login screen using Tailwind CSS:

```ts
export default function Login() {
  return (
    <form onSubmit={login}>
      <div className="h-dvh flex items-center justify-center bg-[url('/background-image/BG.svg')] bg-cover">
        <div className="w-75 p-3 gap-5 flex flex-col items-center justify-center">
          <Image src="./icons/cart.svg" alt="cart" width={200} height={200} priority />
          <h1>Login</h1>
          <div className="flex min-w-70 p-2 items-center rounded-sm border-2 border-[#2148C0] gap-2">
            {/* <label htmlFor="username">User Name</label> */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6666 17.5V15.8333C16.6666 14.9493 16.3155 14.1014 15.6903 13.4763C15.0652 12.8512 14.2174 12.5 13.3333 12.5H6.66665C5.78259 12.5 4.93474 12.8512 4.30962 13.4763C3.6845 14.1014 3.33331 14.9493 3.33331 15.8333V17.5"
                stroke="#2148C0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M10 9.16667C11.841 9.16667 13.3334 7.67428 13.3334 5.83333C13.3334 3.99238 11.841 2.5 10 2.5C8.15907 2.5 6.66669 3.99238 6.66669 5.83333C6.66669 7.67428 8.15907 9.16667 10 9.16667Z"
                stroke="#2148C0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <input
              placeholder="Username"
              className="w-full focus:outline-0"
              type="text"
              name="username"
              id="userName"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex min-w-70 p-2 items-center rounded-sm border-2 border-[#2148C0] gap-2">
            {/* <label htmlFor="username">Password </label> */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 9.16669H4.16667C3.24619 9.16669 2.5 9.91288 2.5 10.8334V16.6667C2.5 17.5872 3.24619 18.3334 4.16667 18.3334H15.8333C16.7538 18.3334 17.5 17.5872 17.5 16.6667V10.8334C17.5 9.91288 16.7538 9.16669 15.8333 9.16669Z"
                stroke="#2148C0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />

              <path
                d="M5.83331 9.16669V5.83335C5.83331 4.72828 6.2723 3.66848 7.0537 2.88708C7.8351 2.10567 8.89491 1.66669 9.99998 1.66669C11.105 1.66669 12.1649 2.10567 12.9463 2.88708C13.7277 3.66848 14.1666 4.72828 14.1666 5.83335V9.16669"
                stroke="#2148C0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>

            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              className="w-full focus:outline-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              className="rounded-sm border p-2 min-w-32 bg-white text-[#2148C0]"
              type="button"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-sm border-0 min-w-32 text-white  p-2 bg-[#2148C0]"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
```

Now open `localhost:3000/login` in your browser.

## Backend Setup with Next.js API and PostgreSQL

We'll use the Next.js API with PostgreSQL via Prisma for the backend.

Your project folder structure should look like this:

```bash
sample-app/
│
├── app/
│   ├── login/page.tsx
│   ├── dashboard/page.tsx
│   └── api/
│       └── login/route.tsx
│
├── prisma/
│   └── schema.prisma
│
├── scripts/
│   └── createUser.js
│
└── .env
```

### Install Dependencies

Install the required packages in your workspace root:

```bash
npm install prisma tsx @types/pg --save-dev
npm install @prisma/client @prisma/adapter-pg dotenv pg
npm install bcryptjs jsonwebtoken cookie
npm install -D @types/jsonwebtoken
```

| Package          | Purpose                              |
| ---------------- | ------------------------------------ |
| `prisma`         | ORM tool to generate DB client       |
| `@prisma/client` | Actual Prisma client used in code    |
| `bcryptjs`       | Hash/compare passwords safely        |
| `jsonwebtoken`   | Create a token after login           |
| `cookie`         | Manage cookies (optional but useful) |

### Initialize Prisma

```bash
npx prisma init
```

This command creates:

- A new `prisma/` folder with `schema.prisma`
- A `prisma.config.ts` file and `.env` file in your workspace root

### Configure Database Connection

Add your PostgreSQL connection URL to the `.env` file:

```bash
DATABASE_URL="postgresql://{user}:{password}@{host}:{port}/{dbname}?{parameters}"
```

| Parameter       | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `postgresql://` | The protocol prefix                                             |
| `{user}`        | Your PostgreSQL username                                        |
| `{password}`    | The user's password                                             |
| `@{host}`       | The server address (e.g., localhost or an IP address)           |
| `:{port}`       | The port number (default is 5432)                               |
| `/{dbname}`     | The name of the specific database to connect to                 |
| `?{parameters}` | Optional additional connection options (e.g., ?sslmode=require) |

Once the configuration are done. you can create/modify the database

```bash
npx prisma migrate dev
```

Generate a JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```

Add this to your `.env` file:

```bash
JWT_SECRET="your-generated-secret"
```

### Define User Model

Create the User model in `schema.prisma`:

```ts
model User {
  id        String @id @default(uuid())
  email     String @unique
  name      String
  password  String
  createdAt DateTime @default(now())
}
```

Run the migration:

```bash
npx prisma migrate dev --name "add user table"
```

Generate the Prisma Client:

```bash
npx prisma generate
```

### Seed Database with Test Data

Create a `prisma/seed.ts` file:

```ts
import { Prisma, PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});
const hashedPassword = await bcrypt.hash("password123", 10);

const userData: Prisma.UserCreateInput[] = [
  {
    email: "test@email.com",
    name: "Test User",
    password: hashedPassword,
  },
];

export async function main() {
  for (const user of userData) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Now we need to add the seed.ts in the prisma config file inside the migration .

```ts
seed: "tsx prisma/seed.ts";
```

Seed the database:

```bash
npx prisma db seed
```

### Create Login API Route

Create a file at `app/api/login/route.ts`:

```ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

type RequestType = {
  email: string;
  password: string;
};

export async function POST(req: Request) {
  try {
    const body: RequestType = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return Response.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
```

### Integrate API with Login Form

Update your login handler function:

```ts
async function login(e: React.FormEvent) {
  e.preventDefault();

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data: { message?: string; error?: string } = await res.json();

  if (!res.ok) {
    alert(data.error);
    return;
  }

  alert("Login successful");
}
```
