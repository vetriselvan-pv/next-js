import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import "dotenv/config";
import { prisma } from "@/libs/db";


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
        {
          error: "Email and password are required",
        },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return Response.json(
        {
          error: "Invalid Credentials",
        },
        { status: 401 }
      );
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECERT as string,
      { expiresIn: "1d" }
    );

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return Response.json({ message: "Login successful" });
  } catch (err) {
    console.log(err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
