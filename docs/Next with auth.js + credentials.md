# Install auth.js in next workspace

### Step 1 : Install the auth.js dependency

```bash
npm install next-auth@beta
```

<i>
<b>Note</b> : Installing @auth/core is not necessary, as a user you should never have to interact with @auth/core.
</i>


### Step 2 : Configure

auth.js provides a way to handle the behaviour of the library and the custom authentication logic , adaptors . for that we need to create a auth.ts file.
In next.js

```ts
import NextAuth from "next-auth";

export const { handler, signIn, signOut, auth } = NextAuth({
  providers: [],
});
```

create the route handler under `/app/api/auth/[...nextauth]/route.ts`

```ts
import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;
```

### step 3 : Authentication

auth.js support four main authentication paradigms.

- OAuth
- Magic Links
- Credentials
- WebAuthn

In this we are going to use credentials to do authtentication

<i> To setup Auth.js with any external authentication mechanisms or use a traditional username/email and password flow, we can use the Credentials provider. This provider is designed to forward any credentials inserted into the login form (i.e. username/password, but not limited to) to your authentication service </i>

### Create a signin screen

```ts
"use client";
import { LoginAction } from "@/libs/login-action";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = () => {
  const { data: session, status } = useSession();
  if (session) redirect("/");

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
          </div>

          {/* Form */}
          <form
            className="space-y-4"
            action={async (formData) => {
              const res = await LoginAction(formData);
              console.log(res);
              if (!res.success) {
                alert("Invalid Credentials");
              } else {
                redirect("/");
              }
            }}
          >
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                placeholder="you@example.com"
                type="email"
                required
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
              type="submit"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

```

Now we have a login form with two fields email and password . in this we made the screen as client so we sepeerated the login action into seperate method and using the useSession Hook that gives you access to the logged in user's session data.

<i>Note : useSession is for client-side use only and when using Next.js App Router (app/) you should prefer the auth() </i>
At the same time to use the useSession hook we need to wrap the children with the sessionProvider

For that i create a procider.tsx file inside the app folder

```ts
"use client";

import { SessionProvider } from "next-auth/react";


export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider> {children} </SessionProvider>;
}
```

Now import it in the layout.tsx file

```ts
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-dvh`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

```

Lets back in the authentication part . create a auth.ts inside the lib folders.

``` ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./db";
import { loginSchema } from "./schema";
import { compare } from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const validatedCredentials = loginSchema.parse(credentials);

        if (credentials.email) {
          user = await prisma.user.findUnique({
            where: {
              email: validatedCredentials.email,
            },
          });
        }
        if (user && user.password) {
          const isValid = await compare(
            validatedCredentials.password,
            user.password,
          );
          if (!isValid) {
            return null
          }
        }

        if (!user) {
          return null
        }

        return user;
      },
    }),
  ],
  pages: {
    error: "/sign-in",
  },
});
```

As already discussed i'm using the crendetail for the login. In the credetails i'm using ZOD for the schema validation to confirm the email and password is in proper format and value. Then using the prisma client i'm find the user is existing or not and then check the password using bcryptjs. IF the user name and password is correct i'm returing the user details otherwise i'm returing null. 

To avoid the screen got crashed if the api is failling or invalid credentails. We need to implement the isRedirectError from the next/dist library. For the better pratice i create a util file to make it reusable . 

``` ts 
import { isRedirectError } from "next/dist/client/components/redirect-error";

type Options<T> = {
  actionFn: () => Promise<T>;
  successMessage?: string;
};

const executeAction = async <T>({
  actionFn,
  successMessage = "The actions was successful",
}: Options<T>): Promise<{ success: boolean; message: string }> => {
  try {
    await actionFn();

    return {
      success: true,
      message: successMessage,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "An error has occurred during executing the action",
    };
  }
};

export { executeAction };
```

Lets jump into the login Action now . As discussed earlier we seperate the login action from the login tsx file. 

``` ts 
"use server";

import { signIn } from "./auth";
import { executeAction } from "./executeAction";

export async function LoginAction(formData: FormData) {
 const res = await executeAction({
    actionFn: async () => {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect : false
      });
    },
  });
  console.log(res)
  return res
}

```